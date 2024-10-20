# MicroservicesWithNodeJS
Following along Udemy course for Microservices with NodeJS

## What is a microservice architecture?
Every feature of your product is independent of any other feature.

Database per feature architecture is followed.
- Not allowing any service to communicate directly to another service or their database.
- But, how would we have communication between them if we need interdependent data?
- We use a blend of Async and Sync communication.
- This new service will have its own database with the data that is only required for that particular service. And, we use "Event Bus" to keep the data on this database in sync with other services.
    - Anytime a new use is created Event Bus is notified which then notifies any concerning services. And these services then update their database.
    - This might look like an overhead but this will make our product more efficient.


## 01-project-blog
Go to each folder and run npm install.
- client
- comments
- event-bus
- moderation
- posts
- query

### Initial App Setup
- Client: Web Client
- Posts: Backend service for creating posts
- Comments: Backend service for creating comments

### Post Service
| Path | Method | Body? | Goal |
| -----|--------|-------|------|
|/posts | POST | {title: string} | Create a new Post |
|/posts | GET | - | Retrieve all posts |

### Comments Service
| Path | Method | Body? | Goal |
| -----|--------|-------|------|
|/posts/:id/comments | POST | {content: string} | Create a comment associated with the given post ID |
|/posts/:id/comments | GET | - | Retrieve all comments associated with a given post ID |

### React App (Client - Web Client)

```
App
|_ PostList
    |_ CommentList
    |_ CommentCreate
|_ PostCreate
```

The above is our ReactDOM structure.

#### Components

- We are going to see a Cors error, because we have out client running on port 3000 but requesting something on port 4000. 
    ![alt text](images/image.png)
    - We have to handle this, by installing the cors package and adding following lines to the index.js file of projects.
        ```
        const cors = require('cors');
        const app = express();
        app.use(cors());
        ```

#### Reducing number of requests
- If it was a monolith architecture, we would have been easily making this change
- But for microservice architecture, we need to scratch our head a little more.
- Way 1: Sync Communication
    - Easy to understand conceptually
    - not the best solution
    - may create architecture tree
    - no more monolith
- Way 2: Async Communication
    - Lets introduce Event Broker
    - Have create services emmit events.
    - Introduce a Query Service => which will gather data about the events generated.
    - Query service doesn't have direct relation with other services.
    - Query service will be extremely fast
    [X] Data Duplication
    [X] Harder to Understand

### What are event busses?
- Kafka, RabbitMQ are examples of out of the box event busses.
- Recieves events, publishes them to listeners.  
- We are going to make a simplest form of an event bus (nothing but an echo chamber)

### Event Bus Service
| Path | Method | Body? | Goal |
| -----|--------|-------|------|
|/events | POST | {type: string, data: eventData} | This will be the middle man between all the services and the query service |

### Query Service
- We will now, think about the query service, this is the service, which will have information about all the services needed to display a post and its comments.

| Path | Method | Body? | Goal |
| -----|--------|-------|------|
|/events | POST | {type: string, data: eventData} | On recieveing this we will store appropriete data in the data structure for minimizing the requests |
|/posts | GET | ? | This endpoint returns all the posts and the corresponding comments |

### Moderation Service
This service is required, if we are adding a comment it needs to be moderated before it is posted. 
How? It should not have certain words. So each one of the comments will have a new property: 'status' which can be "approved | pending | rejected"
Now we will add new service, Moderation service
#### Option 1:
- Comment submitted.
- emit event CommentCreated, sent by event bus to all services.
- Moderation service now, look at the content and decide if it should be approved or not.
- moderation service will emit event ModeratedEvent, sent by event bus to all services.
- Query Sevice now, look at the status and if it is approved. it will be added in data.

Pros and Cons:
- Con: Delay in submission and persistance of the comment.
- This con is severe enough to reject this option.

#### Option 2:
- This option is very similar to option 1, with slight change
- submit comment
- event emitted "commentCreated"
- processed by moderation as well as query service, we will keep the comment in default state of pending.
- But this has a problem. 
- Here a view service like query service is expected to have knowledge of business logic.

#### Option 3:
- Here we will have comments Service process ModeratedComments event. and we can send out CommentUpdated event which will be processed by query service.

- user submits comment.
- comment created event to event bus from there to all other services.
- so, we have pending comment in query.
- moderation will send out moderated comment event, and send back to all the services. 
- comment service now, process this and create generic commentUpdated event and send to query service. 
- which will now update the status of comment. (without dwelving into how and why the comment was updated).

We will go with option 3.
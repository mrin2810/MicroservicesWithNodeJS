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
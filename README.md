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
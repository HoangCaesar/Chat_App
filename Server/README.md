## BACKEND SIDE - SERVER

#### Prerequisites:
    If you would like to use test files, please install: "cross-env", "supertest" and "jest" libraries.
#### Configurations: 
    Contact me if you want to have look at .env file (can not add to Github).
#### How to run the project?
    In development mode: yarn dev - Open http://localhost:3000 to view it in your browser.
    In test mode: yarn - test Launches the test runner in the interactive watch mode.
#### Description: 
    Following MVC architecture: manage HTTP requests and websocket (emit, on), connect to databases.
    
#### Technologies: 
    "express-generator": to generate an application and to get started with express
    "nodemon": automatically restarting the node application when file changes are detected.
    "mongoose": to work with MongoDB.
    "cors": to enable CORS with varios options.
    "dotenv": to load environment variables from a ".env" file into process.env.
    "helmet": to secure the app by setting several HTTP headers.
    "http-errors": to create HTTP errors for each request (if any).
    "date-fns": manipulating JS dates.
    "bcryptjs": to hash passwords.
    "jsonwebtoken": to create access token and refresh token.
    "nodemailer: to send verify email to user.
    "otp-generator": automatically generate OTP code to verify user's account.
    "socket.io": initialize and manage websoket.
    "gravatar": automatically generate new avatars for each user based on their info.

    *********************** Dev Dependencies ************************************************
    "jest": to test the app.
    "supertest": for testing HTTP.
    "eslint": avoid syntax error and unused code. 
    "cross-env": to set environment variables.

###Overall

![alt text](./public/images/server_overall.jpg "Overall of server")

Folder structure workflow

![alt text](./public/imgs/folder_structure_workflow.jpg "Folder structure workflow")

1. Folder explanation:

- bin: where we create server and listen to a port.

- src/api/v1 (v1 means version 1):
    + controllers: receive requests from app, handle requests and response back.
    + databases: initialize databases, such as mongoDB and redis.
    + helpers: small functions - used to handle a couple of small tasks like: validation, error handler...
    + templates: contains html file (nodemailer used to send to client.)
    + logs: contain event logs
    + middlewares: in this project, it will verify access/refresh token (not truly needed now)
    + models: define schema and generate form of data in mongodb
    + routes: define routes of a whole app
    + services: is called by controllers to find out data from databases.

- socket.js: initialize websocket and communicate with socket-client from webapp.

- tests: test controllers and services.

2. Databases:

- MongoDB: 

![alt text](./public/images//Database.PNG "MongoDB databases")










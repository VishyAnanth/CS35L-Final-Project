# CS35L-Final-Project
Group Members:
Abraham Chung
Adam Yung
Atul Kabre
Vishal Anantharaman

Our project is called InstaPowellCat. The app can be run by the following steps:
1. Install postgres. On mac systems, this can be done by running:
```
brew install postgres
brew service start postgres
```
using homebrew.

2. Set up the database and tables in postgres. This can be done by running the following commands:
```
CREATE DATABASE final_project;
```
This creates the database final_project, which is used by the backend to save user information. Now, access this database by using:
```
psql final_projects
```
Finally, create the tables in the database by running:
```
CREATE TABLE users(
id VARCHAR(256) NOT NULL,
username VARCHAR(1000),
password VARCHAR(1000),
email VARCHAR(10000),
firstName VARCHAR(1000),
lastName VARCHAR(1000),
enabled BOOLEAN,
nonExpired BOOLEAN,
nonLocked BOOLEAN,
credentialsNonExpired BOOLEAN,
score INTEGER);

CREATE TABLE posts(
id VARCHAR(256) NOT NULL,
base64 VARCHAR(100000),
title VARCHAR(1000),
caption VARCHAR(10000),
posterId VARCHAR(256),
posterUsername VARCHAR(1000),
latitude DOUBLE PRECISION,
longitude DOUBLE PRECISION,
date DATE,
mood INTEGER,
upvotes INTEGER,
downvotes INTEGER);

CREATE TABLE votes(
id VARCHAR(256) NOT NULL,
userId VARCHAR(256),
postId VARCHAR(256),
vote INTEGER);
```

This will create the tables that are needed for the backend to interface with the database and save user information.

3. Now that the database is correctly set up, the backend and frontend must be started to run the app. To start the backend, navigate to /Backend/backend/
and run 
```
mvn:spring-boot run
```
This will start up the server and should automatically configure database connections.
4. Start the frontend by navigating into /Frontend/frontend/ and run
```
npm start
```

Troubleshooting:
- If there are connection issues with the database, verify that the database is running by running
```
brew service start postgres
```
- If the frontend returns errors upon starting, attempt to install node modules that are missing by running
```
npm install --save <NODE_MODULE>
```
- If the backend returns errors on running, run
```
mvn clean install
```
followed by 
```
mvn spring-boot:run
```

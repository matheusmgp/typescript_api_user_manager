# User Handleling and Authentication

# About this project

It's a nodejs/typescript microservice API ,that basically handle users(create,update,getall,getbyid,signin) for academic purspose,
in this project I used patterns like repository pattern , SOLID principles,dependecy inversion,
I decided not to use any lib to handle the DI,and do it only using nodejs/typescript itself,but I could have used a lib for it.
There is a route for authentication /signin that returns a JWT token,where you have to use for the rest of the routes as 'x-access-token' header.

The database is simple with mongoDB ,I'm using ,mongoose lib,but I could have used others libs as 'mongodb' lib,the connection is simple,if you wish
to use a mongodb docker container,just create a docker-compose.yml and change the connection settings inside database folder

# Tecnologies Used

- nodeJS
- typescript
- mongoDB
- jest(e2e tests and unit tests)

## Patterns

- Repository pattern
- SOLID
- dependency inversion

# How to start the project

Prerequisites: node 18x

```bash
# clone repository
git clone https://github.com/matheusmgp/typescript_api_user_manager

# open the /typescript_api_user_manager folder
cd typescript_api_user_manager

# install all libs inside package.json
npm i

# execute the project
npm run start:local
```

# Author

Matheus Gustavo Pereira

https://www.linkedin.com/in/wmazoni

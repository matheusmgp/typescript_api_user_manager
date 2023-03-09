# User Handling and Authentication

# About this project

It's a nodejs/typescript microservice API ,that basically handle users(create,update,getall,getbyid,signin) for **academic purspose**.

In this project I used patterns like **repository pattern** , **SOLID principles**,**dependecy inversion**.

I decided not to use any lib to handle the DI,and do it only using nodejs/typescript itself,but I could have used a lib for it.

There is a route for authentication /signin that returns a **JWT token**,where you have to use for the rest of the routes setting a 'x-access-token' header and passing the token.

The database is simple with **mongoDB** ,I'm using ,mongoose lib,but I could have used others libs as 'mongodb' lib.

The connection is simple,if you wish to use a mongodb docker container,just create a docker-compose.yml and change the connection settings inside database folder

There is a folder /test in the root of the project where I set the e2e tests using **JEST**

# Technologies Used

- nodeJS
- typescript

## Patterns

- Repository pattern
- SOLID
- dependency inversion

  **controllers->services>repositories**

  - I created interfaces for the services and the repositories ,then I created classes to implement the interfaces ,
    then I inject the services interfaces inside the respective controllers ,and inject the repositories interfaces inside the respective services creating a dependency inversion which makes it easier to test the application, and it's a good practice.

  - I created separated files for which controller for example(CreateUserController,UpdateUserController..) and separated files for the interfaces(services(ICreatedUserService..),repositories(ICreateUserRepository)) and the classes that implement it as well,
    it's a good pratcice ,making it easier to understand the code and to create new features in the future if needed.

# How to start the project

Prerequisites: node 18x

```bash
# clone repository
git clone https://github.com/matheusmgp/typescript_api_user_manager

# open the /typescript_api_user_manager folder
cd typescript_api_user_manager

# install all libs inside package.json
npm i

# execute the project(dont forget to install mongo in your local PC or use docker container)
npm run start:local
```

# Author

Matheus Gustavo Pereira

https://www.linkedin.com/in/wmazoni

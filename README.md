# Setup instructions

## initiate server

add .env file under this folder and add the following:
MONGO_URI=mongodb+srv://rasnicgal:uQVfYoCCFGWoYGTD@todocluster.vrvla.mongodb.net/todo-app?retryWrites=true&w=majority&appName=TodoCluster
SECRET=123

```sh
cd backend
npm i
```

wait for installation process to end

```sh
npm start
```

## initiate client

```sh
cd ..
cd frontend
npm i
```

wait for installation process to end

```sh
npm run dev
```

after running the terminal commands you should be redirected to login page if you haven't login yet or tasks page if you did.

you can login to an existing user:
email: rasnicgal@gmail.com
password: 12345
create a new user by clicking "Register" and complete the register process and then login with the email and password you've entered

# Implemented features

-basic authorization system, including login and registration page based on jwt token
-add edit and delete tasks
-marking tasks as To Do/In Progress/Complete
-task search
-connect tasks to projects
-mark tasks as dependent on other tasks
-page with partial activity log (changes are stored in the db)
-closing tasks pops green alart for the user
-projects page that shows how many tasks in each status there are + ability to create new projects
-users page that shows when was the last user activity

# Future improvements

there are tons of improvements possible, from building the backend better with queries, filtering, pagination etc. to building a better state management system, better UI/Ux and styling.   

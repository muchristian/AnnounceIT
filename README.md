[![Build Status](https://travis-ci.org/murediane/EPIC-mail.svg?branch=develop)](https://travis-ci.org/murediane/EPIC-mail)
[![Coverage Status](https://coveralls.io/repos/github/murediane/EPIC-mail/badge.svg?branch=bg-test-endpoints-164432374)](https://coveralls.io/github/murediane/EPIC-mail?branch=bg-test-endpoints-164432374)
[![Maintainability](https://api.codeclimate.com/v1/badges/32af42942c13104511d7/maintainability)](https://codeclimate.com/github/murediane/EPIC-mail/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/32af42942c13104511d7/test_coverage)](https://codeclimate.com/github/murediane/EPIC-mail/test_coverage)

# Epic-Mail

is a messaging platform that allows people to send simple messages to individuals and groups

# Tools and technologies used  :

Node js/Express
ESLint
mocha and chai for testing
postegres as database

#What is the structure of epic mail
Epic mail has UI folder that contains the front end that means it includes
-pages
-css
-javascript
-and images
It also has a Server folder that contains the endpoints
the servers sub-folders are
-config
it contains the general configuration
-controller
contains handle functions
-helpers
contains validation of the objects
-middleware
contains error handling,api route configuration and header configuration
-models
contains database or data structure containing data
-routes
contains all URL to the endpoints

to test if the enpoint works make sure you have node js installed and run npm run server command

there is another folder called test
it contains all the test for the apis

### to get the project

`clone the repository from github green clone buton,`

### Starting the server

`npm run server`

### Running the Tests

`npm run test`

### Access to Endpoints

| API Endpoint               | Method & Description     |
| -------------------------- | ------------------------ |
| /api/v1/auth/signup        | POST /create a user      |
| /api/v1/auth/login         | login a user             |
| /api/v1/messages           | GET all messages         |
| /api/v1/messages/id        | GET /a specific message  |
| /api/v1/messages/sent      | GET sent messages        |
| /api/v1/message/id         | DElete /message          |
| /api/v2/group/id           | delete an group          |
| /api/v2/group/id           | PATCH a group            |
| api/v2/groups              | creategroup              |
| api/v2/groups/userid/users | add a user to group      |
| api/v2/group/messages      | send a message to agroup |



### Author

Murekatete Diane

# Hummingbird
-----

## Installation and deployment
1. git clone http://192.168.13.21/zhengh/hummingbird.git
2. cd hummingbird
3. npm Install
4. gulp

-----

## Third party Library
* [Angular 1.5.x](https://angularjs.org/)
* [UI Router 0.3.x](https://github.com/angular-ui/ui-router/tree/legacy)
* [Material Design 1.0.x](https://github.com/angular/material)
* [Lodash 1.5.x](https://lodash.com/)

-----

## JSON Transfer Protocol
### Description
> head
* status: (Integer)，Server-side status
  1. 200：Http response success.
  2. 300：Login timeout.
  3. 400：Server-side exceptions.
  4. 500：Reserved.
* token: (String)，Encryption key。
* message: (String)，Server-side infomation for current http request.
* total: (Integer)，Sum of business logic result (if the results as the object then total equals 1, as an array equals length of the array).

> body
* (Object/Array)，Realistic & available datas.

### Example
    {
      head: {
        status: 200,
        token: "ghco9xdnaco31gmafukxchph",
        message: "Login Success!",
        total: 1
      },
      body: {
        username: "admin",
        password: "admin"
      }
    }

-----

## How to write markdown for API ?
### Summary
    # Page name
    ----- split line -----
    ## Module name
    ### Interface name
    #### Restful URL
        Type: GET/POST/DELETE/PUT
    ##### Parameter:
        name       data-type         'description(comment)'
    ##### String/Object/Array/Bollean:
        name       data-type         'description(comment)'
    ----- split line -----

### Demo
# User management
-----
## User list
### Query user list
#### /api/users
    Type: GET
##### Parameter:
    department_id    String         ID for user's department(If superuser login ignore this parameter)
##### Array:
    username         String         'User's alias name'
    password         String         'User's password'
    age              Integer        'User's age'
    realname         String         'User's real name'
    phone            String         'Telephone number'
    department       String         'Department'
    email            String         'E-mail'
-----

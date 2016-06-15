# Hummingbird
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

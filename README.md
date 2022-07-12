# library-api
An api for managing a library

## Settings
Have [Node.js](https://nodejs.org/pt-br/) installed on your machine and through your terminal enter the project directory and run the command "npm update":
```sh
cd "project directory"
npm update
```
After that make sure that [MongoDB](https://www.mongodb.com/) is installed on your machine and run the command "mongod" in a separate terminal to start the mongo server:
```sh
mongod
```
Rename the .env.example file to .env<br><br>
Finally, start the node.js server with the command "npm start" in a separate terminal:
```sh
cd "project directory"
npm start
```

Resources available for access via API:
* [**Auth**](#reference/resources/auth)
* [**Users**](#reference/resources/users)
* [**Authors**](#reference/resources/authors)
* [**Categories**](#reference/resources/categories)
* [**Books**](#reference/resources/books)

## Methods
API requests must follow the standards:

| Method | Description |
|---|---|
| `GET` | Returns information from one or more records. |
| `POST` | Used to create a new record. |
| `PUT` | Update record data or change its status. |
| `DELETE` | Remove a system registry. |

## Responses

| Code | Description |
|---|---|
| `200` | Request executed successfully.|
| `201` | A new record was created successfully.|
| `204` | No data to present.|
| `400` | Validation errors or the fields entered do not exist in the system.|
| `401` | Invalid login data.|
| `403` | Resource access prohibited.|
| `404` | Searched record not found (Not found).|
| `405` | Method not implemented.|
| `410` | Searched record has been deleted from the system and is no longer available.|
| `422` | Data entered is outside the scope defined for the field.|
| `429` | Maximum number of requests reached. (*wait a few seconds and try again*)|
| `500` | Internal server error|

## List
Depending on which endpoint you are calling via GET, there may be more parameters available for fetching, but the default will always be this:
The `list` actions allow sending the following parameters:

| Param | Description | Type |
|---|---|---|
| `page(Optional)` | Informs the beginning of the listing (by default it starts with 1). | Integer |
| `limit(Optional)` | Returned data limit (by default it starts with 10). | Integer |

## Auth [/]

### Login (/login) [POST]

| Param | Description | Type |
|---|---|---|
| `username` | Access `username`. | String |
| `password` | Access `password`. | String |

+ Request (application/json)

    + Body

            {
                "username": "RM",
                "password": "12345678"
            }

+ Response 200 (application/json)

    + Body

            {
                "userId": "62bc914eeca68e3e66e8649a",
                "token": "access_token"
            }
            
+ Response 400 (application/json)

    + Body

            {
              "statusCode": 400,
              "error": "Bad Request",
              "message": "Invalid request payload input"
            }

+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Logout (/logout) [POST]

+ Request (application/json)
    
    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

            {
                "token": "access_token"
            }
            
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }

## Users [/users]

### List (/users) [GET]

| Param | Description | Type |
|---|---|---|
| `page(Optional)` | Informs the beginning of the listing (by default it starts with 1). | Integer |
| `limit(Optional)` | Returned data limit (by default it starts with 10). | Integer |
| `first_name(Optional)` | Firts name of user. | String |
| `last_name(Optional)` | Last name of user. | String |
| `username(Optional)` | Username of user. | String |

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
                "page": 1,
                "limit": 10,
                "first_name": "Ryan",
                "last_name": "Menezes",
                "username": "RM"
            }

+ Response 200 (application/json)

    + Body

            {
                "data": [
                  {
                      "type": "users",
                      "attributes": {
                          "_id": "62bc914eeca68e3e66e8649a",
                          "first_name": "Ryan",
                          "last_name": "Menezes",
                          "username": "RM",
                          "avatar": "http://localhost:3000/uploads/07d7e7d05a72ef68183bc5c0e34cebfb.png",
                          "created_at": "2022-06-29T17:52:14.386Z",
                          "updated_at": "2022-06-29T18:49:59.384Z"
                      },
                      "links": {
                          "self": "http://localhost:3000/users/62bc914eeca68e3e66e8649a"
                      }
                  },
                ...
              ],
              "links": {
                  "self": "http://localhost:3000/users",
                  "next": "http://localhost:3000/users?limit=10&page=2",
                  "last": "http://localhost:3000/users?limit=10&page=1"
              }
          }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }

### Find (/users/{id}) [GET]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Body

            {
                "data": {
                    "type": "users",
                    "attributes": {
                        "_id": "62bc914eeca68e3e66e8649a",
                        "first_name": "Ryan",
                        "last_name": "Menezes",
                        "username": "RM",
                        "avatar": "http://localhost:3000/uploads/07d7e7d05a72ef68183bc5c0e34cebfb.png",
                        "created_at": "2022-06-29T17:52:14.386Z",
                        "updated_at": "2022-06-29T18:49:59.384Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/users"
                }
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }

+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Create (/users) [POST]

| Param | Description | Type |
|---|---|---|
| `first_name` | Firts name of user. | String |
| `last_name` | Last name of user. | String |
| `username` | Username of user. | String |
| `password` | Password of user. | String |
| `avatar(Optional)` | Avatar of user. | File(Image) |

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
                "first_name": "Ryan",
                "last_name": "Menezes",
                "username": "RM",
                "password": "12345678",
                "avatar": [FILE]
            }

+ Response 200 (application/json)

    + Body

            {
                "data": {
                    "type": "users",
                    "attributes": {
                        "_id": "62bc914eeca68e3e66e8649a",
                        "first_name": "Ryan",
                        "last_name": "Menezes",
                        "username": "RM",
                        "avatar": "http://localhost:3000/uploads/def0bd11efb52daacf6c0c27a4f0cd88.png",
                        "created_at": "2022-06-29T18:45:15.288Z",
                        "updated_at": "2022-06-29T18:45:15.288Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/users"
                }
            }

+ Response 400 (application/json)

    + Body

            {
              "statusCode": 400,
              "error": "Bad Request",
              "message": "Invalid request payload input"
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }                     
            
### Update (/users/{id}) [PUT]

| Param | Description | Type |
|---|---|---|
| `first_name` | Firts name of user. | String |
| `last_name` | Last name of user. | String |
| `username` | Username of user. | String |
| `password` | Password of user. | String |
| `avatar(Optional)` | Avatar of user. | File(Image) |

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
                "first_name": "Ryan",
                "last_name": "Menezes",
                "username": "RM",
                "password": "12345678",
                "avatar": [FILE]
            }

+ Response 200 (application/json)

    + Body

            {
                "data": {
                    "type": "users",
                    "attributes": {
                        "_id": "62bc914eeca68e3e66e8649a",
                        "first_name": "Ryan",
                        "last_name": "Menezes",
                        "username": "RM",
                        "avatar": "http://localhost:3000/uploads/def0bd11efb52daacf6c0c27a4f0cd88.png",
                        "created_at": "2022-06-29T18:45:15.288Z",
                        "updated_at": "2022-06-29T18:45:15.288Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/users"
                }
            }

+ Response 400 (application/json)

    + Body

            {
              "statusCode": 400,
              "error": "Bad Request",
              "message": "Invalid request payload input"
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }
            
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }  
            
 ### Delete (/users/{id}) [DELETE]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Body

            {
                "data": {
                  "type": "users",
                  "attributes": {
                      "_id": "62bc98884ef43fe6ce0a79b0",
                      "first_name": "Ryan",
                      "last_name": "Menezes",
                      "username": "RM",
                      "avatar": "26fd63afd17c910e46531f3562cc5d78.png",
                      "created_at": "2022-06-29T18:23:04.922Z",
                      "updated_at": "2022-06-29T18:23:04.922Z"
                  }
                },
                "links": {
                    "self": "http://localhost:3000/users"
                }
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }
            
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }   
            
## Authors [/authors]

### List (/authors) [GET]            

| Param | Description | Type |
|---|---|---|
| `page(Optional)` | Informs the beginning of the listing (by default it starts with 1). | Integer |
| `limit(Optional)` | Returned data limit (by default it starts with 10). | Integer |
| `name(Optional)` | Name of author. | String |
| `slug(Optional)` | Slug of author. | String |
| `description(Optional)` | Description of author. | String |

+ Request (application/x-www-form-urlencoded)

    + Body

            {
                "page": 1,
                "limit": 10,
                "name": "Machado de Assis",
                "slug": "machado-de-assis",
                "description": "Brazilian author"
            }

+ Response 200 (application/json)

    + Body

            {
                "data": [
                    {
                        "type": "authors",
                        "attributes": {
                            "_id": "62a78ee805b991e50ee8cf94",
                            "name": "Machado de Assis",
                            "slug": "machado-de-assis",
                            "description": "Brazilian author",
                            "avatar": "http://localhost:3000/uploads/d7cb9a6e25188e0d69f8b90f0e9fcb60.jpg",
                            "created_at": "2022-06-13T19:24:24.891Z",
                            "updated_at": "2022-06-29T18:28:43.582Z"
                        },
                        "links": {
                            "self": "http://localhost:3000/authors/machado-de-assis"
                        }
                    },
                    ...
                ],
                "links": {
                    "self": "http://localhost:3000/authors",
                    "next": "http://localhost:3000/authors?limit=10&page=2",
                    "last": "http://localhost:3000/authors?limit=10&page=1"
                }
          }
 
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }

### Find (/authors/{slug}) [GET]

+ Request (application/json)

+ Response 200 (application/json)

    + Body

            {
                "data": {
                    "type": "authors",
                    "attributes": {
                        "_id": "62a78ee805b991e50ee8cf94",
                        "name": "Machado de Assis",
                        "slug": "machado-de-assis",
                        "description": "Brazilian author",
                        "avatar": "http://localhost:3000/uploads/d7cb9a6e25188e0d69f8b90f0e9fcb60.jpg",
                        "created_at": "2022-06-13T19:24:24.891Z",
                        "updated_at": "2022-06-29T18:28:43.582Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/authors"
                }
            }
            
+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }

+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Create (/authors) [POST]

| Param | Description | Type |
|---|---|---|
| `name` | Name of author. | String |
| `slug(Optional)` | Slug of author. | String |
| `description(Optional)` | Description of author. | String |
| `avatar(Optional)` | Avatar of author. | File(Image) |

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
                "name": "Machado de Assis",
                "slug": "machado-de-assis",
                "description": "Brazilian author",
                "avatar": [FILE]
            }

+ Response 200 (application/json)

    + Body

           {
                "data": {
                    "type": "authors",
                    "attributes": {
                        "_id": "62a78ee805b991e50ee8cf94",
                        "name": "Machado de Assis",
                        "slug": "machado-de-assis",
                        "description": "Brazilian author",
                        "avatar": "http://localhost:3000/uploads/d7cb9a6e25188e0d69f8b90f0e9fcb60.jpg",
                        "created_at": "2022-06-13T19:24:24.891Z",
                        "updated_at": "2022-06-29T18:28:43.582Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/authors"
                }
            }

+ Response 400 (application/json)

    + Body

            {
              "statusCode": 400,
              "error": "Bad Request",
              "message": "Invalid request payload input"
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Update (/authors/{slug}) [PUT]

| Param | Description | Type |
|---|---|---|
| `name` | Name of author. | String |
| `slug(Optional)` | Slug of author. | String |
| `description(Optional)` | Description of author. | String |
| `avatar(Optional)` | Avatar of author. | File(Image) |

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
                "name": "Machado de Assis",
                "slug": "machado-de-assis",
                "description": "Brazilian author",
                "avatar": [FILE]
            }

+ Response 200 (application/json)

    + Body

           {
                "data": {
                    "type": "authors",
                    "attributes": {
                        "_id": "62a78ee805b991e50ee8cf94",
                        "name": "Machado de Assis",
                        "slug": "machado-de-assis",
                        "description": "Brazilian author",
                        "avatar": "http://localhost:3000/uploads/d7cb9a6e25188e0d69f8b90f0e9fcb60.jpg",
                        "created_at": "2022-06-13T19:24:24.891Z",
                        "updated_at": "2022-06-29T18:28:43.582Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/authors"
                }
            }

+ Response 400 (application/json)

    + Body

            {
              "statusCode": 400,
              "error": "Bad Request",
              "message": "Invalid request payload input"
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }
            
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }    
            
            
### Delete (/authors/{slug}) [DELETE]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Body

            {
                "data": {
                    "type": "authors",
                    "attributes": {
                        "_id": "62a78ee805b991e50ee8cf94",
                        "name": "Machado de Assis",
                        "slug": "machado-de-assis",
                        "description": "Brazilian author",
                        "avatar": "d7cb9a6e25188e0d69f8b90f0e9fcb60.jpg",
                        "created_at": "2022-06-13T19:24:24.891Z",
                        "updated_at": "2022-06-29T18:28:43.582Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/authors"
                }
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }
            
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }          

## Categories [/categories]

### List (/categories) [GET]            

| Param | Description | Type |
|---|---|---|
| `page(Optional)` | Informs the beginning of the listing (by default it starts with 1). | Integer |
| `limit(Optional)` | Returned data limit (by default it starts with 10). | Integer |
| `name(Optional)` | Name of category. | String |
| `slug(Optional)` | Slug of category. | String |
| `description(Optional)` | Description of category. | String |

+ Request (application/x-www-form-urlencoded)

    + Body

            {
                "page": 1,
                "limit": 10,
                "name": "Horror",
                "slug": "horror",
                "description": "Horror books"
            }

+ Response 200 (application/json)

    + Body

            {
                "data": [
                    {
                        "type": "categories",
                        "attributes": {
                            "_id": "62a78ee805b991e50ee8cf94",
                            "name": "Horror",
                            "slug": "horror",
                            "description": "Horror books",
                            "created_at": "2022-06-13T19:24:24.891Z",
                            "updated_at": "2022-06-29T18:28:43.582Z"
                        },
                        "links": {
                            "self": "http://localhost:3000/categories/horror"
                        }
                    },
                    ...
                ],
                "links": {
                    "self": "http://localhost:3000/categories",
                    "next": "http://localhost:3000/categories?limit=10&page=2",
                    "last": "http://localhost:3000/categories?limit=10&page=1"
                }
          }
 
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Find (/categories/{slug}) [GET]

+ Request (application/json)

+ Response 200 (application/json)

    + Body

            {
                "data": {
                    "type": "categories",
                    "attributes": {
                        "_id": "62a78ee805b991e50ee8cf94",
                        "name": "Horror",
                        "slug": "horror",
                        "description": "Horror books",
                        "created_at": "2022-06-13T19:24:24.891Z",
                        "updated_at": "2022-06-29T18:28:43.582Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/categories"
                }
            }
            
+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }

+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Create (/categories) [POST]

| Param | Description | Type |
|---|---|---|
| `name` | Name of category. | String |
| `slug(Optional)` | Slug of category. | String |
| `description(Optional)` | Description of category. | String |

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
                "name": "Horror",
                "slug": "horror",
                "description": "Horror books"
            }

+ Response 200 (application/json)

    + Body

           {
                "data": {
                    "type": "categories",
                    "attributes": {
                        "_id": "62a78ee805b991e50ee8cf94",
                        "name": "Horror",
                        "slug": "horror",
                        "description": "Horror books",
                        "created_at": "2022-06-13T19:24:24.891Z",
                        "updated_at": "2022-06-29T18:28:43.582Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/categories"
                }
            }

+ Response 400 (application/json)

    + Body

            {
              "statusCode": 400,
              "error": "Bad Request",
              "message": "Invalid request payload input"
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Update (/categories/{slug}) [PUT]

| Param | Description | Type |
|---|---|---|
| `name` | Name of category. | String |
| `slug(Optional)` | Slug of category. | String |
| `description(Optional)` | Description of category. | String |

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
                "name": "Horror",
                "slug": "horror",
                "description": "Horror books"
            }

+ Response 200 (application/json)

    + Body

           {
                "data": {
                    "type": "categories",
                    "attributes": {
                        "_id": "62a78ee805b991e50ee8cf94",
                        "name": "Horror",
                        "slug": "horror",
                        "description": "Horror books",
                        "created_at": "2022-06-13T19:24:24.891Z",
                        "updated_at": "2022-06-29T18:28:43.582Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/categories"
                }
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }

+ Response 400 (application/json)

    + Body

            {
              "statusCode": 400,
              "error": "Bad Request",
              "message": "Invalid request payload input"
            }
            
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Delete (/categories/{slug}) [DELETE]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Body

            {
                "data": {
                    "type": "categories",
                    "attributes": {
                        "_id": "62a78ee805b991e50ee8cf94",
                        "name": "Horror",
                        "slug": "horror",
                        "description": "Horror books",
                        "created_at": "2022-06-13T19:24:24.891Z",
                        "updated_at": "2022-06-29T18:28:43.582Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/categories"
                }
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }
            
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }

## Books [/books]

### List (/books) [GET]            

| Param | Description | Type |
|---|---|---|
| `page(Optional)` | Informs the beginning of the listing (by default it starts with 1). | Integer |
| `limit(Optional)` | Returned data limit (by default it starts with 10). | Integer |
| `title(Optional)` | Title of book. | String |
| `slug(Optional)` | Slug of book. | String |
| `visible(Optional)` | Visible of book. | Boolean |
| `volume(Optional)` | Volume of book. | Integer |
| `edition(Optional)` | Edition of book. | Integer |
| `release_date(Optional)` | Release date of book. | Date |
| `description(Optional)` | Description of book. | String |
| `details(Optional)` | Details of book. | String |

+ Request (application/x-www-form-urlencoded)

    + Body

            {
                "page": 1,
                "limit": 10,
                "title": "O pequeno príncipe",
				"slug": "o-pequeno-principe",
                "visible": true,
				"volume": 1,
				"edition": 1,
				"release_date": "2000-01-01T00:00:00.000Z",
				"description": "O pequeno príncipe",
				"details": "O pequeno príncipe"
            }

+ Response 200 (application/json)

    + Body

            {
                "data": [
                    {
                        "type": "books",
                        "attributes": {
                            "_id": "62be2bcfcd31a9205fcee99d",
                            "title": "O pequeno príncipe",
                            "slug": "o-pequeno-principe",
                            "visible": true,
                            "volume": 1,
                            "edition": 1,
                            "release_date": "2000-01-01T00:00:00.000Z",
                            "description": "O pequeno príncipe",
				            "details": "O pequeno príncipe",
                            "poster": "http://localhost:3000/uploads/ad8a8f1cda416f0bbb633b289283a59f.jpg",
                            "created_at": "2022-06-30T23:03:43.136Z",
                            "updated_at": "2022-06-30T23:05:21.043Z"
                        },
                        "links": {
                            "self": "http://localhost:3000/books/o-pequeno-principe"
                        }
                    },
                    ...
                ],
                "links": {
                    "self": "http://localhost:3000/books",
                    "next": "http://localhost:3000/books?limit=10&page=2"
                }
            }
 
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Find (/books/{slug}) [GET]

+ Request (application/json)

+ Response 200 (application/json)

    + Body

            {
                "data": {
                    "type": "books",
                    "attributes": {
                        "_id": "62be2bcfcd31a9205fcee99d",
                        "title": "O pequeno príncipe",
                        "slug": "o-pequeno-principe",
                        "visible": true,
                        "volume": 1,
                        "edition": 1,
                        "release_date": "2000-01-01T00:00:00.000Z",
                        "description": "O pequeno príncipe",
                        "details": "O pequeno príncipe",
                        "poster": "http://localhost:3000/uploads/ad8a8f1cda416f0bbb633b289283a59f.jpg",
                        "created_at": "2022-06-30T23:03:43.136Z",
                        "updated_at": "2022-06-30T23:05:21.043Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/books"
                }
            }
            
+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }

+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
 ### Create (/books) [POST]

| Param | Description | Type |
|---|---|---|
| `title` | Title of book. | String |
| `slug(Optional)` | Slug of book. | String |
| `visible(Optional)` | Visible of book. | Boolean |
| `volume` | Volume of book. | Integer |
| `edition` | Edition of book. | Integer |
| `release_date` | Release date of book. | Date |
| `description(Optional)` | Description of book. | String |
| `details(Optional)` | Details of book. | String |
| `poster(Optional)` | Poster of book. | File(Image) |

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
                "title": "O pequeno príncipe",
				"slug": "o-pequeno-principe",
				"visible": true,
				"volume": 1,
				"edition": 1,
				"release_date": "2000-01-01T00:00:00.000Z",
				"description": "O pequeno príncipe",
				"details": "O pequeno príncipe",
                "poster": FILE
            }

+ Response 200 (application/json)

    + Body

           {
                "data": {
                    "type": "books",
                    "attributes": {
                        "_id": "62be2bcfcd31a9205fcee99d",
                        "title": "O pequeno príncipe",
                        "slug": "o-pequeno-principe",
                        "visible": true,
                        "volume": 1,
                        "edition": 1,
                        "release_date": "2000-01-01T00:00:00.000Z",
                        "description": "O pequeno príncipe",
                        "details": "O pequeno príncipe",
                        "poster": "http://localhost:3000/uploads/ad8a8f1cda416f0bbb633b289283a59f.jpg",
                        "created_at": "2022-06-30T23:03:43.136Z",
                        "updated_at": "2022-06-30T23:05:21.043Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/books"
                }
            }
            
+ Response 400 (application/json)

    + Body

            {
              "statusCode": 400,
              "error": "Bad Request",
              "message": "Invalid request payload input"
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Update (/books/{slug}) [PUT]

| Param | Description | Type |
|---|---|---|
| `title` | Title of book. | String |
| `slug(Optional)` | Slug of book. | String |
| `visible(Optional)` | Visible of book. | Boolean |
| `volume` | Volume of book. | Integer |
| `edition` | Edition of book. | Integer |
| `release_date` | Release date of book. | Date |
| `description(Optional)` | Description of book. | String |
| `details(Optional)` | Details of book. | String |
| `poster(Optional)` | Poster of book. | File(Image) |

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
                "title": "O pequeno príncipe",
				"slug": "o-pequeno-principe",
				"visible": true,
				"volume": 1,
				"edition": 1,
				"release_date": "2000-01-01T00:00:00.000Z",
				"description": "O pequeno príncipe",
				"details": "O pequeno príncipe",
                "poster": FILE
            }

+ Response 200 (application/json)

    + Body

           {
                "data": {
                    "type": "books",
                    "attributes": {
                        "_id": "62be2bcfcd31a9205fcee99d",
                        "title": "O pequeno príncipe",
                        "slug": "o-pequeno-principe",
                        "visible": true,
                        "volume": 1,
                        "edition": 1,
                        "release_date": "2000-01-01T00:00:00.000Z",
                        "description": "O pequeno príncipe",
                        "details": "O pequeno príncipe",
                        "poster": "http://localhost:3000/uploads/ad8a8f1cda416f0bbb633b289283a59f.jpg",
                        "created_at": "2022-06-30T23:03:43.136Z",
                        "updated_at": "2022-06-30T23:05:21.043Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/books"
                }
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }

+ Response 400 (application/json)

    + Body

            {
              "statusCode": 400,
              "error": "Bad Request",
              "message": "Invalid request payload input"
            }
            
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }
            
### Delete (/books/{slug}) [DELETE]

+ Request (application/json)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)

    + Body

            {
                "data": {
                    "type": "books",
                    "attributes": {
                        "_id": "62be2bcfcd31a9205fcee99d",
                        "title": "O pequeno príncipe",
                        "slug": "o-pequeno-principe",
                        "visible": true,
                        "volume": 1,
                        "edition": 1,
                        "release_date": "2000-01-01T00:00:00.000Z",
                        "description": "O pequeno príncipe",
                        "details": "O pequeno príncipe",
                        "poster": "http://localhost:3000/uploads/ad8a8f1cda416f0bbb633b289283a59f.jpg",
                        "created_at": "2022-06-30T23:03:43.136Z",
                        "updated_at": "2022-06-30T23:05:21.043Z"
                    }
                },
                "links": {
                    "self": "http://localhost:3000/books"
                }
            }

+ Response 401 (application/json)

    + Body

            {
                "statusCode": 401,
                "error": "Unauthorized",
                "message": "Missing authentication"
            }

+ Response 404 (application/json)

    + Body

            {
              "statusCode": 404,
              "error": "Not Found",
              "message": "Not Found"
            }
            
+ Response 500 (application/json)

    + Body

            {
              "statusCode": 500,
              "error": "Internal Server Error",
              "message": "An internal server error occurred"
            }            

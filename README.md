# Lugo-Blog2

portofolio blog with VUE CLI and TDD

## User Routes

| Route           | Method | Description          | Attributes            |
| --------------- | ------ | -------------------- | --------------------- |
| /users          | GET    | Get all users data   |                       |
| /users/:id      | DELETE | Delete users data    |                       |
| /users/register | POST   | Register new account | name, email, password |
| /users/login    | POST   | Login                | email, password       |

## Article Routes

| Route                                  | Method | Description                                                                   | Attributes                                          |
| -------------------------------------- | ------ | ----------------------------------------------------------------------------- | --------------------------------------------------- |
| /articles                              | GET    | Get all articles data                                                         |                                                     |
| /articles                              | POST   | add new article                                                               | title, description, image                           |
| /articles/:id                          | PUT    | update a specific article (authenticated user)                                | title, description, image, and id article on params |
| /articles/myarticle                    | GET    | Get all my articles (authenticated user)                                      |                                                     |
| /articles/:id                          | GET    | Get one article                                                               | id article on params                                |
| /articles/:id                          | DELETE | delete a specific article (authenticated user)                                | id article on params                                |
| /articles/comment/:id                  | POST   | add new comment (authenticated user)                                          | id article on params                                |
| /articles/comment/:id/:idComment/delete | DELETE | delete a comment (only user that have article and user who gives comment) | id article on params, idComment on params           |

#### DEMO

https://lugo-blog.andresudi.club/

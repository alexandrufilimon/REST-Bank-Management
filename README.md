# Bank API


RESTful API for Banking Management developed in Spring. Case study on a web application.

# Description

In order to build this RESTful API I have used the Spring Framework which made
developing much simpler. As object-relational mapping I used Hibernate with Java
Persistence API. In order to test the REST endpoints before any implementation logic
I have been using Swagger UI which allows me to visualize and interact with the API
resources.

I have applied the REST arhitectural style to the idea of managing a bank. Thus,
making it possible to create accounts, viewing the current balance, transactions and
making payments between different accounts. Of course, the currency in which the
account is created will be also taken into consideration, so when making a transfer the
exchange rate will be made if necessary.

## REST functions

### ► /clients
• GET / - Return a list of all clients;

• GET /{id} - Return the client with the specified id;

• GET /{id}/accounts - Return a list of accounts which belongs to the specified client id;

• POST / - Create a new client;

• PUT /{id} - Update the data on the client with the specified id;

• DELETE /{id} - Delete the client with the specified id from Client Table.


### ► /accounts
• GET / - Return a list of all accounts;

• GET /{id} - Return the account with the specified id;

• GET /{id}/transactions - Return a list of transactions which belongs to the specified account id;

• POST / - Create a new account;

• PUT /{id} - Update the data on the account with the specified id;

• DELETE /{id} - Delete the account with the specified id from Account Table.


### ► /transactions
• GET / - Return a list of all transactions;

• GET /{id} - Return the transaction with the specified id;

• POST / - Create a new transaction;

• PUT /{id} - Update the data on the transaction with the specified id;

• DELETE /{id} - Delete the account with the specified id from Account Table.

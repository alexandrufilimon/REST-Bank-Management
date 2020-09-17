# Bank API


RESTful API for Banking Management developed in Spring. Case study on a web application developed using Angular.

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

# Interaction

First, the customer is required to register or log into the existing account. Upon authentication, the customer will receive a numeric code on his mobile phone
via an external API called the "SMSO API" which he need to enter into a validation dialog. After completing this step it has the access to his own bank accounts where he can make transfers, view the current balance, transactions and today's exchange rate, taken from an another external API called the "Exchange rates API." If the customer does not have any bank account, he can create one himself, having the possibility to choose one of the two currencies available (EURO & GBP). In addition, the customer can deposit / withdraw cash, and a currency conversion may occur if the recipient has a bank account in a different currency and there is also a fee when the transfer is made. He also may close his bank accounts only if the balance is 0. Finally, the manager has authority over the clients, can manage the information of the clients, of their accounts as well as of the transactions.

# Data Model
![alt text](https://i.imgur.com/MCxLco3.jpg)

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

• DELETE /{id} - Delete the transaction with the specified id from Transaction Table.


### ► /banks
• GET / - Return a list of all banks;

• GET /{id} - Return the bank with the specified id;

• POST / - Create a new bank;

• PUT /{id} - Update the data on the bank with the specified id;

• DELETE /{id} - Delete the bank with the specified id from Bank Table.


# GUI

![alt text](https://i.imgur.com/FWqxz1M.jpg)

Click for more GUI images https://imgur.com/a/tB3H9Re

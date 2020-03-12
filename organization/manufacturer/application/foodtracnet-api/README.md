# FoodTracNet Secure API Server

This is FoodTracNet REST API server using node.js, express.js, and JWT based authentication. Implements basic user registration/login and secure token generation and checking. Also implements following FoodTracNet Pallet Contract API's.

## Pallet Contract

### Create Pallet - Creates a new pallet with given details.

Parameters:
- palletNumber
- productName
- productQuantity
- productQuantityUnit
- price

Endpoint URL :http://localhost:3000/api/v1/palletcontract
Request-Type: POST

`#
curl -X POST -H 'Content-Type: application/json' \
              -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjhmY2FjZDg2ODI1MTFkZmFhZGUxNSIsImlhdCI6MTU4MzkzOTcyMiwiZXhwIjoxNTg0MDI2MTIyfQ.otlWybM9aOEbUidGZFAbpDBbNoRfUNJT-iXwBMD-Stg' \
              -d '{"palletNumber":"F1001", \
                    "productName":"Envy Apple", \
                    "productQuantity":"1000", \
                    "productQuantityUnit":"kg", \
                    "price":"3000", \
                    "creator":"Willis", \
                    "createDateTime":"20200115161012" \
                    }' \
              http://localhost:3000/api/v1/palletcontract
`


### purchase - Transfer ownership of pallet to the purchaser of pallet

Parameters:
- palletNumber
- currentOwner
- newOwner
- price
- creator
- purchaseDateTime

`#
curl -X PUT -H 'Content-Type: application/json' \
              -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjhmY2FjZDg2ODI1MTFkZmFhZGUxNSIsImlhdCI6MTU4MzkzOTcyMiwiZXhwIjoxNTg0MDI2MTIyfQ.otlWybM9aOEbUidGZFAbpDBbNoRfUNJT-iXwBMD-Stg' \
              -d '{"palletNumber":"F1001", \
                    "currentOwner":"Willis", \
                    "newOwner":"Manufacturer", \
                    "price":"3000", \
                    "creator":"Willis", \
                    "purchaseDateTime":"20200119131012" \
                    }' \
              http://localhost:3000/api/v1/palletcontract/F1001/purchase
`

### ship

Parameters:
- creator
- palletNumber
- currentOwner
- shipDateTime

`#
curl -X PUT -H 'Content-Type: application/json' \
              -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjhmY2FjZDg2ODI1MTFkZmFhZGUxNSIsImlhdCI6MTU4MzkzOTcyMiwiZXhwIjoxNTg0MDI2MTIyfQ.otlWybM9aOEbUidGZFAbpDBbNoRfUNJT-iXwBMD-Stg' \
              -d '{"palletNumber":"F1001",\
                    "currentOwner":"Manufacturer" \
                    "creator":"Willis", \
                    "shipDateTime":"20200121101012" \
                    }' \
              http://localhost:3000/api/v1/palletcontract/F1001/ship
`


### receive

Parameters:
- creator
- palletNumber
- receivingOwner
- receivedDateTime

`#
curl -X PUT -H 'Content-Type: application/json' \
              -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjhmY2FjZDg2ODI1MTFkZmFhZGUxNSIsImlhdCI6MTU4MzkzOTcyMiwiZXhwIjoxNTg0MDI2MTIyfQ.otlWybM9aOEbUidGZFAbpDBbNoRfUNJT-iXwBMD-Stg' \
              -d '{"palletNumber":"F1001",\
                    "receivingOwner":"Manufacturer" \
                    "creator":"Willis", \
                    "receivedDateTime":"20200122181012" \
                    }' \
              http://localhost:3000/api/v1/palletcontract/F1001/receive
`

# Requirements and Dependencies

- nodejs
- express
- mongodb
- fabric-network

# Setup

- Install

`npm install`

# Running

- Start a MongoDB container:

`docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:latest`

- Start API Server

`npm start`


# API Calls

You can use any API client like postman, for the sake of simplicity i'm using curl here.

## Register a new application user

Endpoint URL :http://localhost:3000/api/v1/auth/register
Request-Type: POST
Parameters:
- name: Name of user
- email: email of user
- password: user password string


Following makes a POST request:

`curl -d '{"name":"Willis","email":"willis@farmboy.local","password":"Inw4223KW"}' -X POST -H 'Content-Type: application/json' http://localhost:3000/api/v1/auth/register`

## Login User And Get a JWT Token

Endpoint URL :http://localhost:3000/api/v1/auth/login
Request-Type: POST
Parameters:
- email: email of user
- password: user password string

`curl -d '{"email":"willis@farmboy.local","password":"Inw4223KW"}' -X POST -H 'Content-Type: application/json' http://localhost:3000/api/v1/auth/login`

## Validate Token and Get User Details

Endpoint URL :http://localhost:3000/api/v1/users/{user-id}
Request-Type: GET
Parameters:
- userid: user id
- token: jwt token (received in login request)

`curl -X GET -H 'Content-Type: application/json' -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjhmY2FjZDg2ODI1MTFkZmFhZGUxNSIsImlhdCI6MTU4MzkzOTcyMiwiZXhwIjoxNTg0MDI2MTIyfQ.otlWybM9aOEbUidGZFAbpDBbNoRfUNJT-iXwBMD-Stg' http://localhost:3000/api/v1/users/5e68fcacd8682511dfaade15`

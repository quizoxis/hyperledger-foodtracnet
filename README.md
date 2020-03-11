
# FoodTracNet

# Governance Model

FoodTractNet uses a Consortium led model for its governance.

### Policies

### Farmer Onboarding

#### Requirements

Farmers must provide the following information as part of the onboarding process.

1. Product is Legal to sell
2. Proper Documentation
    * Food Safety Plan
    * A water test (showing appropriate water source to wash your produce)
    * product liability insurance, and
    * evidence or certificates that back up any claims you make about your product (for example, organic certification if you are selling organic produce).


#### Security Policies

- Private Key Storage and Management

#### Change Management

- Chaincodes
- Deployment Policies


## Participants:

- Farmer
- Manufacturer
- Warehouse
- Retailer

## Assumptions

- A Pallet contains ONLY a single type of product.
- Only owner of pallet can ship and receive the pallet.

## Assets:

###  Pallet Contract

This asset is created by farmer to list the product,
States:

- PalletContract

## FoodTracNet Transactions:

- PalletContract.create
- PalletContract.purchase
- PalletContract.ship
- PalletContract.receive

----


# Prerequisites

- Hyperledger Fabric Release 1.4


# Download Code

Setup GOPATH Environment variable:

GOPATH = /mnt/gbclab/workspaces/go



For Bash
Edit your ~/.bash_profile to add the following line:

`export GOPATH=$HOME/go`

Save and exit your editor. Then, source your ~/.bash_profile.

`source ~/.bash_profile`

Create a directory relative to $GOPATH where foodtracnet will be installed:

`$ mkdir -p $GOPATH/src/github.com/hyperledger/
$ cd $GOPATH/src/github.com/hyperledger/`

Use git clone to copy foodtracnet repository to this location:

`$ git clone https://github.com/quizoxis/hyperledger-foodtracnet.git`


# Create Network

Start the network using the following command.

`$ cd fabric-samples/basic-network
$ ./start.sh`


Setup CLI

Let’s start a docker container for the administrator using the docker-compose command:

$ cd commercial-paper/organization/magnetocorp/configuration/cli/
(M admin)$ docker-compose -f docker-compose.yml up -d cliMagnetoCorp

Install:
(M admin)
$ docker exec cliMagnetoCorp peer chaincode install -n papercontract -v 0 -p /opt/gopath/src/github.com/contract -l node


Install Contract


docker exec -it chaincode.admin.blazers.com bash

peer chaincode install -n papercontract -v 0.1 -p /opt/gopath/src/chaincode -l node


/opt/gopath/src/github.com/contract -l node


----

# Environment Setup


Ref: https://hyperledger-fabric.readthedocs.io/en/release-1.4/install.html

## Step 1: Download platform pre-requisites:

`curl -O https://hyperledger.github.io/composer/v0.19/prereqs-ubuntu.sh
chmod u+x prereqs-ubuntu.sh
./prereqs-ubuntu.sh`

## Step 2 Download platform binaries

Download Platform specific binaries + docker images (no samples):

`cd /mnt/hlf/workspaces/go/src/github.com/hyperledger/foodtracnet
$ curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.4 1.4.4 0.4.18 -s`

### V 1.4.6

curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.6 1.4.6 0.4.18 -s


## Step 3: Update PATH environment variable.

`export PATH=/mnt/hlf/workspaces/go/src/github.com/hyperledger/foodtracnet/bin:$PATH`

## Step 4:

Clone FoodTracNet

`git clone http://xxxxxxxxxxxxxx`


## Step 5: Generate and start network.

`cd /mnt/hlf/workspaces/go/src/github.com/hyperledger/foodtracnet/first-network`
`$ ./byfn.sh generate`
`$ ./byfn.sh up -a -d 10 -t 90 -s couchdb -l node`

Check the list of container:

`$ docker ps --format="{{.ID}}\t{{.Names}}"`

## Step 6: Start Manufacturer CLI

`cd /mnt/hlf/workspaces/go/src/github.com/hyperledger/foodtracnet/organization/manufacturer/configuration/cli/`
`./.env`
`docker-compose -f docker-compose-cli.yaml up -d cliManufacturer`
`docker exec -it cliManufacturer bash`

Test if cliManufacturer peer command is able to connect to peer0.org1
`peer chaincode list --installed`

# Install and Instantiate Chaincode

nvm install 8.9.0
nvm alias default 8.9.0


## install

Sample Chaincode install - using CLI Container:
`peer chaincode install -n mycode -v 0.1 -p /opt/gopath/src/github.com/chaincode/mycode -l node`

`peer chaincode install -n palletcontract -v 0.1 -p /opt/gopath/src/github.com/chaincode -l node`
`peer chaincode list --installed`


## Instantiate

## Instantiate mycode

`peer chaincode instantiate -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n mycode -l node -v 0.1 -c '{"Args":["init","a","100","b","200"]}' -P 'AND ('\''Org1MSP.peer'\'','\''Org2MSP.peer'\'')'
`
Check if the code has been instantiated
`peer chaincode list --instantiated -C mychannel`

## Instantiate palletcontract peer0.org2...

docker exec cliManufacturer peer chaincode install -n palletcontract -v 0 -p /opt/gopath/src/github.com/chaincode -l node

docker exec cliManufacturer peer chaincode instantiate -n palletcontract -v 0 -l node -c '{"Args":["org.foodtracnet.productpallet:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"


peer chaincode instantiate -o orderer.example.com:7050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n palletcontract -v 0 -l node -c '{"Args":["org.foodtracnet.productpallet:instantiate"]}' -P 'AND ('\''Org1MSP.peer'\'','\''Org2MSP.peer'\'')'


# FoodTracNet



# Governance Model

- Model Consortium led

### Policies

### Farmer Onboarding

Farmers must provide the following information as part of the onbarding process.

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

Assets: ProductListingContract

## FoodTracNet Transactions:

----


# Prerequisites

# Download Code


Setup GOPATH Environment variable:

For Bash
Edit your ~/.bash_profile to add the following line:

`export GOPATH=$HOME/go`

Save and exit your editor. Then, source your ~/.bash_profile.

`source ~/.bash_profile`

Create a directory relative to $GOPATH where foodtracnet will be installed:

$ mkdir -p $GOPATH/src/github.com/hyperledger/
$ cd $GOPATH/src/github.com/hyperledger/

Use the git clone command to copy foodtracnet repository to this location:

$ git clone https://github.com/quizoxis/hyperledger-foodtracnet.git


# Network Setup

## Create Network

$ cd fabric-samples/basic-network
$ ./start.sh

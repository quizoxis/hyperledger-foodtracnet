#!/bin/bash
#
#
cd /mnt/hlf/workspaces/go/src/github.com/hyperledger/foodtracnet/organization/manufacturer/configuration/cli/
./.env
docker-compose -f docker-compose-cli.yaml up -d cliManufacturer

## Hyperledger Fabric Simple Control Panel

A simple interface for installing chaincodes in hyperledger fabric nodes

### Usage

First, implement 5 API in backend:

1. GET  ${base}/env

2. GET  ${base}/channel?env=${envName}

3. GET  ${base}/peer?channel=${channelName}&env=${envName}

4. GET  ${base}/peer-detail?id=${peerId}&env=${envName}

5. POST ${base}/deploy

Then, Setup the backend endpoint in src/config.js

Finally, run `npm run build` in project root, copy the generated file in dist and host it

### APIs

Following are some detail about the necessary APIs

#### list env

path: env

response data:
```json
[
  { "name": "dev" },
  { "name": "staging" },
  { "name": "production" }
]
```

#### list channel

path: channel

query: env=${envName}

response data:
```json
[
  { name: "mychannel" },
  { name: "channel-1" },
  { name: "channel-2" }
]
```

#### list channel peer

url: peer

query: channel=${channelName}&env=${envName}

response data:

```json
[
  {
    "orgName": "Org1",
    "peers": [
      {
        "id": "peer0.org1.example.com",
        "host": "peer0.org1.example.com",
        "port": 7050
      },
      {
        "id": "peer1.org1.example.com",
        "host": "peer1.org1.example.com",
        "port": 7051
      },
    ],
  },
  {
    "orgName": "Org2",
    "peers": [
      {
        "id": "peer0.org2.example.com",
        "host": "peer0.org2.example.com",
        "port": 7050
      },
      {
        "id": "peer1.org2.example.com",
        "host": "peer1.org2.example.com",
        "port": 7050
      },
    ],
  }
]
``` 

#### get peer detail

path: peer-detail

query: id=${peerId}&env=${envName}

response data:

```json
{
  "id": "peer0.org1.example.com",
  "name": "peer0.org1.example.com",
  "host": "peer0.org1.example.com",
  "port": 7050,
  "description": "peer0.org1.example.com",
  "org": "Org1",
  "chaincode": {
    "path": "/path/to/chaincode/package",
    "name": "universal",
    "version": "0.1.0",
  },
  "installed": [
    { "name": "universal", "version": "0.1.5" },
    { "name": "universal", "version": "0.1.4" },
    { "name": "universal", "version": "0.1.3" },
    { "name": "universal", "version": "0.1.2" },
    { "name": "universal", "version": "0.1.1" },
    { "name": "universal", "version": "0.1.0" },
  ],
  "channel": "mychannel",
  "env": "dev"
}
```

#### deploy chaincode to a peer node

path: deploy

request body:

```json
{
  "env": "dev",
  "channel": "mychannel",
  "peerId": "peer0.org1.example.com",
  "name": "universal",
  "version": "0.1.9",
  "path": "/path/to/chaincode/package",
}

```

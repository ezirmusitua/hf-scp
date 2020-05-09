import { Config } from "../config";
import { getResource, postResource } from "../resources";
export class Peer {
  constructor(peer) {
    this.id = peer.id;
    this.host = peer.host;
    this.port = peer.port;
    this.name = peer.name;
    this.description = peer.description;
    this.org = peer.org;
  }
}

export class OrgPeerList {
  constructor(orgName, peers) {
    this.orgName = orgName;
    this.peers = peers.map((peer) => new Peer({ ...peer }));
  }
}

export class PeerList {
  constructor(env, channel, orgs = []) {
    this.selectedPeer = "";
    this.env = env;
    this.channel = channel;
    this.orgs = orgs.map((org) => new OrgPeerList(org.orgName, org.peers));
  }

  select(peerId) {
    if (this.selectedPeer === peerId) return;
    this.orgs = this.orgs.map((org) => ({
      ...org,
      peers: org.peers.map((peer) => {
        const shouldSelect = peer.id === peerId;
        const selected = peer.host.startsWith("*");
        if (shouldSelect && selected) return peer;
        if (shouldSelect && !selected) {
          peer.host = "* " + peer.host;
        }
        if (selected) {
          peer.host = peer.host.slice(2);
        }
        return peer;
      }),
    }));
  }

  static async fetch(payload) {
    // if (this.channel === payload.channel) return;
    if (Config.resourceBase === "localhost") {
      return new PeerList(payload.env, payload.channel, [
        {
          orgName: "Org1",
          peers: [
            {
              id: `${payload.channel}.peer0.org1.example.com`,
              host: `${payload.channel}.peer0.org1.example.com`,
              port: 7050,
            },
            {
              id: "peer1.org1.example.com",
              host: "peer1.org1.example.com",
              port: 7051,
            },
          ],
        },
        {
          orgName: "Org2",
          peers: [
            {
              id: "peer0.org2.example.com",
              host: "peer0.org2.example.com",
              port: 7050,
            },
            {
              id: "peer1.org2.example.com",
              host: "peer1.org2.example.com",
              port: 7051,
            },
          ],
        },
      ]);
    }
    const url = `${Config.resourceBase}` + `/peer?channel=${payload.channel}`;
    return new PeerList("", await getResource(url));
  }
}

export class PeerDetail extends Peer {
  constructor(peer) {
    super(peer);
    this.selectedPeer = "";
    this.env = peer.env;
    this.channel = peer.channel;
    this.chaincode = peer.chaincode || {};
    this.installed = peer.installed || {};
  }

  changeChaincode(field, value) {
    this.chaincode[field] = value;
  }

  async deploy() {
    if (Config.resourceBase === "localhost") {
      alert(`mock deploy api : 
  env: ${this.env}
  channel: ${this.channel}
  organization: ${this.org}
  chaincode: ${this.chaincode.name}
  version: ${this.chaincode.version}`);
      return;
    }
    const url = `${Config.resourceBase}/deploy`;
    try {
      const res = await postResource(url, {
        env: this.env,
        channel: this.channel,
        name: this.name,
        version: this.version,
        org: this.org,
      });
      alert(res);
    } catch (e) {
      alert(e);
    }
  }

  static async fetch(payload) {
    // if (this.id === payload.peerId) return;
    if (Config.resourceBase === "localhost") {
      return new PeerDetail({
        id: "peer0.org1.example.com",
        name: "peer0.org1.example.com",
        host: "peer0.org1.example.com",
        port: 7050,
        description: "peer0.org1.example.com",
        org: "Org1",
        chaincode: {
          path: "/path/to/chaincode/package",
          name: "universal",
          version: "0.1.0",
        },
        installed: [
          { name: "universal", version: "0.1.5" },
          { name: "universal", version: "0.1.4" },
          { name: "universal", version: "0.1.3" },
          { name: "universal", version: "0.1.2" },
          { name: "universal", version: "0.1.1" },
          { name: "universal", version: "0.1.0" },
        ],
        channel: payload.channel,
        env: payload.env,
      });
    }
    const url = `${Config.resourceBase}` + `/peer-detail?id=${payload.peerId}`;
    return new PeerDetail("", await getResource(url));
  }
}

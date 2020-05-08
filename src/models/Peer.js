(function() {
  /**
   * Peer
   **/
  window.Peer = class Peer {
    /**
     * constructor
     * @param {object} peer
     **/
    constructor(peer) {
      this.id = peer.id;
      this.host = peer.host;
      this.port = peer.port;
      this.name = peer.name;
      this.description = peer.description;
      this.org = peer.org;
    }
  };

  /**
   * OrgPeerList
   **/
  window.OrgPeerList = class OrgPeerList {
    /**
     * constructor
     * @param {String} orgName
     * @param {Array} peers
     **/
    constructor(orgName, peers) {
      this.orgName = orgName;
      this.peers = peers.map((peer) => new Peer({...peer}));
    }
  };

  /**
   * ChannelList
   **/
  window.PeerList = class PeerList {
    /**
     * constructor
     * @param {String} env
     * @param {String} channel
     * @param {Array} orgs
     **/
    constructor(env, channel, orgs = []) {
      this.env = env;
      this.channel = channel;
      this.orgs = orgs.map((org) =>
        new window.OrgPeerList(org.orgName, org.peers));
    }

    /**
     * fetch
     * @param {object} payload
     **/
    static async fetch(payload) {
      if (window.Config.resourceBase === 'localhost') {
        return new window.PeerList(payload.env, payload.channel, [
          {
            orgName: 'Org1',
            peers: [
              {
                id: `${payload.channel}.peer0.org1.example.com`,
                host: `${payload.channel}.peer0.org1.example.com`,
                port: 7050,
              },
              {
                id: 'peer1.org1.example.com',
                host: 'peer1.org1.example.com',
                port: 7051,
              },
            ],
          },
          {
            orgName: 'Org2',
            peers: [
              {
                id: 'peer0.org2.example.com',
                host: 'peer0.org2.example.com',
                port: 7050,
              },
              {
                id: 'peer1.org2.example.com',
                host: 'peer1.org2.example.com',
                port: 7051,
              },
            ],
          },
        ]);
      }
      const url = `${window.Config.resourceBase}` +
        `/peer?channel=${payload.channel}`;
      return new window.PeerList('', await window.getResource(url));
    }
  };

  /**
   * PeerDetail
   **/
  window.PeerDetail = class PeerDetail extends Peer {
    /**
     * constructor
     * @param {object} peer
     **/
    constructor(peer) {
      super(peer);
      this.env = peer.env;
      this.channel = peer.channel;
      this.chaincode = peer.chaincode || {};
      this.installed = peer.installed || {};
    }

    /**
     * changeChaincode
     * @param {String} field
     * @param {String} value
     **/
    changeChaincode(field, value) {
      this.chaincode[field] = value;
    }

    /**
     * deploy
     **/
    async deploy() {
      if (window.Config.resourceBase === 'localhost') {
        alert(`mock deploy api : 
  env: ${this.env}
  channel: ${this.channel}
  organization: ${this.org}
  chaincode: ${this.chaincode.name}
  version: ${this.chaincode.version}`);
        return;
      }
      const url = `${window.Config.resourceBase}/deploy`;
      try {
        const res = await window.postResource(url, {
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

    /**
     * fetch
     * @param {object} payload
     **/
    static async fetch(payload) {
      if (window.Config.resourceBase === 'localhost') {
        return new window.PeerDetail({
          id: 'peer0.org1.example.com',
          name: 'peer0.org1.example.com',
          host: 'peer0.org1.example.com',
          port: 7050,
          description: 'peer0.org1.example.com',
          org: 'Org1',
          chaincode: {
            path: '/path/to/chaincode/package',
            name: 'universal',
            version: '0.1.0',
          },
          installed: [
            {name: 'universal', version: '0.1.5'},
            {name: 'universal', version: '0.1.4'},
            {name: 'universal', version: '0.1.3'},
            {name: 'universal', version: '0.1.2'},
            {name: 'universal', version: '0.1.1'},
            {name: 'universal', version: '0.1.0'},
          ],
          channel: payload.channel,
          env: payload.env,
        });
      }
      const url = `${window.Config.resourceBase}` +
        `/peer-detail?id=${payload.peerId}`;
      return new PeerDetail('', await window.getResource(url));
    }
  };
})();

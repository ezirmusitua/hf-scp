(function() {
  const styles = '<link rel="stylesheet" type="text/css"' +
'href="./src/styles/peer-detail.css"></link>' +
'<link rel="stylesheet" type="text/css"' +
'href="./src/styles/input.css"></link>';

  const html = `<section class="peer-detail-container">
  <!-- Peer Information -->
  <div class="peer-detail-information">
    <h3>{{information.name}}</h3>
    <p>{{information.description}}</p>
  </div>

  <!-- Chaincode Action -->
  <div class="peer-detail-chaincode-action">
    <h3>Deploy Chaincode For {{information.org}}</h3>
    <div class="input-container chaincode-name">
      <input placeholder="name of chaincode" value="{{chaincode.name}}">
    </div>
    <div class="input-container chaincode-version">
      <input placeholder="version of chaincode" value="{{chaincode.version}}">
    </div>
    <div class="input-container chaincode-path">
      <input placeholder="path/to/chaincode" value="{{chaincode.path}}">
    </div>
    <button class="deploy-button">Deploy</button>
  </div>

  <!-- Installed Chaincodes -->
  <div class="peer-detail-chaincode-list">
    <h3>Installed Chaincodes</h3>
    <mwc-list>
      {{#installed}}
      <mwc-list-item>
        <div class="list-item">
          <p class="list-item-label">{{name}}#{{version}}</p>
        </div>
      </mwc-list-item>
      <li divider role="separator"></li>
      {{/installed}}
    </mwc-list>
  </div>
</section>
${styles}`;

  const MockPeerDetailData = {
    information: {
      name: 'peer0.org1.example.com',
      description: 'peer0.org1.example.com',
      org: 'Org1',
    },
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
  };
  /**
   * SCPPeerDetail
   **/
  class SCPPeerDetail extends HTMLElement {
    /**
     * constructor
     **/
    constructor() {
      super();
      this.name = 'scp_peer_detail';
      this.data = {};
    }

    /**
     * trigger
     * @param {String} componentName
     * @param {object} payload
     **/
    async trigger(componentName, payload) {
      if (componentName === 'scp_peer_list' && payload.selectedPeer) {
        this.data = {
          ...MockPeerDetailData,
        };
        this.render();
      }
    }

    /**
     * lifecycle: connected
     **/
    connectedCallback() {
      window.$scp_component[this.name] = this;
      this.render();
    }

    /**
     * render
     **/
    render() {
      this.innerHTML = window.Mustache.render(html, this.data);
    }
  }

  if (!customElements.get('scp-peer-detail')) {
    customElements.define('scp-peer-detail', SCPPeerDetail);
  }
})();


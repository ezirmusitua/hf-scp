(function() {
  const styles = '<link rel="stylesheet" type="text/css"' +
'href="./src/styles/peer-detail.css"></link>' +
'<link rel="stylesheet" type="text/css"' +
'href="./src/styles/input.css"></link>';

  const html = `<section class="peer-detail-container">
  <!-- Peer Information -->
  <div class="peer-detail-information">
    <h3>{{name}}:{{port}}</h3>
    <p>{{description}}</p>
  </div>

  <!-- Chaincode Action -->
  <div class="peer-detail-chaincode-action">
    <h3>Deploy Chaincode For {{org}}</h3>
    <div class="input-container chaincode-name">
      <input 
        name="name"
        placeholder="name of chaincode" 
        value="{{chaincode.name}}">
    </div>
    <div class="input-container chaincode-version">
      <input 
        name="version"
        placeholder="version of chaincode" 
        value="{{chaincode.version}}">
    </div>
    <div class="input-container chaincode-path">
      <input
        name="path"
        placeholder="path/to/chaincode" 
        value="{{chaincode.path}}"
      >
    </div>
    <button class="deploy-button" 
      onclick="$scp_component.scp_peer_detail.deploy()">Deploy</button>
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
    }

    /**
     * trigger
     * @param {String} componentName
     * @param {object} payload
     **/
    async trigger(componentName, payload) {
      if (componentName === 'scp_peer_list' && payload.peerId) {
        this.data = await window.PeerDetail.fetch(payload);
        this.render();
      }
    }

    /**
     * lifecycle: connected
     **/
    connectedCallback() {
      window.$scp_component[this.name] = this;
    }

    /**
     * deploy
     **/
    deploy() {
      this.data.deploy();
    }

    /**
     * render
     **/
    render() {
      this.innerHTML = window.Mustache.render(html, this.data);
      this._chaincodeNameInput = this.querySelector('.chaincode-name > input');
      this._chaincodeVersionInput = this
          .querySelector('.chaincode-version > input');
      this._chaincodePathInput = this.querySelector('.chaincode-path > input');
      [
        this._chaincodePathInput,
        this._chaincodeVersionInput,
        this._chaincodeNameInput,
      ].forEach((input) => {
        input.addEventListener('change', (event) => {
          console.log(this.data);
          this.data.changeChaincode(event.target.name, event.target.value);
        });
      });
    }
  }

  if (!customElements.get('scp-peer-detail')) {
    customElements.define('scp-peer-detail', SCPPeerDetail);
  }
})();


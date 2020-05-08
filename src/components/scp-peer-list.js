(function() {
  const styles = '<link rel="stylesheet" type="text/css"' +
'href="./src/styles/peer-list.css"></link>' +
'<link rel="stylesheet" type="text/css"' +
'href="./src/styles/list.css"></link>';

  const html = `<section class="peer-list-container">
    {{#orgs}}
    <div class="peer-list-org-container">
      <mwc-list>
        <section class="list-header">
          <h3>{{orgName}} Peer List</h3>
        </section>
        <li divider role="separator"></li>
        {{#peers}}
        <mwc-list-item 
          onclick="$scp_component.scp_peer_list.selectPeer('{{id}}')">
          <div class="list-item">
            <p class="list-item-label">{{host}}:{{port}}</p>
          </div>
        </mwc-list-item>
        <li divider role="separator"></li>
        {{/peers}}
      </mwc-list>
    </div>
    {{/orgs}}
  </section>
${styles}
`;

  const MockPeerListData = {
    orgs: [
      {
        orgName: 'Org1',
        peers: [
          {
            host: 'peer0.org1.example.com',
            port: 7050,
          },
          {
            host: 'peer1.org1.example.com',
            port: 7051,
          },
        ],
      },
      {
        orgName: 'Org2',
        peers: [
          {
            id: '1',
            host: 'peer0.org2.example.com',
            port: 7050,
          },
          {
            id: '2',
            host: 'peer1.org2.example.com',
            port: 7051,
          },
        ],
      },
    ],
  };
  /**
   * SCPChannelList
   **/
  class SCPPeerList extends HTMLElement {
    /**
     * constructor
     **/
    constructor() {
      super();
      this.name = 'scp_peer_list';
      this.data = {
        selectedPeer: '',
      };
    }

    /**
     * trigger
     * @param {String} componentName
     * @param {object} payload
     **/
    async trigger(componentName, payload) {
      if (componentName === 'scp_channel_list' && payload.selectedChannel) {
        console.log(1);
        this.data = {
          selectedPeer: '',
          ...MockPeerListData,
        };
        this.render();
      }
    }

    /**
     * selectPeer
     * @param {String} peerId
     **/
    selectPeer(peerId) {
      this.data.selectedPeer = peerId;
      window.dispatchStateChange(this, {selectedPeer: peerId});
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

  if (!customElements.get('scp-peer-list')) {
    customElements.define('scp-peer-list', SCPPeerList);
  }
})();

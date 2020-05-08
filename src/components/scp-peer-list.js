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
        <mwc-list-item>
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
            host: 'peer0.org2.example.com',
            port: 7050,
          },
          {
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
     * lifecycle: connected
     **/
    connectedCallback() {
      this.render();
    }
    /**
     * render
     **/
    render() {
      this.innerHTML = window.Mustache.render(html, MockPeerListData);
    }
  }

  if (!customElements.get('scp-peer-list')) {
    customElements.define('scp-peer-list', SCPPeerList);
  }
})();

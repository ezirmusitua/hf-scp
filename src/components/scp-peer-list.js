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

  /**
   * SCPPeerList
   **/
  class SCPPeerList extends HTMLElement {
    /**
     * constructor
     **/
    constructor() {
      super();
      this.name = 'scp_peer_list';
      this.data = {};
    }

    /**
     * trigger
     * @param {String} componentName
     * @param {object} payload
     **/
    async trigger(componentName, payload) {
      if (componentName === 'scp_channel_list' && payload.channel) {
        this.data = await window.PeerList.fetch(payload);
        this.render();
        this.selectPeer(this.data.orgs[0].peers[0].id);
      }
    }

    /**
     * selectPeer
     * @param {String} peerId
     **/
    selectPeer(peerId) {
      window.dispatchStateChange(this, {
        peerId,
        channel: this.data.channel,
        env: this.data.env,
      });
    }

    /**
     * lifecycle: connected
     **/
    connectedCallback() {
      window.$scp_component[this.name] = this;
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

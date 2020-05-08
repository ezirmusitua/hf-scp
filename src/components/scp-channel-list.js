(function() {
  const styles = '<link rel="stylesheet" type="text/css"' +
'href="./src/styles/channel-list.css"></link>' +
'<link rel="stylesheet" type="text/css"' +
'href="./src/styles/list.css"></link>';

  const html = `<section class="channel-list-container">
    <mwc-list>
      <section class="list-header">
        <h3>Channel List</h3>
      </section>
      <li divider role="separator"></li>
      {{#channels}}
      <mwc-list-item>
        <p class="list-item-label">{{name}}</p>
      </mwc-list-item>
      <li divider role="separator"></li>
      {{/channels}}
    </mwc-list>
  ${styles}
</section>`;
  const MockChannelListData = {
    channels: [
      {
        name: 'mychannel',
      },
      {
        name: 'channel-1',
      },
      {
        name: 'channel-2',
      },
    ],
  };
  /**
   * SCPChannelList
   **/
  class SCPChannelList extends HTMLElement {
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
      this.innerHTML = window.Mustache.render(html, MockChannelListData);
    }
  }

  if (!customElements.get('scp-channel-list')) {
    customElements.define('scp-channel-list', SCPChannelList);
  }
})();


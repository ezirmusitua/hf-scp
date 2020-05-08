(function() {
  const styles =
    '<link rel="stylesheet" type="text/css"' +
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
      <!-- TODO: how to set event -->
      <mwc-list-item 
        selected
        onclick="$scp_component.scp_channel_list.selectChannel('{{name}}')">
        <p class="list-item-label" >{{name}}</p>
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
     * constructor
     **/
    constructor() {
      super();
      this.name = 'scp_channel_list';
      this.data = {
        selectedChannel: '',
        ...MockChannelListData,
      };
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

    /**
     * selectChannel
     * @param {String} channelName
     **/
    selectChannel(channelName) {
      window.dispatchStateChange(this, {selectedChannel: channelName});
    }
  }

  if (!customElements.get('scp-channel-list')) {
    customElements.define('scp-channel-list', SCPChannelList);
  }
})();

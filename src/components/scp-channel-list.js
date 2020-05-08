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
        onclick="$scp_component.scp_channel_list.selectChannel('{{name}}')">
        <p class="list-item-label" >{{name}}</p>
      </mwc-list-item>
      <li divider role="separator"></li>
      {{/channels}}
    </mwc-list>
  ${styles}
</section>`;
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
      this.data = {};
    }
    /**
     * trigger
     * @param {String} componentName
     * @param {object} payload
     **/
    async trigger(componentName, payload) {
      if (componentName === 'scp_env_tabs' && payload.env) {
        this.data = await window.ChannelList.fetch(payload);
        this.render();
        this.selectChannel(this.data.channels[0].name);
      }
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

    /**
     * selectChannel
     * @param {String} channelName
     **/
    selectChannel(channelName) {
      window.dispatchStateChange(this, {
        env: this.data.env,
        channel: channelName,
      });
    }
  }

  if (!customElements.get('scp-channel-list')) {
    customElements.define('scp-channel-list', SCPChannelList);
  }
})();

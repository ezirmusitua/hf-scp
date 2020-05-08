(function () {
  'use strict';

  const styles = '<link rel="stylesheet" type="text/css"' +
    'href="./src/styles/main.css"></style>';

  const html = `<div class="outer">
  <article class="main-container">
    <scp-env-tabs></scp-env-tabs>
    <section class="content-container">
      <scp-channel-list></scp-channel-list>
      <scp-peer-list></scp-peer-list>
      <scp-peer-detail></scp-peer-list>
    </section>
  </article>
</div>
${styles}`;

  /**
   * SCPMain
   * @desc main container of scp
   **/
  class SCPMain extends HTMLElement {
    /**
     * constructor
     **/
    constructor() {
      super();
      this.name = 'scp_main';
    }
    /**
     * lifecycle: connected
     **/
    connectedCallback() {
      this.innerHTML = html;
      window.$scp_component[this.name]= this;
    }
  }

  if (!customElements.get('scp-main')) {
    customElements.define('scp-main', SCPMain);
  }

  window.Config = {
    resourceBase: 'localhost',
  };

  window['$scp_state'] = {};

  window['$scp_component'] = {};

  window.dispatchStateChange = (component, payload) => {
    const event = document.createEvent('Event');
    event.initEvent('state_change_render', true, true);
    event.payload = payload;
    component.dispatchEvent(event);
  };

  // global state change event handler
  window.addEventListener('state_change_render', (res) => {
    res.target.render();
    Object.keys(window.$scp_component).forEach((componentName) => {
      if (window.$scp_component[componentName].trigger) {
        window.$scp_component[componentName].trigger(
            res.target.name,
            res.payload,
        );
      }
    });
    // window.$scp_component.render({selectedChannel: res.payload});
  });

  // import components
  // const head = document.querySelector('head');
  // [
  // './src/resources.js',
  // './src/models/Channel.js',
  // './src/models/Peer.js',
  // './src/components/scp-env-tabs.js',
  // './src/components/scp-channel-list.js',
  // './src/components/scp-peer-list.js',
  // './src/components/scp-peer-detail.js',
  // './src/index.js',
  // ].forEach((p) => {
  // const script = document.createElement('script');
  // script.src = p;
  // head.appendChild(script);
  // });

  const main = document.createElement(SCPMain.name);

  document.querySelector('body').appendChild(main);

}());

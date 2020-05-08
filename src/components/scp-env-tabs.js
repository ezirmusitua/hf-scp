(function() {
  // const styles = '<link rel="stylesheet" type="text/css"' +
  // 'href="./src/styles/peer-list.css"></link>';

  const styles = '';

  const html = `
${styles}
<div class="envs-tab">
  <mwc-tab-bar>
    {{#envs}}
    <mwc-tab label="{{name}}"></mwc-tab>
    {{/envs}}
  </mwc-tab-bar>
</div>
`;

  /**
   * SCPEnvTabs
   **/
  class SCPEnvTabs extends HTMLElement {
    /**
     * constructor
     **/
    constructor() {
      super();
      this.name = 'scp_env_tabs';
    }
    /**
     * connectedCallback
     **/
    connectedCallback() {
      this.render({
        envs: [
          {name: 'dev'}, {name: 'staging'}, {name: 'production'},
        ],
      });
      window.$scp_component[this.name] = this;
    }
    /**
     * render
     * @param {object} data
    **/
    render(data) {
      this.innerHTML = window.Mustache.render(html, data);
    }
  }

  if (!customElements.get('scp-env-tabs')) {
    customElements.define('scp-env-tabs', SCPEnvTabs);
  }
})();

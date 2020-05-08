(function() {
  const styles = '<link rel="stylesheet" type="text/css"' +
  'href="./src/styles/env-tabs.css"></link>';

  const html = `
${styles}
<div class="env-tabs">
    {{#envs}}
    <div class="tab-container"
      onclick="$scp_component.scp_env_tabs.selectEnv('{{name}}')">
      <span>{{name}}</span>
    </div>
    {{/envs}}
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
     * init
     **/
    async init() {
      this.data = await window.EnvList.fetch();
      console.log(this.data);
      this.render();
    }

    /**
     * selectEnv
     * @param {String} env
     **/
    selectEnv(env) {
      this.data.select(env);
      window.dispatchStateChange(this, {env});
    }

    /**
     * connectedCallback
     **/
    connectedCallback() {
      window.$scp_component[this.name] = this;
      this.init();
    }

    /**
     * render
     * @param {object} data
    **/
    render() {
      this.innerHTML = window.Mustache.render(html, this.data);
    }
  }

  if (!customElements.get('scp-env-tabs')) {
    customElements.define('scp-env-tabs', SCPEnvTabs);
  }
})();

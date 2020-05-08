(function() {
  // const styles = '<link rel="stylesheet" type="text/css"' +
  // 'href="./src/styles/peer-list.css"></link>';

  const styles = '';

  const html = `
${styles}
<div class="envs-tab">
  <mwc-tab-bar>
    <mwc-tab label="dev"></mwc-tab>
    <mwc-tab label="staging"></mwc-tab>
    <mwc-tab label="production"></mwc-tab>
  </mwc-tab-bar>
</div>
`;

  /**
   * SCPEnvTabs
   **/
  class SCPEnvTabs extends HTMLElement {
    /**
     * connectedCallback
     **/
    connectedCallback() {
      this.innerHTML = html;
    }
  }

  if (!customElements.get('scp-env-tabs')) {
    customElements.define('scp-env-tabs', SCPEnvTabs);
  }
})();

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
export class SCPMain extends HTMLElement {
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

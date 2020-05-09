import { SCPElement } from "../SCPElement";
import { MainStyle } from "../styles/main";

export class SCPMain extends SCPElement {
  get styles() {
    const ms = new MainStyle();
    return `${ms.toCSS()}`;
  }

  get html() {
    return `<div class="outer">
    <article class="main-container">
      <scp-env-tabs></scp-env-tabs>
      <section class="content-container">
        <scp-channel-list></scp-channel-list>
        <scp-peer-list></scp-peer-list>
        <scp-peer-detail></scp-peer-list>
      </section>
    </article>
  </div>`;
  }
}

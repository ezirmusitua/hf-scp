import { SCPElement } from "../SCPElement";
import { PeerListStyle } from "../styles/peer-list";
import { ListStyle } from "../styles/list";
import { PeerList } from "../models/Peer";

export class SCPPeerList extends SCPElement {
  get styles() {
    const pls = new PeerListStyle();
    const ls = new ListStyle();
    return `
    ${pls.toCSS()}
    ${ls.toCSS()}`;
  }

  get html() {
    return `<section class="peer-list-container">
    {{#orgs}}
    <div class="peer-list-org-container">
      <mwc-list>
        <section class="list-header">
          <h3>{{orgName}} Peer List</h3>
        </section>
        <li divider role="separator"></li>
        {{#peers}}
        <mwc-list-item 
          onclick="$scp_component.SCPPeerList.selectPeer('{{id}}')">
          <div class="list-item">
            <p class="list-item-label">{{host}}:{{port}}</p>
          </div>
        </mwc-list-item>
        <li divider role="separator"></li>
        {{/peers}}
      </mwc-list>
    </div>
    {{/orgs}}
  </section>`;
  }

  async trigger(componentName, payload) {
    if (componentName === "SCPChannelList" && payload.channel) {
      this.data = await PeerList.fetch(payload);
      this.render();
      this.selectPeer(this.data.orgs[0].peers[0].id);
    }
  }

  selectPeer(peerId) {
    this.data.select(peerId);
    dispatchStateChange(this, {
      peerId,
      channel: this.data.channel,
      env: this.data.env,
    });
  }
}

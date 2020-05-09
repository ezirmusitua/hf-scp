import { SCPElement } from "../SCPElement";
import { PeerDetailStyle } from "../styles/peer-detail";
import { InputStyle } from "../styles/input";
import { PeerDetail } from "../models/Peer";

export class SCPPeerDetail extends SCPElement {
  get styles() {
    const pds = new PeerDetailStyle();
    const is = new InputStyle();
    return `
    ${pds.toCSS()}
    ${is.toCSS()}
    `;
  }

  get html() {
    return `<section class="peer-detail-container">
  <!-- Peer Information -->
  <div class="peer-detail-information">
    <h3>{{name}}:{{port}}</h3>
    <p>{{description}}</p>
  </div>

  <!-- Chaincode Action -->
  <div class="peer-detail-chaincode-action">
    <h3>Deploy Chaincode For {{org}}</h3>
    <div class="input-container chaincode-name">
      <input 
        name="name"
        placeholder="name of chaincode" 
        value="{{chaincode.name}}">
      </div>
      <div class="input-container chaincode-version">
        <input 
        name="version"
        placeholder="version of chaincode" 
        value="{{chaincode.version}}">
      </div>
      <div class="input-container chaincode-path">
        <input
        name="path"
        placeholder="path/to/chaincode" 
        value="{{chaincode.path}}"
      >
      </div>
      <button class="deploy-button" 
      onclick="$scp_component.SCPPeerDetail.deploy()">Deploy</button>
  </div>

  <!-- Installed Chaincodes -->
  <div class="peer-detail-chaincode-list">
    <h3>Installed Chaincodes</h3>
    <mwc-list>
      {{#installed}}
      <mwc-list-item>
        <div class="list-item">
          <p class="list-item-label">{{name}}#{{version}}</p>
        </div>
      </mwc-list-item>
      <li divider role="separator"></li>
      {{/installed}}
    </mwc-list>
  </div>
</section>`;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.listen();
  }

  async trigger(componentName, payload) {
    if (componentName === "SCPPeerList" && payload.peerId) {
      this.data = await PeerDetail.fetch(payload);
      this.render();
      this.listen();
    }
  }

  deploy() {
    this.data.deploy();
  }

  listen() {
    [
      this.querySelector(".chaincode-name > input"),
      (this._ccVersionInput = this.querySelector(".chaincode-version > input")),
      (this._ccPathInput = this.querySelector(".chaincode-path > input")),
    ].forEach((input) => {
      console.log(input);
      if (input) {
        input.onchange = (event) =>
          this.data.changeChaincode(event.target.name, event.target.value);
        input.addEventListener("change", (event) => {
          console.log(this.data);
          this.data.changeChaincode(event.target.name, event.target.value);
        });
      }
    });
  }
}

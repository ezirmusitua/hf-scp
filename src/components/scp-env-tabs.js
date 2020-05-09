import { EnvList } from "../models/Channel";
import { SCPElement } from "../SCPElement";
import { EnvTabsStyle } from "../styles/env-tabs";

export class SCPEnvTabs extends SCPElement {
  connectedCallback() {
    super.connectedCallback();
    this.init();
  }

  get styles() {
    const ets = new EnvTabsStyle();
    return `${ets.toCSS()}`;
  }

  get html() {
    return `<div class="env-tabs">
  {{#envs}}
  <div class="tab-container"
    onclick="$scp_component.SCPEnvTabs.selectEnv('{{name}}')">
    <span>{{name}}</span>
  </div>
  {{/envs}}
</div>`;
  }
  async init() {
    this.data = await EnvList.fetch();
    this.render();
  }

  selectEnv(env) {
    this.data.select(env);
    dispatchStateChange(this, { env });
  }
}

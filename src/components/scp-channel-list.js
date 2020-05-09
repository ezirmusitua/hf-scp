import { ChannelList } from "../models/Channel";
import { SCPElement } from "../SCPElement";
import { ChannelListStyle } from "../styles/channel-list";
import { ListStyle } from "../styles/list";

export class SCPChannelList extends SCPElement {
  get styles() {
    const cls = new ChannelListStyle();
    const ls = new ListStyle();
    return `
    ${cls.toCSS()}
    ${ls.toCSS()}
    `;
  }

  get html() {
    return `<section class="channel-list-container">
  <mwc-list>
    <section class="list-header">
      <h3>Channel List</h3>
    </section>
    <li divider role="separator"></li>
      {{#channels}}
      <!-- TODO: how to set event -->
      <mwc-list-item 
        onclick="$scp_component.SCPChannelList.selectChannel('{{name}}')">
        <p class="list-item-label" >{{name}}</p>
      </mwc-list-item>
      <li divider role="separator"></li>
      {{/channels}}
    </mwc-list>
</section>`;
  }

  async trigger(componentName, payload) {
    if (componentName === "SCPEnvTabs" && payload.env) {
      this.data = await ChannelList.fetch(payload);
      this.render();
      this.selectChannel(this.data.channels[0].name);
    }
  }

  selectChannel(channelName) {
    this.data.select(channelName);
    window.dispatchStateChange(this, {
      env: this.data.env,
      channel: channelName,
    });
  }
}

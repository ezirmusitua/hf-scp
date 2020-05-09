import "@material/mwc-list/mwc-list.js";
import "@material/mwc-list/mwc-list-item.js";
import { snakeCase } from "snake-case";
import { SCPMain } from "./components/scp-main";
import { SCPChannelList } from "./components/scp-channel-list";
import { SCPEnvTabs } from "./components/scp-env-tabs";
import { SCPPeerList } from "./components/scp-peer-list";
import { SCPPeerDetail } from "./components/scp-peer-detail";

// global state change event handler
window["$scp_state"] = {};
window["$scp_component"] = {};

window.dispatchStateChange = (component, payload) => {
  const event = document.createEvent("Event");
  event.initEvent("state_change_render", true, true);
  event.payload = payload;
  component.dispatchEvent(event);
};
window.addEventListener("state_change_render", (res) => {
  res.target.render();
  Object.keys(window.$scp_component).forEach((componentName) => {
    if (window.$scp_component[componentName].trigger) {
      window.$scp_component[componentName].trigger(
        res.target.name,
        res.payload
      );
    }
  });
});

// register custom elements
[SCPPeerDetail, SCPPeerList, SCPEnvTabs, SCPChannelList, SCPMain].forEach(
  (ce) => {
    console.log(ce.name, snakeCase(ce.name).replace(/_/g, "-"));
    customElements.define(snakeCase(ce.name).replace(/_/g, "-"), ce);
  }
);

const app = document.createElement(snakeCase(SCPMain.name).replace(/_/g, "-"));
document.querySelector("body").appendChild(app);

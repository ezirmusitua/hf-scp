import '@webcomponents/webcomponentsjs';
import '@material/mwc-button';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-tab-bar';
import '@material/mwc-tab';
import '@material/mwc-textfield';
import '@material/mwc-icon';
import 'mustache';
import {SCPMain} from './components/scp-main';

window.Config = {
  resourceBase: 'localhost',
};

window['$scp_state'] = {};

window['$scp_component'] = {};

window.dispatchStateChange = (component, payload) => {
  const event = document.createEvent('Event');
  event.initEvent('state_change_render', true, true);
  event.payload = payload;
  component.dispatchEvent(event);
};

// global state change event handler
window.addEventListener('state_change_render', (res) => {
  res.target.render();
  Object.keys(window.$scp_component).forEach((componentName) => {
    if (window.$scp_component[componentName].trigger) {
      window.$scp_component[componentName].trigger(
          res.target.name,
          res.payload,
      );
    }
  });
  // window.$scp_component.render({selectedChannel: res.payload});
});

// import components
// const head = document.querySelector('head');
// [
// './src/resources.js',
// './src/models/Channel.js',
// './src/models/Peer.js',
// './src/components/scp-env-tabs.js',
// './src/components/scp-channel-list.js',
// './src/components/scp-peer-list.js',
// './src/components/scp-peer-detail.js',
// './src/index.js',
// ].forEach((p) => {
// const script = document.createElement('script');
// script.src = p;
// head.appendChild(script);
// });

const main = document.createElement(SCPMain.name);

document.querySelector('body').appendChild(main);


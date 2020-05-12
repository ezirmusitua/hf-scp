import { SCPStyle } from "../SCPStyle";

export class PeerListStyle extends SCPStyle {
  constructor() {
    super();
    this.keys = ["peerListContainer", "listHeader", "listItem"];
  }

  get peerListContainer() {
    return {
      selector: ".peer-list-container",
      style: {
        backgroundColor: "#1191e2",
        height: "100%",
      },
    };
  }

  get listHeader() {
    return {
      selector: ".list-header",
      style: {
        fontSize: "16px",
      },
    };
  }

  get listItem() {
    return {
      selector: ".peer-list-org-container .list-item",
      style: {
        paddingLeft: "16px",
      },
    };
  }
}

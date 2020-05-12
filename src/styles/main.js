import { SCPStyle } from "../SCPStyle";

export class MainStyle extends SCPStyle {
  constructor() {
    super();
    this.keys = [
      "outer",
      "mainContainer",
      "contentContainer",
      "scpChannelList",
      "scpPeerList",
      "scpPeerDetail",
    ];
  }

  get outer() {
    return {
      selector: ".outer",
      style: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f1f1f1",
      },
    };
  }

  get mainContainer() {
    return {
      selector: ".main-container",
      style: {
        height: "100%",
        width: "66%",
        minWidth: "1080px",
      },
    };
  }

  get contentContainer() {
    return {
      selector: ".content-container",
      style: {
        display: "flex",
        marginTop: "16px",
        width: "100%",
        height: "100%",
        backgroundColor: "#e1e1e1",
        borderRadius: "6px",
        boxShadow: "#272839 0px 4px 12px",
        boxSizing: "border-box",
        maxHeight: "calc(100vh - 120px)",
      },
    };
  }

  get scpChannelList() {
    return {
      selector: ".content-container scp-channel-list",
      style: {
        flexBasis: "15%",
      },
    };
  }

  get scpPeerList() {
    return {
      selector: ".content-container scp-peer-list",
      style: {
        flexBasis: "20%",
      },
    };
  }
  get scpPeerDetail() {
    return {
      selector: ".content-container scp-peer-detail",
      style: {
        flexBasis: "65%",
      },
    };
  }
}

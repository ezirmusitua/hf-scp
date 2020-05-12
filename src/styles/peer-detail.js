import { SCPStyle } from "../SCPStyle";

export class PeerDetailStyle extends SCPStyle {
  constructor() {
    super();
    this.keys = [
      "container",
      "information",
      "chaincodeAction",
      "chaincodeActionH3",
      "chaincodeActionName",
      "chaincodeActionVersion",
      "chaincodeActionPath",
      "chaincodeActionDeployBtn",
      "chaincodeList",
      "chaincodeListH3",
    ];
  }

  get container() {
    return {
      selector: ".peer-detail-container",
      style: {
        display: "flex",
        flexDirection: "column",
        borderTopRightRadius: "6px",
        borderBottomRightRadius: "6px",
        padding: "32px",
      },
    };
  }

  get information() {
    return {
      selector: ".peer-detail-information",
      style: {
        height: "80px",
        padding: "20px",
        background: "#1171e3",
        borderRadius: "6px",
        marginBottom: "12px",
        boxShadow: "#272839 0px 2px 6px",
      },
    };
  }

  get chaincodeAction() {
    return {
      selector: ".peer-detail-chaincode-action",
      style: {
        background: "#1171e3",
        borderRadius: "6px",
        marginBottom: "12px",
        boxShadow: "#272839 0px 2px 6px",
        display: "flex",
        flexWrap: "wrap",
        padding: "20px",
      },
    };
  }

  get chaincodeActionH3() {
    return {
      selector:
        ".peer-detail-chaincode-action h3, .peer-detail-chaincode-list h3",
      style: {
        flexBasis: "100%",
        fontSize: "20px",
        fontWeight: "bold",
      },
    };
  }

  get chaincodeActionName() {
    return {
      selector: ".peer-detail-chaincode-action .chaincode-name",
      style: {
        flex: "4",
        marginRight: "8px",
      },
    };
  }

  get chaincodeActionVersion() {
    return {
      selector: ".peer-detail-chaincode-action .chaincode-version",
      style: {
        flex: "3",
        marginRight: "8px",
      },
    };
  }

  get chaincodeActionPath() {
    return {
      selector: ".peer-detail-chaincode-action .chaincode-path",
      style: {
        flex: "5",
      },
    };
  }

  get chaincodeActionDeployBtn() {
    return {
      selector: ".peer-detail-chaincode-action button",
      style: {
        flexBasis: "100%",
        border: "none",
        borderRadius: "4px",
        color: "#eaeaea",
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#11aff1",
        marginTop: "8px",
        height: "40px",
      },
    };
  }

  get chaincodeListH3() {
    return {
      selector: ".peer-detail-chaincode-list h3",
      style: {
        padding: "20px 20px 8px 20px",
      },
    };
  }

  get chaincodeList() {
    return {
      selector: ".peer-detail-chaincode-list",
      style: {
        flex: "1",
        background: "#1171e3",
        borderRadius: "6px",
        marginBottom: "12px",
        boxShadow: "#272839 0px 2px 6px",
        maxHeight: "calc(100vh - 500px)",
        overflowY: "scroll",
      },
    };
  }
}

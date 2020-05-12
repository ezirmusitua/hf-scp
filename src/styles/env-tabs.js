import { SCPStyle } from "../SCPStyle";

export class EnvTabsStyle extends SCPStyle {
  constructor() {
    super();
    this.keys = [
      "envTabs",
      "tabContainer",
      "tabContainerHover",
      "tabContainerHover",
      "tabContainerFirstChild",
      "tabContainerLastChild",
      "tabSpan",
    ];
  }
  get envTabs() {
    return {
      selector: ".env-tabs",
      style: {
        width: "100%",
        display: "flex",
        marginTop: "12px",
        backgroundColor: "#88aaee",
        boxShadow: "#a2a2a2 0 8px 4px",
        borderRadius: "6px",
      },
    };
  }

  get tabContainer() {
    return {
      selector: ".env-tabs .tab-container",
      style: {
        flex: "1",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "64px",
      },
    };
  }

  get tabContainerHover() {
    return {
      selector: ".env-tabs .tab-container:hover",
      style: {
        backgroundColor: "#aaaaee",
      },
    };
  }

  get tabContainerFirstChild() {
    return {
      selector: ".env-tabs .tab-container:first-child",
      style: {
        borderTopLeftRadius: "6px",
        borderBottomLeftRadius: "6px",
        borderRight: "1px solid white",
      },
    };
  }

  get tabContainerLastChild() {
    return {
      selector: ".env-tabs .tab-container:last-child",
      style: {
        borderTopRightRadius: "6px",
        borderBottomRightRadius: "6px",
        borderRight: "1px solid white",
      },
    };
  }

  get tabSpan() {
    return {
      selector: ".env-tabs .tab-container span",
      style: {
        fontSize: "28px",
        color: "#efefef",
      },
    };
  }
}

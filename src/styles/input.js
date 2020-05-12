import { SCPStyle } from "../SCPStyle";

export class InputStyle extends SCPStyle {
  constructor() {
    super();
    this.keys = ["inputContainer", "input"];
  }

  get inputContainer() {
    return {
      selector: ".input-container",
      style: {
        height: "40px",
        backgroundColor: "transparent",
        position: "relative",
        boxSizing: "border-box",
      },
    };
  }

  get input() {
    return {
      selector: ".input-container input",
      style: {
        backgroundColor: "transparent",
        border: "none",
        borderBottom: "1px solid #ffffff",
        height: "100%",
        width: "100%",
        color: "#fafafa",
        boxSizing: "border-box",
        padding: "0 32px 0 16px",
      },
    };
  }
}

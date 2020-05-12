import { SCPStyle } from "../SCPStyle";

export class ListStyle extends SCPStyle {
  constructor() {
    super();
    this.keys = ["listHeader", "listHeaderH3", "itemLabel"];
  }

  get listHeader() {
    return {
      selector: ".list-header",
      style: {},
    };
  }

  get listHeaderH3() {
    return {
      selector: ".list-header h3",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        margin: "4px 12px",
      },
    };
  }

  get itemLabel() {
    return {
      selector: ".list-item-label",
      style: {
        fontSize: "16px",
        wordBreak: "break-all",
        fontWeight: "bold",
      },
    };
  }
}

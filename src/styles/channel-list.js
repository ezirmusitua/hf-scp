import { SCPStyle } from "../SCPStyle";

export class ChannelListStyle extends SCPStyle {
  constructor() {
    super();
    this.keys = ["channelListContainer"];
  }

  get channelListContainer() {
    return {
      selector: ".channel-list-container",
      style: {
        height: "100%",
        backgroundColor: "#11a1e1",
        borderTopLeftRadius: "6px",
        borderBottomLeftRadius: "6px",
      },
    };
  }
}

import { getResource } from "../resources";
import { Config } from "../config";
export class EnvList {
  constructor(envs) {
    this.currentEnv = "";
    this.envs = envs;
  }

  select(env) {
    if (this.currentEnv === env) return;
    this.currentEnv = env;
    this.envs = this.envs.map((envObj) => {
      const selected = envObj.name.startsWith("*");
      const shouldSelect = envObj.name === env;
      if (shouldSelect && selected) return envObj;
      if (shouldSelect && !selected) {
        envObj.name = `* ${envObj.name}`;
      }
      if (selected) {
        envObj.name = envObj.name.slice(2);
      }
      return envObj;
    });
  }

  static async fetch() {
    if (Config.resourceBase === "localhost") {
      return new EnvList([
        { name: "dev" },
        { name: "staging" },
        { name: "production" },
      ]);
    }
    const url = `${Config.resourceBase}/env`;
    return new EnvList(payload.env, await getResource(url));
  }
}

export class Channel {
  constructor(name, env) {
    this.name = name;
    this.env = env;
  }
}

export class ChannelList {
  constructor(env, channels = []) {
    this.env = env;
    this.channels = channels.map((channel) => new Channel(channel.name, env));
    this.selectedChannel = "";
  }

  select(channel) {
    if (this.selectedChannel === channel) return;
    this.channels = this.channels.map((channel) => {
      const selected = name.startsWith("*");
      const shouldSelect = name === channel;
      if (shouldSelect && selected) return channel;
      if (shouldSelect && !selected) {
        channel.name = `* ${name}`;
      }
      if (selected) {
        channel.name = name.slice(2);
      }
      return channel;
    });
  }

  static async fetch(payload) {
    // if (this.env === payload.env) return;
    if (Config.resourceBase === "localhost") {
      return new ChannelList(payload.env, [
        {
          name: "mychannel",
        },
        {
          name: "channel-1",
        },
        {
          name: "channel-2",
        },
      ]);
    }
    const url = `${Config.resourceBase}/channel?env=${env}`;
    return new ChannelList(payload.env, await getResource(url));
  }
}

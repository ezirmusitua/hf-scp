(function() {
  /**
   * EnvList
   **/
  window.EnvList = class EnvList {
    /**
     * constructor
     * @param {Array} envs
     **/
    constructor(envs) {
      this.envs = envs;
    }

    /**
     * fetch
     **/
    static async fetch() {
      if (window.Config.resourceBase === 'localhost') {
        return new EnvList([
          {name: 'dev'},
          {name: 'staging'},
          {name: 'production'},
        ]);
      }
      const url = `${window.Config.resourceBase}/env`;
      return new EnvList(payload.env, await window.getResource(url));
    }
  };

  /**
   * Channel
   **/
  window.Channel = class Channel {
    /**
     * constructor
     * @param {String} name
     * @param {String} env
     **/
    constructor(name, env) {
      this.name = name;
      this.env = env;
    }
  };

  /**
   * ChannelList
   **/
  window.ChannelList = class ChannelList {
    /**
     * constructor
     * @param {String} env
     * @param {Array} channels
     **/
    constructor(env, channels = []) {
      this.env = env;
      this.channels = channels.map((channel) => new Channel(channel.name, env));
    }

    /**
     * fetch
     * @param {object} payload
     **/
    static async fetch(payload) {
      if (window.Config.resourceBase === 'localhost') {
        return new ChannelList(payload.env, [
          {
            name: 'mychannel',
          },
          {
            name: 'channel-1',
          },
          {
            name: 'channel-2',
          },
        ]);
      }
      const url = `${window.Config.resourceBase}/channel?env=${env}`;
      return new ChannelList(payload.env, await window.getResource(url));
    }
  };
})();

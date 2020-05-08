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
     * select
     * @param {String} env
     **/
    select(env) {
      this.envs = this.envs.map(({name}) => {
        if (name === env) {
          return {name: `* ${name}`};
        }
        if (name.startsWith('*')) {
          return {name: name.slice(2)};
        }
        return {name};
      });
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
     * select
     * @param {String} channel
     **/
    select(channel) {
      this.channels = this.channels.map(({name}) => {
        if (name === channel) {
          return {name: `* ${name}`};
        }
        if (name.startsWith('*')) {
          return {name: name.slice(2)};
        }
        return {name};
      });
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

const randomString = require('randomstring')
;

const randomId = () => randomString.generate({length:8, readable:true});

/**
 * Time-Series Data point, for charting
 */
class TSData {
  constructor(timestamp=null, value=null) {
    this.timestamp = timestamp !== null ? timestamp : new Date();
    this.value = value !== null ? value : Math.random();
  }
}

/**
 * In-memory websocket 'channel'
 */
class Channel {
  constructor() {
    this.id = randomId();
    this.listeners = new Set();
  }

  /**
   * addListener adds a listener to this channel
   *
   * @param {WebSocket} ws The websocket which is listening to this channel
   */
  addListener(ws) {
    this.listeners.add(ws);
  }

  /**
   * removeListener removes a listener from this channel
   *
   * @param {WebSocket} ws The websocket which was listening to this channel
   */
  removeListener(ws) {
    this.listeners.delete(ws);
  }

  toObject() {
    return {
      id: this.id,
      numListeners: this.listeners.size
    };
  }

  /**
   * notifies each listener with the given data
   *
   * @param {*} data The data to send to all listeners
   */
  notify(data) {
    for (let ws of this.listeners) {
      // may error out??
      ws.send(JSON.stringify(data));
    }
  }
}

class ChannelStore {
  constructor() {
    this.channels = new Map();
  }

  addListener(channelId, ws) {
    this.getChannel(channelId).addListener(ws);
  }

  removeListener(channelId, ws) {
    this.getChannel(channelId).removeListener(ws);
  }

  /**
   * Creates a new channel, adds it to channels, returns the id
   *
   * @return {Channel} The newly created channel
   */
  newChannel() {
    const channel = new Channel();
    this.channels.set(channel.id, channel);
    return channel;
  }

  /**
   * Returns true if channelId is in channels
   * 
   * @param {String} channelId The channel id to check for
   * @return {Boolean} True if the channel id is in the set
   */
  hasChannel(channelId) {
    return this.channels.has(channelId);
  }

  getChannel(channelId) {
    return this.channels.get(channelId);
  }

  sendRandom() {
    for (let [_, channel] of this.channels) channel.notify(new TSData());
  }

  toIdArray() {
    return (
      Array.from(this.channels)
        .map(([id, _]) => id)
    );
  }

  toJSON() {
    JSON.stringify(this.toIdArray());
  }
}

module.exports = { ChannelStore, Channel, TSData };

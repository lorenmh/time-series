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

  /**
   * Creates a new channel, adds it to channels, returns the id
   *
   * @return {String} The id of the newly created channel
   */
  newChannel() {
    const channel = new Channel();
    this.channels.set(channel.id, channel);
    return channel.id;
  }

  sendRandom() {
    for (let [_, channel] of this.channels) channel.notify(new TSData());
  }
}

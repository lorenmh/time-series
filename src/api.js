import config from '../config.js';

import { get } from './http';

export function getChannels() {
  return get(config.path.channel);
}

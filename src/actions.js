export const INITIALIZE = 'INITIALIZE';
export const UPDATE_CHANNELS = 'UPDATE_CHANNELS';

export function initialAction() {
  return {
    type: INITIALIZE
  };
}

export function updateChannels(channels=[]) {
  return {
    type: UPDATE_CHANNELS,
    channels
  };
}

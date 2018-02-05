export const INITIALIZE = 'INITIALIZE';
export const SET_CHANNELS = 'SET_CHANNELS';
export const CREATE_CHANNEL = 'CREATE_CHANNEL';
export const GET_CHANNELS_SUCCEEDED = 'GET_CHANNELS_SUCCEEDED';
export const GET_CHANNELS_FAILED = 'GET_CHANNELS_FAILED';

export const action = (type, params) => ({type, ...params});

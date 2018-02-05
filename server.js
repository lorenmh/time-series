const express = require('express'),
  expressWS = require('express-ws'),
  { ChannelStore } = require('./src/models')
;

const PORT = 3000,
  CWD = process.cwd(),
  APP_HTML = `${CWD}/index.html`
;

const app = express(),
  channelStore = new ChannelStore()
;

expressWS(app);

app.use('/static',express.static('src'));

app.get('/api/channel(/:channelId)?', (request, response) => {
  const { channelId } = request.params;

  if (channelId === undefined) return response.json(channelStore.toIdArray());
  if (!channelStore.hasChannel(channelId)) return response.status(404).end();
  response.json(channelStore.getChannel(channelId).toObject());
});

app.post('/api/channel/?', (request, response) => {
  response.json(channelStore.newChannel().toObject());
});

app.get('/', (request, response) => response.sendFile(APP_HTML));

//app.ws('/', (ws, request) => ws.on('message', (msg) => ws.send(msg)));
app.ws('/listen/channel/:channelId', (ws, request) => {
  const { channelId } = request.params;

  if (channelId === undefined) return ws.close(404);
  if (!channelStore.hasChannel(channelId)) return ws.close(404);

  channelStore.addListener(channelId, ws);
  ws.on('close', () => channelStore.removeListener(channelId, ws));
});

//setInterval(

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));

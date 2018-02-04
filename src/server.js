const express = require('express'),
  expressWS = require('express-ws')
;

const PORT = 3000,
  CWD = process.cwd(),
  APP_HTML = `${CWD}/index.html`,
  APP_SCRIPT = `${CWD}/app.js`
;

const app = express();
expressWS(app);

app.get('/', (request, response) => response.sendFile(APP_HTML));
app.get('/app.js', (request, response) => response.sendFile(APP_SCRIPT));

app.ws('/', (ws, request) => ws.on('message', (msg) => ws.send(msg)));

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));

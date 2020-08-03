var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
let history = require("connect-history-api-fallback")

let app = express();
let client = serveStatic(__dirname + "/dist");

app.use(client);
app.use(history({ disableDotRule: true }));
app.use(client);

const port = process.env.PORT || 8080
app.listen(port);
console.log('server started on port: ' + port);

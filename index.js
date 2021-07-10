// Source
// https://github.com/http-party/node-http-proxy#setup-a-stand-alone-proxy-server-with-custom-server-logic
// https://github.com/http-party/node-http-proxy#setup-a-stand-alone-proxy-server-with-proxy-request-header-re-writing
const http = require('http');
const httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
  console.log(proxyReq.method, proxyReq.path);
});

const server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://127.0.0.1:80' });
});

console.log("listening on port 5050")
server.listen(5050);
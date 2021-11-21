const http = require('http');
const fs = require('fs');

const server = http.createServer(async function (req, res) {

  switch (req.method) {
    case 'GET':

      switch (req.url) {
        case '/users':

          const usersJson = fs.readFileSync('users.json');

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8;' });
          res.end(usersJson);

          break;

        default:

          const htmlIndex = fs.readFileSync('index.html');

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8;' });
          res.end(htmlIndex);

          break;
      }

      break;

    case 'POST':

      const buffers = [];

      for await (let chunk of req) {
        buffers.push(chunk);
      }

      const data = Array.from(new URLSearchParams(decodeURI(Buffer.concat(buffers).toString())).entries());

      let dataJson = {};

      data.forEach(function (formData) {
        dataJson[formData[0]] = formData[1];
      });

      res.writeHead(200, { 'Content-Type': 'application/json charset=utf-8' });
      res.end(JSON.stringify(dataJson));

      break;

    default:
      break;
  }

})

const port = (process.env.PORT || 3000)

server.listen(port, function () {
  console.log(`servidor rodando --> http://localhost:${port}`)
})
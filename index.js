const http = require('http')

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('Ola Mundo querido!')
})

const port = (process.env.PORT || 3000)

server.listen(port, function () {
  console.log(`servidor rodando --> http://localhost:${port}`)
})
const Raspi = require('raspi-io').RaspiIO
const five = require('johnny-five')
const restify = require('restify')

const board = new five.Board({
  io: new Raspi()
})

const server = restify.createServer()

board.on('ready', () => {
  let lamp = new five.Led('GPIO6')

  server.get('/lamp/:on', setLampState)

  function setLampState(req, res, next) {
    let state = req.params.on === 'true'
    if(state){
      lamp.on()
      res.send('lamp on')
    } else {
      lamp.off()
      res.send('lamp off')
    }
    next()
  }

  server.listen(8000, () => {
    console.log('server listening on port ' + server.url)
  })
})

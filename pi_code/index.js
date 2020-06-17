const Raspi = require('raspi-io').RaspiIO
const five = require('johnny-five')
const restify = require('restify')

const board = new five.Board({
  io: new Raspi()
})

const server = restify.createServer()

board.on('ready', () => {
  let lamp = new five.Led('GPIO6')
  let temp = new five.Multi({
    controller: 'SI7020',
    freq: 3000
  })
  let celsius = 21

  server.get('/lamp/:on', setLampState)
  server.get('/temp', sendTemp)

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

  function sendTemp(req, res, next) {
    res.send('The temperature in Celsius is :' + celsius)
    next()
  }

  temp.on('change', function(){
    console.log(this.thermometer.celsius)
    celsius = this.thermometer.celsius
  })

  server.listen(8000, () => {
    console.log('server listening on port ' + server.url)
  })
})

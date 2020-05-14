const Raspi = require('raspi-io').RaspiIO
const five = require('johnny-five')

const board = new five.Board({
	io: new Raspi()
})

board.on('ready', () => {
	const lamp = new five.Led('P1-7')
	lamp.strobe();
})

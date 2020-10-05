const Redis = require('redis')
const Raspi = require('raspi-io').RaspiIO
const five = require('johnny-five')
const board = new five.Board({
	io: new Raspi()
})

const parent = Redis.createClient({
	host: 'pi-iot-push.local'
})

const publisher = Redis.createClient({
	host: 'pi-iot-push.local'
})
board.on('ready', () => {
	console.log('board ready')
	let multi = new five.Multi({
		controller: "BME280"
	})
	parent.on('ready', () => {
		console.log('connected to parent')
		parent.subscribe('iot-push')
		parent.subscribe('iot-sensor-data')
		let celsius, fahrenheit, kelvin, pressure, relativeHumidity, feet, meters
		
		multi.on("change", function () {
			celsius = this.thermometer.celsius
			fahrenheit = this.thermometer.fahrenheit
			kelvin = this.thermometer.kelvin
			pressure = this.barometer.pressure
			relativeHumidity = this.hygrometer.relativeHumidity
			feet = this.altimeter.feet
			meters = this.altimeter.meters
		})

		function publishData() {
			publisher.publish('iot-sensor-data', JSON.stringify({
				type: 'temp',
				value: {
					zone: 'lab',
					fahrenheit,
					celsius,
					kelvin
				}
			}))
			publisher.publish('iot-sensor-data', JSON.stringify({
				type: 'barometer-pressure',
				value: {
					zone: 'lab',
					pressure
				}
			}))
			publisher.publish('iot-sensor-data', JSON.stringify({
				type: 'altimeter',
				value: {
					zone: 'lab',
					feet,
					meters
				}
			}))
		}

		setTimeout(publishData, 1000)
		setInterval(publishData, 60000)
	})
})



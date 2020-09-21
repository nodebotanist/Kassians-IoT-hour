const Redis = require('redis')

const parent = Redis.createClient({
	host: 'pi-iot-push.local'
})

const publisher = Redis.createClient({
	host: 'pi-iot-push.local'
})

parent.on('ready', () => {
	console.log('connected to parent')
	parent.subscribe('iot-push')
	parent.subscribe('iot-sensor-data')

	setInterval(() => {
		publisher.publish('iot-sensor-data', Math.floor(Math.random() * 4) + 25)
	}, 5000)
})



const http = require("http")
const redis = require("redis")
const Hapi = require('@hapi/hapi')
const Bluebird = require('bluebird')

const pubsub = redis.createClient()
const tempSubscriber = redis.createClient()
const promiselrange = Bluebird.promisify(pubsub.lrange, {context: pubsub})

const host = 'localhost'
const port = 8000

const init = async () => {

	const server = Hapi.server({
		port,
		host
	});

	server.route({
		method: ['GET'],
		path: '/', 
		handler: (req, h) => {
			pubsub.publish("iot-push", 'main')
			return `{"message": "Message published"}`
		}
	})

	server.route({
		method: ['GET'],
		path: '/sensor-data/{zone}/{type}', 
		handler: async (req, h) => {
			const result = await new Bluebird((resolve) => {
				promiselrange(`${req.params.zone}-${req.params.type}`, 0, 25)
					.then((result) => {
						resolve(result)
					})
			})
			return result
		}
	})

	await server.start()
	console.log('Server running on %s', server.info.uri)
};

process.on('unhandledRejection', (err) => {
	console.log(err)
	process.exit(1)
})

tempSubscriber.on("message", (channel, message) => {
	console.log(`Channel: ${channel} Message: ${message}`)

	if(channel === 'iot-sensor-data') {
		let data = JSON.parse(message)
		data.value.timestamp = new Date()
		pubsub.lpush(`${data.value.zone}-${data.type}`, JSON.stringify(data.value), (err, index) => {
			console.log(`Sensor ${data.value.zone}-${data.type} set index ${index}`)
		})
		pubsub.lrange(`${data.value.zone}-${data.type}`, 0, -1, (err, data) => {
			console.log(data)
		})
	}
})

tempSubscriber.subscribe('iot-push')
tempSubscriber.subscribe('temp-data')
tempSubscriber.subscribe('iot-sensor-data')


init()
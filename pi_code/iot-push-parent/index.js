const http = require("http")
const Router = require('router')
const redis = require("redis")

const host = 'localhost'
const port = 8000

const router = Router()

const pubsub = redis.createClient()
const tempSubscriber = redis.createClient()

router.get('/', (req, res) => {
		pubsub.publish("iot-push", 'main')
		res.setHeader("Content-Type", "application/json")
		res.writeHead(200)
		res.end(`{"message": "Message published"}`)
})

router.get('/child-access', (req, res) => {
	console.log('access')
	pubsub.publish('iot-push', new Date().toString())
	res.writeHead(200)
	res.setHeader('Content-Type', 'application/json')
	res.end(`{"message": "child access logged!"}`)
})

router.post('/temp-data', (req, res)=>{
	let body = '';
	req.on('data', chunk => {
			body += chunk.toString(); // convert Buffer to string
	});
	req.on('end', () => {
		body = JSON.parse(body)
		console.log(body)
		if(body && body.temp){
			pubsub.publish('temp-data', body.temp)
			res.setHeader('Content-Type', 'application/json')
			res.writeHead(200)
			res.end(`{"message": "Temperature data sent"}`)
		} else {
			res.setHeader('Content-Type', 'application/json')
			res.writeHead(400)
			res.end(`{"error": "Need a temp field in a JSON body"}`)
		}
	});

})

tempSubscriber.on("message", (channel, message) => {
	console.log(`Channel: ${channel} Message: ${message}`)
})

tempSubscriber.subscribe('iot-push')
tempSubscriber.subscribe('temp-data')
tempSubscriber.subscribe('iot-sensor-data')

const requestListener = function (req, res) {
	router(req, res, () => { })
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`)
})

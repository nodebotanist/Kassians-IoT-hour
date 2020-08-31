const http = require('http')
const Redis = require('redis')
const Router = require('router')

const router = Router()

const parent = Redis.createClient({
	host: 'pi-iot-push.local'
})

parent.on('ready', () => {
	console.log('Connected to parent')
	parent.subscribe('iot-push')
})

parent.on('message', (channel, message) => {
	console.log(`${channel}: ${message}`)
})

parent.on('error', (err) => {
	console.log(err)
})

router.get('/', (req, res) => {
	res.setHeader("Content-Type", "application/json")
	res.writeHead(200)
	res.end(`{"message": "IoT child accessed"}`)
})

const requestListener = function (req, res) {
	router(req, res, () => { })
}

const server = http.createServer(requestListener)
server.listen(8000, '127.0.0.1', () => {
	console.log(`Server is running on port 8000`)
})
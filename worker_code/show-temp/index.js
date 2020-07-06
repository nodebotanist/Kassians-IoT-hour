const Router = require('./router')

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function addTemp(request) {
    let body = await request.json()
    let current = JSON.parse(await TEMP.get('temperature'))
    console.log('length', current.length)
    if(!current.length){
        console.log('creating array')
        current = []
    }
    body.time = new Date().toISOString()
    current.push(body)
    if(current.length > 50) {
        current = current.slice(current.legnth-50)
    }
    console.log(body, current)
    await TEMP.put('temperature', JSON.stringify(current))
    return new Response('Temperature added')
}

async function handleRequest(request) {
    const r = new Router()
    // Replace with the approriate paths and handlers
    r.post('/', request => addTemp(request))

    r.get('/', async function () {
        let temperature = await TEMP.get('temperature')
        let res = new Response(JSON.stringify(temperature))
        res.headers.set('Access-Control-Allow-Origin', '*')
        return res
    }) // return a default message for the root route

    const resp = await r.route(request)
    return resp
}

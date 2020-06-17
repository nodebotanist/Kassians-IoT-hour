const Router = require('./router')

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function addTemp(request) {
    let body = await request.json()
    console.log(body)
    await TEMP.put('temperature', JSON.stringify(body))
    return new Response('Temperature added')
}

async function handleRequest(request) {
    const r = new Router()
    // Replace with the approriate paths and handlers
    r.post('/', request => addTemp(request))

    r.get('/', async function () {
        let temperature = await TEMP.get('temperature')
        return new Response(JSON.stringify(temperature))
    }) // return a default message for the root route

    const resp = await r.route(request)
    return resp
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  fetch('https://push.nodebotani.st/temp-data', {
    method:'POST',
    body: JSON.stringify({
      temp: Math.floor(Math.random()*12) + 20
    })
  })
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}

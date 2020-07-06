(async function(){
	let ctx = document.getElementById('temp-graph').getContext('2d')
	// var chart = new Chart(ctx, {
	// 	type: 'line',
	// 	data: [],
	// 	options: {
	// 		scales: {
	// 			xAxes: [{
	// 				type: 'time',
	// 				time: {
	// 					displayFormats: {
	// 						quarter: 'MMM YYYY'
	// 					}
	// 				}
	// 			}]
	// 		}
	// 	}
	// })

	let data = await fetch('https://show-temp.nodebotanist.workers.dev/', {
		method: 'GET',
		mode: 'cors'
	}).then(async function(data){
		jsonData = await data.json()
		jsonData = JSON.parse(jsonData)
		jsonData = jsonData.slice(jsonData.length - 50, jsonData.length)
		console.log(jsonData)
	})
})()
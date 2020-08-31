(async function(){


	let data = await fetch('https://show-temp.nodebotanist.workers.dev/', {
		method: 'GET',
		mode: 'cors'
	}).then(async function(data){
		jsonData = await data.json()
		jsonData = JSON.parse(jsonData)
		jsonData = jsonData.slice(jsonData.length - 50, jsonData.length)
		temperatureData = []
		humidityData = []
		jsonData.forEach((item, index) => {
			temperatureData.push({
				x: index,
				y: item.temp
			})
			humidityData.push({
				x: item.time,
				y: item.relativeHumidity
			})
		})

		console.log(temperatureData, humidityData)

		let ctx = document.getElementById('temp-graph').getContext('2d')
		var chart = new Chart(ctx, {
			type: 'line',
			data: temperatureData,
			options: {
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							// parser: 'YYYY-MM-DD HH:mm:ss.SSS',
						},
						bounds: 'data'
					}],
					yAxes: [{
						type: 'linear',
						ticks: {
							min: 0,
							max: 40
						}
					}]
				}
			}
		})
	})
	let ctx2 = document.getElementById('humidity-graph').getContext('2d')
	var humidityChart = new Chart(ctx2, {
		type: 'line',
		data: humidityData,
		options: {
			scales: {
				xAxes: [{
					type: 'time',
					time: {
						// parser: 'YYYY-MM-DD HH:mm:ss.SSS',
					}
				}],
				yAxes: [{
					type: 'linear',
					ticks: {
						min: 0,
						max: 90
					}
				}]
			}
		}
	})
})()
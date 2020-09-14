from bottle import route, run
import unicornhathd

@route('/hello')
def hello():
	return "Hello World!"

@route('/status/<status>')
def status(status='NORMAL'):
	if status == 'TEST':
		set_hat_color(0,255,0)
		return "TEST status set"
	elif status == 'WARNING':
		set_hat_color(150, 150, 0)
		return "WARNING status set"
	elif status == 'ERROR':
		set_hat_color(255, 0, 0)
		return 'ERROR status set'
	else:
		return "Status is " + status

def set_hat_color(red, green, blue):
	for r in range (0,16):
		for c in range (0,16):
			unicornhathd.set_pixel(r, c, red, green, blue)
	unicornhathd.show()

run(host='localhost', port=8000, debug=True)
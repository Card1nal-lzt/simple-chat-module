const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

const users = {}

io.on('connection', socket => {
	const userId = socket.id
	users[userId] = { id: userId, name: `User_${userId.slice(0, 4)}` }

	console.log(`${users[userId].name} connected`)

	io.emit('message', `${users[userId].name} joined the chat`)

	socket.on('message', message => {
		const user = users[userId]
		socket.broadcast.emit('message', `${user.name}: ${message}`)
	})

	socket.on('disconnect', () => {
		const user = users[userId]
		if (user) {
			console.log(`${user.name} disconnected`)
			io.emit('message', `${user.name} left the chat`)
			delete users[userId]
		}
	})
})

server.listen(80)
console.log('Server is running on 80 port')

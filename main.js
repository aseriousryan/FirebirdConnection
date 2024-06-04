const app = require('./api.js')

const PORT = process.env.PORT || 3007

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

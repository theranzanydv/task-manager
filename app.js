const express = require('express')
const app = express()
require('dotenv').config()

// ? custom middleware
const notFounnd = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

// ? importing routers
const tasks = require('./routes/tasks')

// ? import DB connection
const connectDB = require('./db/connect')

// ? middleware
app.use(express.static('./public'))
app.use(express.json())

// !!! Routes
app.use('/api/v1/tasks', tasks)

// ! custom response for 404
app.use(notFounnd)

// ! error handling middleware
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => {
			console.log(`Server is running on port http://localhost:${port}`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()

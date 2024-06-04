const express = require('express')
const { checkFirebirdDatabaseConnection, getPoolFirebird } = require('./db/dbConnection')

const app = express()

app.get('/check-firebird-connection', async (req, res) => {
	try {
		const connectionDetails = {
			host: req.query.host,
			port: req.query.port,
			database: req.query.database,
			user: req.query.user,
			password: req.query.password,
		}

		const result = await checkFirebirdDatabaseConnection(connectionDetails)
		return res.status(200).send(result)
	} catch (error) {
		return res.status(500).send(error.message)
	}
})

app.get('/retrieve-firebirddata', async (req, res) => {
	try {
		const connectionDetails = {
			host: req.query.host,
			port: req.query.port,
			database: req.query.database,
			user: req.query.user,
			password: req.query.password,
			query: req.query.firebirdquery,
		}

		const connectionResult = await checkFirebirdDatabaseConnection(connectionDetails)
		const dummyData = await getPoolFirebird(connectionDetails)

		return res.status(200).json({ connection: connectionResult, queryResults: dummyData })
	} catch (error) {
		return res.status(500).send(error.message)
	}
})

module.exports = app

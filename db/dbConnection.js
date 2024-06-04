const Firebird = require('node-firebird')

function checkFirebirdDatabaseConnection(connectionDetails) {
	return new Promise((resolve, reject) => {
		Firebird.attach(connectionDetails, function (err, db) {
			if (err) {
				console.error('Error connecting to Firebird:', err.message)
				// Return false if connection fails
				reject(err)
			} else {
				console.log('Connected to Firebird database.')
				// Detach from the database
				db.detach(function () {
					console.log('Disconnected from Firebird database.')
				})
				// Return true if connection succeeds
				resolve(true)
			}
		})
	})
}

function getPoolFirebird(connectionDetails) {
	return new Promise((resolve, reject) => {
		Firebird.attach(connectionDetails, function (err, db) {
			if (err) reject(err)

			console.log('Connected to Firebird.')
			// Example query
			db.query(connectionDetails.query, function (err, result) {
				if (err) reject(err)

				resolve(result)

				// Close connection
				db.detach(function (err) {
					if (err) reject(err)
					console.log('Disconnected from Firebird.')
				})
			})
		})
	})
}

module.exports = { checkFirebirdDatabaseConnection, getPoolFirebird }

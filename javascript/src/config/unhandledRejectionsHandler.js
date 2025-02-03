/* eslint-disable no-console */
const unhandledRejectionsHandler = async (server) => {
	process.on('unhandledRejection', (err) => {
		console.error('Unhandled Rejection:', err.name, err.message)
		server.close(() => {
			process.exit(1)
		})
	})
}

export default unhandledRejectionsHandler

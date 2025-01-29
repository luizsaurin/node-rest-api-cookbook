/* eslint-disable no-console */
const handleUnhandledRejections = async (server) => {
	process.on('unhandledRejection', (err) => {
		console.error('Unhandled Rejection:', err.name, err.message)
		server.close(() => {
			process.exit(1)
		})
	})
}

export default handleUnhandledRejections

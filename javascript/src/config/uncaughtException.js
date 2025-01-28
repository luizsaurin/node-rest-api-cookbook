/* eslint-disable no-console */
const handleUncaughtException = () => {
	process.on('uncaughtException', (err) => {
		console.error('Uncaught Exception:', err.name, err.message)
		process.exit(1)
	})
}

export default handleUncaughtException

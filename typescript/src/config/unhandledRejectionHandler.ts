import { Server } from 'http'

/* eslint-disable no-console */
const handleUnhandledRejections = async (server: Server) => {
	process.on('unhandledRejection', (err: unknown) => {
		if (err instanceof Error) {
			console.error('Unhandled Rejection:', err.name, err.message)
		} else {
			console.error('Unhandled Rejection:', err)
		}
		server.close(() => {
			process.exit(1)
		})
	})
}

export default handleUnhandledRejections

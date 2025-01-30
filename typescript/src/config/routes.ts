import { Request, Response } from 'express'
import router from '../routes'
import { Express } from 'express-serve-static-core'

const setupRoutes = async (app: Express) => {
	// Main routes
	app.use(router)

	// 403 response for non-existing routes
	app.all('*', (req: Request, res: Response) => {
		res.status(403).send(null)
	})
}

export default setupRoutes

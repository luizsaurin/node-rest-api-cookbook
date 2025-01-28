import router from '../routes.js'
import { response403 } from '../util/responseUtils.js'

const setupRoutes = (app) => {
	// Main routes
	app.use(router)

	// 403 response for non-existing routes
	app.all('*', (req, res) => {
		response403(res)
	})
}

export default setupRoutes

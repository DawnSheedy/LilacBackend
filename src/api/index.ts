import { Router } from "express";
import { authApi } from "./auth";
import { serverApi } from "./servers";

const apiRouter = Router()

console.log('📝 Registering /auth Endpoints')
apiRouter.use('/auth', authApi)

console.log('📝 Registering /servers Endpoints')
apiRouter.use('/servers', serverApi)

export { apiRouter as api }
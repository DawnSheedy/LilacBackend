import { Router } from "express";
import { authApi } from "../auth/endpoints";

const apiRouter = Router()

console.log('📝 Registering /auth Endpoints')
apiRouter.use('/auth', authApi)

export { apiRouter as api }
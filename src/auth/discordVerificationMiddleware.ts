import { NextFunction, Request, Response } from "express"
import { verifyDiscordConnection } from "./verifyDiscordConnection"

/**
 * Middleware to verify a user is authenticated with discord.
 * @param req 
 * @param res 
 * @param next 
 */
export const discordVerificationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    verifyDiscordConnection(req).then((status) => {
        if (!status.verified) {
            return res.sendStatus(401)
        }

        req.user = status.user

        next()
    }).finally(() => {
        res.sendStatus(401)
    })
  }
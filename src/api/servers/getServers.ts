import { Request, Response } from "express";

/**
 * Get list of all of a users servers
 * @param req 
 * @param res 
 */
export const getServers = async (req: Request, res: Response) => {
    const servers = await req.user.getDiscordServers()
    res.json({ servers })
}
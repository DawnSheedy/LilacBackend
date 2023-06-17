import { Request, Response } from "express";

export const getServer = (req: Request, res: Response) => {
    res.json(req.server)
}
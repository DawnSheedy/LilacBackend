import { Request } from "express"
import { verify } from "jsonwebtoken"
import { JWTPayload } from "../interfaces/JWTPayload"

interface SuccessfulRequestVerification {
    verified: true
    userId: string
}

interface UnsuccessfulRequestVerification {
    verified: false
}

export type RequestVerificationStatus = SuccessfulRequestVerification | UnsuccessfulRequestVerification

/**
 * Given a request see if the JWT provided is valid.
 * @param req 
 * @returns 
 */
export const verifyRequestToken = (req: Request): RequestVerificationStatus => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return { verified: false }
    }

    let decoded: JWTPayload = null;
    try {
        decoded = verify(token, process.env.SECRET) as JWTPayload
    }
    catch {
        return { verified: false }
    }

    return { verified: true, userId: decoded.userId }
}
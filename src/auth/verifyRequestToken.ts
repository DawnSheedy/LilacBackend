import { Request } from "express";
import { JWTPayload } from "../interfaces/JWTPayload";
import { decodeToken } from "./decodeToken";

interface SuccessfulRequestVerification {
  verified: true;
  userId: string;
}

interface UnsuccessfulRequestVerification {
  verified: false;
}

export type RequestVerificationStatus =
  | SuccessfulRequestVerification
  | UnsuccessfulRequestVerification;

/**
 * Given a request see if the JWT provided is valid.
 * @param req
 * @returns
 */
export const verifyRequestToken = (req: Request): RequestVerificationStatus => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return { verified: false };
  }

  const decode = decodeToken(token);

  if (!decode.decoded || !decode.payload.userId) {
    return { verified: false };
  }

  const payload = decode.payload as JWTPayload;

  return { verified: true, userId: payload.userId };
};

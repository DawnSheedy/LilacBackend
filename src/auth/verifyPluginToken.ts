import { Request } from "express";
import { decodeToken } from "./decodeToken";
import { PluginJWTPayload } from "../interfaces/PluginJWTPayload";

interface SuccessfulPluginVerification {
  verified: true;
  clientId: number;
}

interface UnsuccessfulPluginVerification {
  verified: false;
}

export type PluginVerification =
  | SuccessfulPluginVerification
  | UnsuccessfulPluginVerification;

/**
 * Verify token for a plugin
 * @param req
 * @returns
 */
export const verifyPluginToken = (req: Request): PluginVerification => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return { verified: false };
  }

  const decode = decodeToken(token);

  if (!decode.decoded || !decode.payload.clientId) {
    return { verified: false };
  }

  const payload = decode.payload as PluginJWTPayload;

  return { verified: true, clientId: payload.clientId };
};

import { Request } from "express";
import { verifyRequestToken } from "./verifyRequestToken";
import { DiscordUser } from "../models/DiscordUser";
import { performTokenRefresh } from "./performTokenRefresh";
import { performAppearanceRefresh } from "./performAppearanceRefresh";

interface SuccessfulRequestVerification {
  verified: true;
  user: DiscordUser;
}

interface UnsuccessfulRequestVerification {
  verified: false;
}

export type DiscordVerificationStatus =
  | SuccessfulRequestVerification
  | UnsuccessfulRequestVerification;

/**
 * Given a request see if the JWT provided is valid.
 * @param req
 * @returns
 */
export const verifyDiscordConnection = async (
  req: Request
): Promise<DiscordVerificationStatus> => {
  const tokenVerification = verifyRequestToken(req);

  if (!tokenVerification.verified) {
    return { verified: false };
  }

  let user = await DiscordUser.findByPk(tokenVerification.userId);

  if (user === null) {
    return { verified: false };
  }

  // Refresh token and appearance if necessary
  user = await performTokenRefresh(user);
  user = await performAppearanceRefresh(user);

  return { verified: true, user };
};

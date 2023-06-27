import { verify } from "jsonwebtoken";

interface SuccessfulTokenDecode {
  decoded: true;
  payload: any;
}

interface UnsuccessfulTokenDecode {
  decoded: false;
}

export type TokenDecode = SuccessfulTokenDecode | UnsuccessfulTokenDecode;

/**
 * Decode given JWT
 * @param token 
 * @returns 
 */
export const decodeToken = (token: string): TokenDecode => {
  let decoded: any = null;
  try {
    decoded = verify(token, process.env.SECRET);
  } catch {
    return { decoded: false };
  }

  return { decoded: true, payload: decoded };
};

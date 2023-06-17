import { DiscordUser } from "../models/DiscordUser";

/**
 * Given a user and a new set of tokens, update them.
 * @param user 
 * @param access_token 
 * @param expires_in 
 * @param refresh_token 
 * @returns 
 */
export const updateAuthTokens = (user: DiscordUser, access_token: string, expires_in: number, refresh_token: string) => {
    const expirationDate = new Date()
    expirationDate.setSeconds(expirationDate.getSeconds() + expires_in)

    user.set('accessToken', access_token)
    user.set('tokenExpiration', expirationDate)
    user.set('refreshToken', refresh_token)

    return user.save()
}
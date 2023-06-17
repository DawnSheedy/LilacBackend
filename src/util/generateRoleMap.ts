import { APIRole } from "@discordjs/core";

/**
 * Given a list of roles, map them out for instant access
 * @param roles 
 * @returns 
 */
export const generateRoleMap = (roles: APIRole[]): Record<string, APIRole> => {
    return roles.reduce((prev, curr) => ({...prev, [curr.id]: curr })) as unknown as Record<string, APIRole>
}
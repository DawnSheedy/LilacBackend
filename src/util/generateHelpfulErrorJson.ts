import { ApiErrorMessage } from "../interfaces/apiReturnTypes/ApiErrorMessage";

/**
 * Generate JSON error message.
 * @param error
 * @param message 
 * @returns 
 */
export const generateHelpfulErrorJson = (error: string, message: string): ApiErrorMessage => ({
    error, message
})
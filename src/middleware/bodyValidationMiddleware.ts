import { NextFunction, Request, Response } from "express";
import { generateHelpfulErrorJson } from "../util/generateHelpfulErrorJson";

/**
 * Generate body validation middleware to ensure presence of required keys
 * @param requiredFields 
 * @returns 
 */
export const bodyValidationMiddleware = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bodyKeys = Object.keys(req.body);
    const missingKeys: string[] = [];

    requiredFields.forEach((field) => {
      if (!bodyKeys.includes(field)) {
        missingKeys.push(field);
      }
    });

    if (missingKeys.length > 0) {
      return res
        .status(400)
        .json(
          generateHelpfulErrorJson(
            "missing_fields",
            `Request body missing fields: ${missingKeys.join(", ")}`
          )
        );
    }

    next();
  };
};

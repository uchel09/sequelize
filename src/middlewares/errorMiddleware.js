
import { ZodError } from "zod";
import { ResponseError } from "./responseError.js";
import {
  ValidationError,
  UniqueConstraintError,
  DatabaseError,
  ConnectionError,
  ForeignKeyConstraintError,
SequelizeScopeError
} from "sequelize";

export const errorMiddleware = async (error, req, res, next) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: `Validation Error: ${JSON.stringify(error)}`,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else if (error instanceof SequelizeScopeError) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        errors: error.errors.map((e) => e.message).join(", "),
      });
    } else if (error instanceof UniqueConstraintError) {
      res.status(400).json({
        errors: "Duplicate key found",
      });
    } else if (error instanceof ForeignKeyConstraintError) {
      res.status(400).json({
        errors: "Foreign key constraint error",
      });
    } else if (error instanceof DatabaseError) {
      res.status(500).json({
        errors: "Database error occurred",
      });
    } else if (error instanceof ConnectionError) {
      res.status(500).json({
        errors: "Connection error occurred",
      });
    } else {
      res.status(500).json({
        errors: "Internal server error",
      });
    }
  } else if (error.name === "JsonWebTokenError") {
    res.status(400).json({ errors: "Json web token is invalid, try again" });
  } else if (error.name === "TokenExpiredError") {
    res.status(400).json({ errors: "Token expired, try again" });
  } else {
    res.status(500).json({
      errors: "Internal server error",
    });
  }
};

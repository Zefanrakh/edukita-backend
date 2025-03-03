import { ValidationError } from "class-validator";

export function throwIfAnyDtoValidationErrors(
  validationErrors: ValidationError[]
) {
  if (validationErrors.length > 0) {
    const validationError = new Error("Validation failed");
    (validationError as any).statusCode = 400;
    (validationError as any).details = validationErrors;
    throw validationError;
  }
}

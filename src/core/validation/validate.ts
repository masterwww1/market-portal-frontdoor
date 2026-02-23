import Joi from 'joi';

export type FieldErrors = Record<string, string>;

/**
 * Validate form data with a Joi schema.
 * Returns { value } on success, or { error, fieldErrors } on validation failure.
 */
export function validateForm<T>(
  schema: Joi.ObjectSchema<T>,
  data: unknown
): { value: T; fieldErrors?: never } | { value?: never; fieldErrors: FieldErrors } {
  const result = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (result.error) {
    const fieldErrors: FieldErrors = {};
    for (const detail of result.error.details) {
      const path = detail.path[0] as string;
      if (!fieldErrors[path]) {
        fieldErrors[path] = detail.message;
      }
    }
    return { fieldErrors };
  }

  return { value: result.value as T };
}

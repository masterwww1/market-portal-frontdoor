import Joi from 'joi';

/** Vendor create form (modal) */
export const addVendorSchema = Joi.object({
  companyName: Joi.string().trim().min(1).max(255).required().messages({
    'string.empty': 'Company name is required',
    'string.min': 'Company name is required',
  }),
  first_name: Joi.string().trim().min(1).max(100).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name is required',
  }),
  last_name: Joi.string().trim().min(1).max(100).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name is required',
  }),
  email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email',
  }),
  phone_number: Joi.string().trim().min(1).max(20).required().messages({
    'string.empty': 'Phone number is required',
    'string.min': 'Phone number is required',
  }),
});

/** Product create form (modal). Pass price as number when validating. */
export const addProductSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name is required',
  }),
  sku: Joi.string().trim().max(100).allow('').optional(),
  description: Joi.string().trim().allow('').optional(),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be 0 or greater',
    'any.required': 'Price is required',
  }),
});

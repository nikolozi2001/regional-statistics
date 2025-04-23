/**
 * Request validation middleware using Joi schema validation
 */
const Joi = require("joi");
const { AppError } = require('./errorHandler');

// Valid section names for regional statistics
const validSections = [
  'basicInformation', 'population', 'birth', 'death', 'naturalIncrease',
  'marriage', 'divorce', 'populationDescription', 'demography', 
  'gdbAndValueAdded', 'foreignDirectInvestment', 'employmentAndSalaries',
  'pricesAndInflation', 'standartOfLiving', 'businessSector', 
  'businessRegister', 'budget', 'agriculture', 'industry', 
  'construction', 'service', 'trading', 'hotelsAndRestaurants',
  'transportAndStorage', 'tourism', 'legalStatistics', 
  'healthCareAndSocialSecurity', 'education', 'culture',
  'environmentalProtection', 'infrastructure'
];

/**
 * General validation middleware that validates request data against a Joi schema
 * @param {Joi.Schema} schema - Joi schema to validate against
 * @param {string} property - Request property to validate (body, params, query)
 * @returns {function} - Express middleware function
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Schema for regionId parameter validation
const regionIdSchema = Joi.object({
  regionId: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'Region ID must be a number',
      'number.integer': 'Region ID must be an integer',
      'number.positive': 'Region ID must be positive',
      'any.required': 'Region ID is required'
    })
});

// Schema for section parameter validation
const sectionSchema = Joi.object({
  section: Joi.string().valid(...validSections).required()
    .messages({
      'string.base': 'Section must be a string',
      'any.only': 'Invalid section name',
      'any.required': 'Section is required'
    })
});

// Schema for regionIds query parameter
const regionIdsQuerySchema = Joi.object({
  regionIds: Joi.string().required().pattern(/^\d+(,\d+)*$/)
    .messages({
      'string.base': 'Region IDs must be a string',
      'string.pattern.base': 'Region IDs must be comma-separated numbers',
      'any.required': 'Region IDs are required'
    })
});

// Schema for update body validation
const updateBodySchema = Joi.object({
  data: Joi.required()
    .messages({
      'any.required': 'Data is required in request body'
    })
});

// Export the validate middleware and predefined schemas
module.exports = {
  validate,
  schemas: {
    regionId: regionIdSchema,
    section: sectionSchema,
    regionIdsQuery: regionIdsQuerySchema,
    updateBody: updateBodySchema
  },
  validSections
};
import * as Joi from "@hapi/joi";

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_AUTO_ENTITY: Joi.boolean().required(),
  DB_SYNC: Joi.boolean().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.number().required(),
});

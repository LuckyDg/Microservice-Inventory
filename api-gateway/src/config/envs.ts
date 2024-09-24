import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    INVENTORY_MICROSERVICE_HOST: string;
    INVENTORY_MICROSERVICE_PORT: number;
}

const evnsSchema = joi
    .object({
        PORT: joi.number().required(),
        INVENTORY_MICROSERVICE_HOST: joi.string().required(),
        INVENTORY_MICROSERVICE_PORT: joi.number().required(),
    })
    .unknown(true);

const { error, value } = evnsSchema.validate(process.env);

if (error) {
    throw new Error(`Config Validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    inventoryMicroserviceHost: envVars.INVENTORY_MICROSERVICE_HOST,
    inventoryMicroservicePort: envVars.INVENTORY_MICROSERVICE_PORT,
};

const Joi = require('joi');

const shema = Joi.object({
    titulo:Joi.string()
           .required()
           .min(2)
           .max(150),
    sinopse:Joi.string()
            .required()
            .min(10)
            .max(500),
    duracao:
            Joi.number()
            .integer()
            .min(10),
    dataLancamento:
            Joi.date()
            .required(),
    imagem:
            Joi.string()
            .required()
            .pattern(/https?:\/\/.+\.(jpeg?|png|gif|svg)/i),
    categoria:
            Joi.array().items(Joi.string()).required()
})

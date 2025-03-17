const Joi = require('joi')

export const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    phone: Joi.number().required(),
    email: Joi.string().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$')).required(), 
    password: Joi.string().min(6).max(32).required(), 
    role: Joi.string().required()
})

export const loginSchema = Joi.object({
    email: Joi.string().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$')).required(), 
    password: Joi.string().min(6).required()
})

export const addProductSchema = Joi.object({
    title: Joi.string().required(), 
    price: Joi.number().required(),
    description: Joi.string().min(6).required(),
    stock: Joi.number().required(),
    sku: Joi.string().required()
})

export const updateProductSchema = Joi.object({
    productId: Joi.string().required(),
    title: Joi.string(), 
    price: Joi.number(),
    description: Joi.string().min(6),
    stock: Joi.number(),
    sku: Joi.string()
})

export const deleteProductSchema = Joi.object({
    productId: Joi.string().required()
})


import Joi from "joi";


export const createNewVacationValidator = Joi.object({
    destination: Joi.string().min(3).max(40).required(),
    description: Joi.string().min(20).required(),
    startTime: Joi.date().required().min('now'), 
    endTime: Joi.date().required().min(Joi.ref('startTime')),
    price: Joi.number().min(1).max(10000).required(),
    image: Joi.object({mimetype: Joi.string().valid('image/jpeg', 'image/png')
    }).unknown(true).required() 
})

export const updateVacationValidator = Joi.object({
    destination: Joi.string().min(3).max(40).required(),
    description: Joi.string().min(20).required(),
    startTime: Joi.date().required(), 
    endTime: Joi.date().required().min(Joi.ref('startTime')),
    price: Joi.number().min(1).max(10000).required(),
    image: Joi.object({mimetype: Joi.string().valid('image/jpeg', 'image/png')
    }).unknown(true).optional() 

})



// export const getPostValidator = Joi.object({
//     id: Joi.string().uuid()
// })


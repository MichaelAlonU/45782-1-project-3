import Joi from "joi";


export const createNewVacationValidator = Joi.object({
    // destination: Joi.string().min(10).max(40).required(),
    // description: Joi.string().min(10).required()
    // startTime: Joi.required(),
    // endTime: Joi.required(),
    // price: Joi.number().min(1).required()

})

export const updateVacationValidator = createNewVacationValidator




// export const newPostImageValidator = Joi.object({
//     image: Joi.object({
//         mimetype: Joi.string().valid('image/jpeg', 'image/png')
//     }).unknown(true).optional()
// })


// export const getPostValidator = Joi.object({
//     id: Joi.string().uuid()
// })


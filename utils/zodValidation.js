const zod=require('zod')

const signUpFormat=zod.object({
    username:zod.string().trim().min(3),
    email:zod.string().trim().email(),
    password:zod.string().min(8)
})

const loginFormat=zod.object({
    email:zod.string().trim().email(),
    password:zod.string().min(8)
})


module.exports = {signUpFormat,loginFormat}
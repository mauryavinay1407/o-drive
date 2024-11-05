const zod=require('zod')

const userFormat=zod.object({
    username:zod.string().trim().min(3),
    email:zod.string().trim().email(),
    password:zod.string().min(8)
})


module.exports = {userFormat}
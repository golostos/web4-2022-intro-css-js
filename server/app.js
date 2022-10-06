// @ts-check

// API - Application Programming Interface - HTTP
// RESTful API
// CommonJS - ESModules
const express = require('express')
const cors = require('cors')
const { z, ZodError } = require('zod')
const db = require('../prisma')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/hello', (req, res, next) => {
    res.send('hello')
})

app.post('/api/signup', async (req, res, next) => {
    try {
        const userSchema = z.object({
            email: z.string().email(),
            password: z.string().max(20).min(3)
        })
        // JSON
        const user = userSchema.parse(req.body)
        const userFromDB = await db.user.create({
            data: {
                email: user.email,
                passwordHash: user.password,
            }
        })
        // ... save to the db
        res.send(userFromDB)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send({
                message: "Wrong user's credentials"
            })
        }
    }
})

app.listen(3000)
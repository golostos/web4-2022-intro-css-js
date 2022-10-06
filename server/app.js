// @ts-check

// API - Application Programming Interface - HTTP
// RESTful API
// CommonJS - ESModules
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z, ZodError } = require('zod')
const db = require('../prisma')
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime')
const app = express()

app.use(express.json({
    limit: '5kb'
}))
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
                passwordHash: bcryptjs.hashSync(user.password),
            }
        })
        // ... save to the db
        res.status(201).send(userFromDB)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send({
                message: "Wrong user's credentials"
            })
        }
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.status(400).send({
                    message: "Email is not unique"
                })
            }
        }

    }
})

app.post('/api/login', async (req, res) => {
    try {
        const userSchema = z.object({
            email: z.string().email(),
            password: z.string().max(20).min(3)
        })
        // JSON
        const user = userSchema.parse(req.body)
        const userFromDb = await db.user.findUnique({
            where: {
                email: user.email
            }
        })
        if (userFromDb) {
            if (bcryptjs.compareSync(user.password, userFromDb.passwordHash)) {
                const token = jwt.sign({ id: userFromDb.id },
                    process.env.SECRET || 'secret',
                    { expiresIn: '2h' })
                res.send({
                    message: "Successful login",
                    token
                })
            } else {
                res.status(401).send({
                    message: "Wrong credentials"
                })
            }
        }
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send({
                message: "Wrong user's credentials"
            })
        }
    }
})

app.listen(3000)
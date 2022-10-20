// @ts-check

// API - Application Programming Interface - HTTP
// RESTful API
// CommonJS - ESModules
require('dotenv').config()
const express = require('express')
require('express-async-errors');
const cors = require('cors')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z, ZodError } = require('zod')
const db = require('../prisma')
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const createHttpError = require('http-errors');
const app = express()

app.use(express.json({
    limit: '5kb'
}))
app.use(cors())

app.get('/api/hello', (req, res, next) => {
    res.send('hello')
})

app.post('/api/signup', async (req, res, next) => {
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
})

app.post('/api/login', async (req, res, next) => {
    const userSchema = z.object({
        email: z.string().email(),
        password: z.string().max(20).min(3)
    })
    // JSON
    const user = userSchema.parse(req.body)
    // next(new Error('Validation error'))
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
    } else throw new createHttpError.Unauthorized()
})

// Errors
app.use((error, req, res, next) => {
    if (error instanceof ZodError) {
        res.status(400).send({
            message: "Wrong user's credentials"
        })
        next()
    }
    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            res.status(400).send({
                message: "Email is not unique"
            })
        }
    }
    if (error instanceof createHttpError.HttpError) {
        res.status(error.status).send({
            message: error.message
        })
    }
})

app.listen(3000)
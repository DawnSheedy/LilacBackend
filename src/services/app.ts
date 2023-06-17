import { Express } from "express"
import { api } from "../api"
const express = require('express')
const app: Express = express()
const port = process.env.PORT ?? 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', api)

app.listen(port, () => {
  console.log(`💐 LilacBackend listening on port ${port}`)
})

export { app }
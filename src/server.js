const express = require("express")
const path = require("path")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")
const contactsContacts = require("./routers/contactRouters.js")


module.exports = class ContactsServer {
    constructor() {
        this.server = null
    };
    start() {
        this.initServer()
        this.initConfig()
        this.initMiddlewares()
        this.initRoutes()
        this.initErrorHandling()
        this.startListening()
    }
    initServer() {
        this.server = express()
    }
    initConfig() {
        dotenv.config({ path: path.join(__dirname, "../.env") });
    }
    initMiddlewares() {
        this.server.use(cors())
        this.server.use(express.json())
        this.server.use(morgan("dev"))
    }
    initRoutes() {
        this.server.use('/contacts', contactsContacts)
    }
    initErrorHandling() {
        this.server.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            res.status(statusCode).send(err.message);
        });
    }
    startListening() {
        const { PORT } = process.env
        this.server.listen(PORT, () => {
            console.log(`Server started listening on port, ${PORT}`);
        })
    }
}



const express = require("express")
const path = require("path")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")
const contactsContacts = require("./routers/contactRouters.js")
const mongoose = require("mongoose");
const userRouter = require("./routers/user.router.js")
const cookieParser = require("cookie-parser")

module.exports = class ContactsServer {
    constructor() {
        this.server = null
    };
    async start() {
        this.initServer()
        this.initConfig()
        await this.initDatabase()
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
    async initDatabase() {
        try {
            const { MONGO_URL } = process.env;
            await mongoose.connect(MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
            console.log("Database connection successful");
        } catch (arror) {
            console.log(error);
            process.exit(1);
        }
    }
    initMiddlewares() {
        this.server.use(cors())
        this.server.use(express.json())
        this.server.use(morgan("dev"))
        this.server.use(cookieParser(process.env.COOKIE_SECRET))
    }
    initRoutes() {
        this.server.use('/contacts', contactsContacts)
        this.server.use('/', userRouter)
        this.server.use("/images", express.static(path.join(__dirname + "../../public/images")))
    }
    initErrorHandling() {
        this.server.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            console.log(err);
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



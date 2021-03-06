
import dotenv from "dotenv"

dotenv.config()

const config = {
    env: process.env.NODE_ENV,
    mongoUri: process.env.MONGODB_URI,
    masterDb: process.env.MASTER_DB,
    serverPort: process.env.SERVER_PORT,
    serverDb: process.env.SERVER_DB,
    JWTSecret: process.env.JWT_SECRET,
}

export default config
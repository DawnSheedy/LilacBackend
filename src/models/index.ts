import './DiscordUser'
import './DiscordServer'
import './MinecraftRoleConfig'
import { db } from '../services/db'

console.log('🔃 Snychronizing Models!')

const isDev = process.env.ENV === 'DEVELOPMENT' || process.env.ENV === 'TEST'

if (isDev) {
    console.log('🧪 Running in DEVELOPMENT or TEST Environment! 🚧🚧 MODELS WILL FORCIBLY SYNC! 🚧🚧')
}

db.sync({ force: isDev, alter: isDev }).then((createdModel) => {
    console.log(`✅ All Models Snychronized!`)
})


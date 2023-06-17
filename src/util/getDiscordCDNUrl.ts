export const getDiscordCDNUrl = (type: string, id: string, hash: string) => {
    return `https://cdn.discordapp.com/${type}/${id}/${hash}.png`
}
module.exports = {
    tokenize(text) {
        if(!text) {
            return []
        }
        
        return text.split(" ").map(token => token.replace(/\W/g, "").toLowerCase())
    }
}

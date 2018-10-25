const fs = require('fs')

let config = {}

module.exports = {
    setConfig(id, key, value) {
        if (!config[id]) {
            config[id] = {}
        }

        config[id][key] = value
        this.saveConfig()
    },
    getConfig(id, key) {
        if (!config[id]) {
            return null
        }

        return config[id][key]
    },
    saveConfig() {
        fs.writeFileSync('config.json', JSON.stringify(config))
    },
    loadConfig() {
        const configFile = fs.existsSync('config.json')

        if (configFile) {
            config = JSON.parse(fs.readFileSync('config.json', 'UTF-8'))
        }
    }
}

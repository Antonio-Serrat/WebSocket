const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path');

class Messages {
    constructor() {
        this.nombreArchivo = path.join(__dirname, "../public/database/messages.json");
    }

    async save(name, date, message, id) {
       let msg = {
            id:id,
            name:name,
            date:date,
            message:message
        }
        let newMsgs = []

        try {
            if (!(fs.existsSync(this.nombreArchivo))) {
                const data = JSON.stringify(newMsgs, null, 2)
                fs.writeFileSync(`./${this.nombreArchivo}`, data, (err) => {
                    if (err) throw error;
                })
            }
            const data = await fsp.readFile(this.nombreArchivo)
            const messages = JSON.parse(data)
            newMsgs = messages
            newMsgs.push(msg)

            const allMessages = JSON.stringify(newMsgs, null, 2)
            await fsp.writeFile(this.nombreArchivo, allMessages, 'utf-8')
            return 
        }catch (error){
            return error
        }
    }
}

module.exports = Messages;
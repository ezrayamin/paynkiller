const util = require('util')
const db = require('../database')

module.exports = {
    asyncQuery: util.promisify(db.query).bind(db),
    generateQueryBody: (body) => {
        let result = ''
        for(let property in body){
            result += ` ${property} = ${db.escape(body[property])},`
        }
        return result.slice(0, -1)
    }
}
const Keyv = require('keyv')
const { KeyvFile } = require('keyv-file')

/**
 * Retrieves Data
 * @param {function} finder
 * @param {string} type 
 * @param {Date} timeout
 * @returns 
 */
function Find(finder, type, timeout) {
    if (typeof finder !== 'function') return null

    if (typeof type !== 'string') return null

    const keyv = new Keyv({ store: new KeyvFile({ filename: `./data/${type}.json` }) })
    return new Promise(async resolve => {
        try {
            let data = await keyv.get(`${type}`)
            if (!data) throw "no data"
            console.log(`Found cached data for ${type}`, data)
            resolve(data)
        } catch (error) {
            finder(ata => {
                console.log(`Finding data for ${type}`)
                await keyv.set(`${type}`, data, timeout)
                resolve(data)
            })

        }
    })
}

module.exports = { Find }
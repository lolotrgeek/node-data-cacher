const Keyv = require('keyv')
const { KeyvFile } = require('keyv-file')

/**
 * Retrieves Data
 * @param {function} finder
 * @param {string} type 
 * @param {int} timeout ms to timeout
 * @returns 
 */
function Cache(finder, type, timeout) {
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
            let data = await finder()
            console.log(`Finding data for ${type}`)
            if (timeout) await keyv.set(`${type}`, data, timeout)
            else await keyv.set(`${type}`, data)
            resolve(data)
        }
    })
}

module.exports = { Cache }
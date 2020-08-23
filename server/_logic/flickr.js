const { flickr } = require('../_api')
const { cache } = require('../_utils')
const keys = require('../keys.json')

const imagesPerPage = 10

module.exports = {

    search_images: async (search_query, page) => {
        const cacheKey = `${search_query}_${page}`
        const cacheValue = cache(cacheKey)
        if (cacheValue !== undefined) {
            // renew ttl
            cache(cacheKey, keys.cacheTTL)
            return cacheValue
        }

        let answer = await flickr.search_images(search_query, page, imagesPerPage)
        if (answer.status === 200) {
            let urls = answer.message.split('url_')
            urls.shift()
            answer.message = urls.map(url => url.split('"')[1])
        }

        cache(cacheKey, keys.cacheTTL, answer)
        return answer
    }

}
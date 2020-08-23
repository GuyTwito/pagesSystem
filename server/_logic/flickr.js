const { flickr } = require('../_api')

const imagesPerPage = 10

module.exports = {

    search_images: async (search_query, page) => {
        let answer = await flickr.search_images(search_query, page, imagesPerPage)
        if (answer.status === 200) {
            let urls = answer.message.split('url_')
            urls.shift()
            answer.message = urls.map(url => url.split('"')[1])
        }
        return answer
    }

}
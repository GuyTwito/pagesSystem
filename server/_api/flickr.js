const { apiAdapter } = require('../_utils')
const keys = require('../keys.json')

const url = "https://www.flickr.com"
const api = apiAdapter.create(url)

module.exports = {
    search_images: async (search_query, page, ppage) => {
        const parameters = {
            method: search_query ? "flickr.photos.search" : "flickr.photos.getrecent",
            api_key: keys.flickrKey,
            page: page,
            per_page: ppage,
            extras: "url_m",
            tags: !search_query ? null : search_query
        }

        const search_results = await api.get("/services/rest/?" +
            Object.keys(parameters)
                .filter(param => parameters[param])
                .map(param => `${param}=${parameters[param]}`)
                .join("&")
        )
        let answer = {
            status: search_results.status
        }

        if (search_results.status !== 200)
            answer.message = `Api 'flickr' failure: ${search_results.statusText}`
        else
            answer.message = search_results.data

        return answer
    }
}
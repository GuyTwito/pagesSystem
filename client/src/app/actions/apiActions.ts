import globals from '../shared/globals'
import { cache, apiCall, userAlert } from '../utils'

const { backendApi } = globals

const getImages = (searchQuery: string, page: number, onSuccess: (res: any) => void, onError: () => void) => {
    const cacheKey = `${searchQuery}_${page}`
    const cacheValue = cache(cacheKey)
    if (cacheValue !== undefined) {
        // renew ttl
        cache(cacheKey, globals.cacheTTL)
        return onSuccess(cacheValue)
    }

    apiCall.call(`${backendApi}/flickr/search_images/${page}/${searchQuery ? searchQuery : ""}`)
        .then((res: any) => {
            cache(cacheKey, globals.cacheTTL, res)
            onSuccess(res)
        })
        .catch((err: any) => {
            userAlert.message(1, `getImages failed to fetch (query: '${searchQuery}') - ${err.message}`)
            onError()
        })
}

export default {
    getImages
}
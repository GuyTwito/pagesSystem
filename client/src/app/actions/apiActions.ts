import globals from '../shared/globals'
import { apiCall, userAlert } from '../utils'

const { backendApi } = globals

const getImages = (searchQuery: string, page: number, onSuccess: (res: any) => void, onError: () => void) => {
    apiCall.call(`${backendApi}/flickr/search_images/${page}/${searchQuery ? searchQuery : ""}`)
        .then((res: any) => {
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
import globals from '../shared/globals'
import { apiCall, userAlert } from '../utils'

const { backendApi } = globals

const getImages = (searchQuery: string, onSuccess: (res: any) => void, onError: () => void) => {

    apiCall.call(`${backendApi}/get_images${searchQuery ? "/" + searchQuery : ""}`)
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
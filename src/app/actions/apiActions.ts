import globals from '../shared/globals'
import { apiCall, userAlert } from '../utils'

const { backend_api } = globals

const getImages = (searchQuery: string, onSuccess: (res: any) => void, onError: () => void) => {

    apiCall.call(`${backend_api}/get_images${searchQuery ? "/" + searchQuery : ""}`)
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
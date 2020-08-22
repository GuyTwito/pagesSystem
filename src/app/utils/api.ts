

export default {

    call: (url: string): Promise<any> => {
        let isError = false
        return fetch(url, { credentials: "same-origin" })
            .then(response => {
                if (!response.ok)
                    isError = true
                return response.json()
            })
            .then(response => {
                if (isError)
                    throw response
                return response
            })
            .catch((error) => {
                throw error
            })
    }
}
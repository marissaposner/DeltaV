function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

export function getBaseURL() {
    return process.env.API_BASE
}

export function getAPIBaseURL() {
    return process.env.API_BASE + '/api'
}

export async function remoteGet(url: string) {
    return await fetch(url)
        .then(status)
        .then(json)
        .then(function (data) {
            // console.log('Request succeeded with JSON response', data);
            return Promise.resolve(data)
        })
        .catch(function (error) {
            console.log('Request failed', error)
        })
}
import axios from 'axios'
// import { redirect } from '@remix-run/node'

let client = axios.create({
    // baseURL: process.env.API_BASE,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
})

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            return Promise.reject(error)
        }

        // if (error.response.status === 401) {
        //     throw redirect('/login')
        // }

        return Promise.reject(error)
    }
)

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

export function getAPIBaseURL() {
    return process.env.API_BASE
}

async function makeAPIRequest(    
    url: string,
    headers? : any,
    data?: any,
    getRequest?: boolean
) {
    if (!url) return null

    if (!data) data = {}

    let response
    // const headers = {
    //     Authorization: 'Bearer ' + session.get('userToken'),
    // }

    try {
        if (!getRequest) response = await axios.post(url, data, { headers })
        else {
            if (data) {
                if (data.request) delete data.request
            }

            response = await axios.get(url, { params: data, headers })

            return {
                status: response.status,
                data: response.status >= 200 && response.data ? response.data : {},
            }
        }
    } catch (error) {
        // console.log('Server error', error)

        return {
            status: 500,
            error
        }
    }
    
}

export async function getEndpoints(account: string, data? : object) {
    
     return await makeAPIRequest(getAPIBaseURL() + 'endpoint', {
        user_id: account
     }, data, true)
}

export async function createEndpoint(account: string, data? : object) {
    return await makeAPIRequest(getAPIBaseURL() + 'endpoint', {
       user_id: account
    }, data)
}

export async function createUser(account: string) {
    return await makeAPIRequest(getAPIBaseURL() + 'user', null, {
        userAddress: account
    })
}
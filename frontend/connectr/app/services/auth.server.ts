import { createCookieSessionStorage, redirect } from '@remix-run/node'
import {
    getAPIBaseURL,
} from './api.server'
import { AppRouting } from '~/utils/routes'

let storage = createCookieSessionStorage({
    cookie: {
        name: 'connectr_ck',
        secure:
            process.env.NODE_ENV === 'production' &&
            !process.env.DISABLE_SECURE_COOKIE,
        domain: process.env.SESSION_DOMAIN,
        secrets: [process.env?.SESSION_SECRET],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
})

async function getUserSession(request: Request) {
    return await storage.getSession(request.headers.get('Cookie'))
}

export async function login({ request, account }) {
    let session = await getUserSession(request)
    session.set('userToken', account)

    return {
        status: true,
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    }
}

export async function logout({ request }) {
    const session = await getUserSession(request)

    return redirect(AppRouting.LOGIN, {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}

export async function currentToken({ request }) {
    const session = await getUserSession(request)

    return session.get('userToken')
}

// export async function requireGuest({ request }) {
//     let token = await currentToken({ request })

//     if (token) {
//         throw redirect(AppRouting.LOGIN)
//     }
// }

export async function requireAuth({ request }) {
    let token = await currentToken({ request })

    if (!token) {
        throw redirect(AppRouting.LOGIN)
    }
}
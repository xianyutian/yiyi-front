import req from '@/utils/request.js'

export const login = (username, password) => {
    return req({
        url: '/auth/token',
        method: 'post',
        data: {
            "username": username,
            "password": password
        }
    })
}
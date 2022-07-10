import req from '@/utils/request.js'

export const register = (username, password) => {
    return req({
        url: '/users/register',
        method: 'post',
        data: {
            "username": username,
            "password": password
        }
    })
}

export const checkUsernameExist = (username) => {
    return req({
        url: '/users/check/' + username,
        method: 'get',
    })
}

export const getAccount = (uid) => {
    return req({
        url: '/users/' + uid,
        method: 'get',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        },
    })
}

export const updateAccount = (account) => {
    return req({
        url: '/users/update',
        method: 'put',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        },
        data: {
            "uid": account.uid,
            "username": account.username,
            "password": account.password,
            "address": account.address,
            "status": account.status,
            "favouritesId": account.favouritesId
        }
    })
}

export const getProfiles = (uid) => {
    return req({
        url: '/users/favourite/' + uid,
        method: 'get',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        }
    })
}

export const addProfile = (uid, itemId) => {
    return req({
        url: '/users/favourite/' + uid,
        method: 'post',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        },
        data:{
            "uid": uid,
            "itemId": itemId
        }
    })
}

export const deleteProfile = (uid, itemId) => {
    return req({
        url: '/users/favourite/' + uid,
        method: 'delete',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        },
        data:{
            "uid": uid,
            "itemId": itemId
        }
    })
}

export const getHistories = (uid) => {
    return req({
        url: '/users/history/' + uid,
        method: 'get',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        }
    })
}
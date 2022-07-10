import req from '@/utils/request.js'

export const submitOrder = (order) => {
    return req({
        url: '/business/order/' + uid,
        method: 'post',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        },
        data:{
            "timestamp": order.timestamp,
            "address": order.address,
            "itemList": order.itemList
        }
    })
}

export const returnItem = (uid, itemId, orderId) => {
    return req({
        url: '/business/order/return',
        method: 'post',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        },
        data:{
            "uid": uid,
            "itemId": itemId,
            "orderId": orderId
        }
    })
}

export const addCart = (itemId, num, days) => {
    return req({
        url: '/business/cart/' + itemId,
        method: 'post',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        },
        data:{
            "num": num,
            "days": days
        }
    })
}

export const updateCart = (itemId, num, days) => {
    return req({
        url: '/business/cart/',
        method: 'put',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        },
        data:{
            "itemId": itemId,
            "num": num,
            "days": days
        }
    })
}

export const deleteCart = (itemId) => {
    return req({
        url: '/business/cart/' + itemId,
        method: 'delete',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        },
    })
}

export const getCarts = () => {
    return req({
        url: '/business/cart/',
        method: 'get',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        }
    })
}


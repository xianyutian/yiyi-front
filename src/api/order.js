import req from '@/utils/request.js'

export const getOrders = () => {
    return req({
        url: '/order',
        method: 'get',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        }
    })
}
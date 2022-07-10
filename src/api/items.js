import req from '@/utils/request.js'

export const searchItems = (keyword) => {
    return req({
        url: '/items/search',
        method: 'get',
        data:{
            "keyword": keyword
        }
    })
}

export const getAllCategories = () => {
    return req({
        url: '/items/categories',
        method: 'get',
    })
}

export const getItemsByClassify = (categoryId) => {
    return req({
        url: '/items/classify/'+ categoryId,
        method: 'get',
    })
}

export const getItemById = (itemId) => {
    return req({
        url: '/items/item/'+ itemId,
        method: 'get',
    })
}

export const getHotItems = () => {
    return req({
        url: '/items/hotItems',
        method: 'get',
    })
}

export const getRecommendItems = (uid) => {
    return req({
        url: '/items/user/'+ uid,
        method: 'get',
        headers: {
            "Authorization": window.sessionStorage.getItem("token")
        },
    })
}
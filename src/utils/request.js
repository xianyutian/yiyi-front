import axios from 'axios'
//创建axios的一个实例 
var instance = axios.create({
    baseURL:'http://localhost:8080/',//接口统一域名
    timeout: 6000                                                       //设置超时
})
export default instance

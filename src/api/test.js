import http from '../plugins/request'
const proxy = '/api'
export function login(username,password) {
    return new Promise((resolve, reject) => {
        const params = {
            username: username,
            password: password
        }
        http.post(proxy+'/login', params).then(res => {
            resolve(res)
        }).catch(err => reject(err))
    })
}

export function test() {
    return new Promise((resolve, reject) => {
        http.get('/test/driver').then(res => {
            resolve(res)
        }).catch(err => reject(err))
    })
}

export function getCurUser() {
    return new Promise((resolve, reject) => {
        http.get(proxy+'/curUser').then(res => {
            resolve(res)
        }).catch(err => reject(err))
    })
}



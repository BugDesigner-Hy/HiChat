import http from '../plugins/request'
const proxy = '/api'
export function getSingleChat(roomId) {
    return new Promise((resolve, reject) => {
        http.get(proxy + '/room/single-chat/'+roomId).then(res => {
            resolve(res)
        }).catch(err => reject(err))
    })
}

export function getRooms(userId) {
    return new Promise((resolve, reject) => {
        const params = {
            userId: userId,
        }
        http.get(proxy + '/room/by-user/'+userId).then(res => {
            resolve(res)
        }).catch(err => reject(err))
    })
}

export function addRoom(title, head, members, type) {
    return new Promise((resolve, reject) => {
        const params = {
            title: title,
            head: head,
            members: members,
            type: type
        }
        http.post(proxy + '/room/add', params).then(res => {
            resolve(res)
        }).catch(err => reject(err))
    })
}




 
import { get } from './get'
import { post } from './post'
export function getData() {
    // '/api/1' 获取字符串
    var result = get('/api/1')

    result.then(res => {
        return res.text()
    }).then(text => {
        console.log(text)
    })

    // '/api/2' 获取json
    var result1 = get('/api/2')

    result1.then(res => {
        return res.json()
    }).then(json => {
        console.log(json)
    })
}

 export function postData() {
    // '/api/post' 提交数据
    var result = post('/api/post', {
        a: 100,
        b: 200
    })

    result.then(res => {
        return res.json()
    }).then(json => {
        console.info('post',json)
    })
}
export function LoginpostData() {
    // '/api/post' 提交数据
    var result = fetch('/wbp/login.do', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 注意 post 时候参数的形式
        body: "username=lzd&PassWord=123456"
    });

    result.then(res => {
        return res.json()
    }).then(json => {
        console.log(json)
    })
}

// export function getuser() {
//     // const parameter
//     const result = get('/user')
//     return result
// }
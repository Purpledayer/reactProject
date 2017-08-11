import { post } from '../post';

//登陆接口
export function LoginpostData(data) {
    const result = post('/wbp/login.do', {
        username:data.userName,
        PassWord:data.password,
    })
    return result;
}

import { get } from './../get'
import { post } from './../post'


export function TestLists() {
    // const parameter
    const result = get('/lists')
    return result
}

export function add(data) {
    console.log(data);
    const result = post('add', {
        pname:data.pname,
        price:data.price,
        type:data.type,
    })
    return result;
}
export function edit(data ) {
    const result = post('update', {
        pid:data.pid,
        pname:data.pname,
        price:data.price,
        type:data.type,
    })
    return result;
}
export function deleteINfo(data ) {
    const result = post('del/'+data, {
    })
    return result;
}

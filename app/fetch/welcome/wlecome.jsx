import { get } from './../get';
import { post } from './../post';
export function getListData(city, page) {
    const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page)
    return result
}

//待办事项
export function selecthomewosdata(page, rows, sidx , sord ,user_id) {
    const result = post('wbp/homewos/selecthomewosdata.do', {
        page:page,
        rows:rows,
        sidx:sidx,
        sord:sord,
        user_id:user_id,
    })
    return result;
}

import { get } from './../get';
import { post } from './../post';
//公司注table列表接口
export function getListData(_search, nd ,rows ,page ,sidx,sord) {
    // const parameter
    const parameter = '_search='+_search+'&nd='+nd+'&rows='+rows+'&page='+page+'&sidx='+sidx+'& sord='+sord;
    const url= '/wbp1/bmcompany/querycmp.do?';
    const result = get(url,parameter);
    return result
}

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

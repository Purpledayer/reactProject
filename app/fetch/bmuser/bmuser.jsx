import { get } from './../get';
import { post } from './../post';
/**用户管理列表接口 */
//公司注table列表接口
export function queryPage(_search, nd ,rows ,page ,sidx,asc) {
    // const parameter
    const parameter ='_search='+_search+'&nd='+nd+'&rows='+rows+'&page='+page+'&sidx='+sidx+'&sord='+asc;
    const url= '/wbp1/bmUser/queryPage.do?';
    const result = get(url,parameter);
    return result
}

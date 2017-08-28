import 'whatwg-fetch'
import 'es6-promise'

export function get(url,parameter) {
    var Newurl;
    if(parameter != null ){
        Newurl = url+'token='+sessionStorage.token+parameter;
    }else{
        Newurl = url+'token='+sessionStorage.token;
    }
  var result = fetch(Newurl, {
      credentials: 'include',
      headers: {
          'Accept': 'application/json, text/plain, */*'
      }
  });
  return result;
}

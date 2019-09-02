
export function parseUrlData(obj) {
    let prefix = '?'
    let _result = []
    for (let key in obj) {
        let value = obj[key]
        if (['', undefined, null].includes(value)) {
            continue
        }
        _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
    return _result.length ? prefix + _result.join('&amp;') : ''
}

export function getQueryVariable(variable) {
    const query = window.location.search.substring(1).split("&");
    for (let i=0;i<query.length;i++) {
            let pair = query[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
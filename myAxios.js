function myAxios({ method = 'get', url, data, params, time, headers }) {

    method = method.toLowerCase();
    //updata1
    //update2
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        if (params) {

            let arr = [];
            for (const key in params) {
                arr.push(key + '=' + params[key]);
            };
            url += '?' + arr.join("&");
        };
        xhr.open(method, url);
        if (headers) {
            for (const key in headers) {
                xhr.setRequestHeader(key, headers[key])
            }
        }
        if (method === 'get') {

            xhr.send();

        } else {

            if (data) {

                if (data instanceof Object || data instanceof Array) {
                    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    xhr.send(JSON.stringify(data));
                }
                else if (data instanceof FormData) {
                    xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundaryShgn1vF8hAf2BXIN');
                    xhr.send(JSON.stringify(data));
                }
                else {
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset:utf-8');
                    xhr.send(data);
                }
            } else {
                xhr.send();
            }
        }



        xhr.addEventListener('load', () => {
            resolve(JSON.parse(xhr.response));
        });

        xhr.addEventListener('error', () => {
            reject('请求失败！');
        })
    })

}

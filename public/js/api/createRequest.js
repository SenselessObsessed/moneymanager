/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let { url, data, method, callback } = options;

    const xhr = new XMLHttpRequest(),
        formData = new FormData();

    xhr.responseType = 'json';

    if(method === 'GET') {
        url += '?';
        for(let item in data) {
            url += item + '=' + data[item] + '&'
        }
        url = url.slice(0, url.length - 1);
    } else {
        for(let item in data) {
            formData.append(item, data[item])
        }
    }

    xhr.addEventListener('load', () => {
            if(xhr.status >= 200) {
                callback(xhr.response.error, xhr.response);
            }
    })

    try {
        xhr.open(method, url);
        xhr.send(formData);
    }  catch (e) {
        callback(e)
    }
};

// createRequest({url: 'q', 
// data: {mail: 'woqke@kqmwe',
//      pass: 'oqkwe'},
//      method: 'GET',
//      callback: () => console.log(123)
//     })
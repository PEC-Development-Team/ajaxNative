class clsAjax
{
    constructor(options)
    {
        if(!options)
        {
            console.error('options must be defined');
        }

        this.options = options;
        this.successArr = [];
        this.errorArr = [];

        if(!this.options.url)
        {
            console.error('options.url must be defined');
        }

        //Data Coming Back
        if(typeof this.options.responseType === 'undefined')
        {
            //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
            this.options.responseType = 'json'; //text (string), json, document (XML or HTML), arraybuffer (ArrayBuffer binary data), blob (object of binary data)
        }
        this.options.responseType = this.options.responseType.toLowerCase();

        //Data Going Up (not standard and may not be needed) json, formdata, file upload?
        if(typeof this.options.requestType === 'undefined')
        {
            //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
            this.options.requestType = 'json'; //text (string), json, document (XML or HTML), arraybuffer (ArrayBuffer binary data), blob (object of binary data)
        }
        this.options.requestType = this.options.requestType.toLowerCase();

        if(typeof this.options.auth === 'undefined')
        {
            this.options.auth = 'none'; //none, jwt, username/password
        }
        this.options.auth = this.options.auth.toLowerCase();

        if(typeof this.options.async === 'undefined')
        {
            //XMLHttpRequest.open(method, url, true/false)
            this.options.async = true;
        }

        if(typeof this.options.method === 'undefined')
        {
            //XMLHttpRequest.open(method, url, true/false)
            this.options.method = 'get';
        }
        this.options.method = this.options.method.toLowerCase();

        if(typeof this.options.success !== 'undefined')
        {
            this.addOnSuccess(this.options.success);
        }
        if(typeof this.options.error !== 'undefined')
        {
            this.addOnError(this.options.error);
        }

        this.request = new XMLHttpRequest();

        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
        //withCredentials --> this.options.auth
        //The XMLHttpRequest.withCredentials property is a Boolean that indicates whether or not cross-site Access-Control requests should be made
        //using credentials such as cookies, authorization headers or TLS client certificates. 
        //Setting withCredentials has no effect on same-site requests.

        this.addEvents();
        this.init();
    }

    init()
    {
        //XMLHttpRequest.open(method, url)
        //XMLHttpRequest.open(method, url, async)
        //XMLHttpRequest.open(method, url, async, user, password)
        this.request.open(this.options.method, this.options.url, this.options.async);

        //File Attachments and Form Data
        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
        //The XMLHttpRequest method setRequestHeader() sets the value of an HTTP request header. 
        //When using setRequestHeader(), you must call it after calling open(), but before calling send(). 
        //If this method is called several times with the same header, the values are merged into one single request header.

        //request.setRequestHeader() Can be called multiple times, each time it is called it will add a new header. Therefore what you have done in your question is correct.
        //Both of the following will be set
        //this.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        //this.request.setRequestHeader('Content-Type', 'text/html');

        //JWT
        //this.options.auth = jwt
        //this.request.setRequestHeader('Authorization', localStorage.getItem('token'));
        //If not exist then T.jwt.requestToken();

        //this.request.setRequestHeader("x-filename", photoId);
        //this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //this.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); //JSON
        //this.request.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); //JSON in TEAM

        /*
            //POST
            if (this.options.data instanceof FormData)
            {
                request.send(this.options.data);
            }
            else
            {
                var blob = new Blob([JSON.stringify(this.options.data)], { type: 'application/json' });

                request.send(blob);
            }
        */

        //var data = new FormData();
        //data.append('user', 'person');
        //data.append('pwd', 'password');
        //data.append('organization', 'place');
        //data.append('requiredkey', 'key');

        this.request.send(null);
        //this.request.send(data);
    }

    addEvents()
    {
        this.request.addEventListener('loadstart', (e) =>
        {
            this.onLoadStart(e);
        });
        this.request.addEventListener('load', (e) =>
        {
            this.onLoad(e);
        });
        this.request.addEventListener('loadend', (e) =>
        {
            this.onLoadEnd(e);
        });
        this.request.addEventListener('progress', (e) =>
        {
            this.onProgress(e);
        });
        this.request.addEventListener('error', (e) =>
        {
            this.onError(e);
        });
        this.request.addEventListener('abort', (e) =>
        {
            this.onAbort(e);
        });
        this.request.addEventListener('timeout', (e) =>
        {
            this.onTimeout(e);
        });
        this.request.addEventListener('readystatechange', (e) =>
        {
            this.onReadyStateChange(e);
        });
    }

    abort()
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort_event
        //The abort event is fired when a request has been aborted, for example because the program called XMLHttpRequest.abort()
        this.request.abort();
    }

    addOnSuccess(successFunc)
    {
        this.successArr.push(successFunc);
    }
    success(e)
    {
        for(let i = 0; i < this.successArr.length; i++)
        {
            //0 UNSENT, 1 OPENED, 3 LOADING OK, 4 DONE OK
            //this.request.statusText
            this.successArr[i](e);
        }
    }
    addOnError(errorFunc)
    {
        this.errorArr.push(errorFunc);
    }
    error(e)
    {
        for(let i = 0; i < this.errorArr.length; i++)
        {
            //0 UNSENT, 1 OPENED, 3 LOADING OK, 4 DONE OK
            //this.request.statusText
            this.errorArr[i](e);
        }
    }

    onReadyStateChange(e)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
        //An EventHandler that is called whenever the readyState attribute changes. 
        //The callback is called from the user interface thread. 
        //The XMLHttpRequest.onreadystatechange property contains the event handler to be called when the readystatechange event is fired, that is every time the readyState property of the XMLHttpRequest changes.

        //console.log('onReadyStateChange', e, this.request.status);
    }
    onLoadStart(e)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/loadstart_event
        //The loadstart event is fired when a request has started to load data.

        //console.log('onLoadStart', e, this.request.status);
    }
    onLoad(e)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/load_event
        //The load event is fired when an XMLHttpRequest transaction completes successfully.
        
        //console.log('onLoad', e, this.request.status);

        if (this.request.readyState === this.request.DONE || this.request.readyState === 4)
        {
            if (this.request.status === 0 || this.request.status === 200 || this.request.status < 400)
            {
                //console.log(this.request.response);
                //var data = JSON.parse(this.request.response);
                this.success(e);
            }
            else if(this.request.status === 401)
            {
                //Unauthorized
                //If using auth then something was wrong
                //If using jwt then get new token
            }
            else
            {
                //console.error('There was an issue with the request');
                this.error(e);
            }
        }
    }
    onLoadEnd(e)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/loadend_event
        //The loadend event is fired when a request has completed, whether successfully (after load) or unsuccessfully (after abort or error).

        //console.log('onLoadEnd', e, this.request.status);
    }
    onTimeout(e)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout_event
        //The timeout event is fired when progression is terminated due to preset time expiring.

        //console.log('onTimeout', e, this.request.status);
        this.error(e);
    }
    onProgress(e)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event
        //The progress event is fired periodically when a request receives more data.

        let total = e.total;
        let loaded = e.loaded;
        let percent = 0;
        
        if(total > 0 && loaded > 0)
        {
            percent = e.loaded / e.total * 100;
        }

        console.log(this.options.url, percent + '% :' + loaded + ' bytes transferred of ' + total + ' bytes\n');
    }
    onError(e)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/error_event
        //The error event is fired when the request encountered an error.

        //console.log('onError', e, this.request.status);
        this.error(e);
    }
    onAbort(e)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort_event
        //The abort event is fired when a request has been aborted, for example because the program called XMLHttpRequest.abort().

        //console.log('onAbort', e, this.request.status);
    }
}

function ajax(options)
{
    let ajax = new clsAjax(
        {
            url: options.url,
            method: options.method,
            requestType: options.requestType,
            responseType: options.responseType,
            auth: options.auth,
            data: options.data,
            success: options.success,
            error: options.error
        });

    return ajax;
}


let url = 'http://www.mickred.com/thefancast/TFC-Ep001-Logan1.mp3';
url = 'https://forecast.weather.gov/MapClick.php?lat=34.9943&lon=-91.9801&unit=0&lg=english&FcstType=json';
url = 'template.html';
ajax({
        url: url,
        method: 'GET',
        requestType: 'JSON',
        responseType: 'JSON',
        auth: 'None',
        data: 
        {

        },
        success: function(e)
        {
            console.log('success', e);
        },
        error: function(e)
        {
            console.log('error', e);
        }
    });



//File Uploads
/*
    let formData = new FormData();
    let files = this.containerElement.querySelector('.fileUpload').files;

    formData.append("clsFile", JSON.stringify(this.clsFile));

    for (var i = 0; i < files.length; i++)
    {
        formData.append('file', files[i], files[i].name);
    }

    request.send(formData);
*/











/* Async methods
class HttpClient {
    constructor(){}
    async get(url) {
        return new Promise( (resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = (evt) => {
                if (evt.currentTarget.readyState === 4 && evt.currentTarget.status === 200) {
                    try {
                        const response = JSON.parse(evt.currentTarget.response);
                        resolve(response);
                    } catch (exception) {
                        reject(exception);
                    }
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        });
    }
    async post(url, data) {
        return new Promise( (resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = (evt) => {
                if (evt.currentTarget.readyState === 4 && evt.currentTarget.status === 200) {
                    try {
                        const response = JSON.parse(evt.currentTarget.response);
                        resolve(response);
                    } catch (exception) {
                        reject(exception);
                    }
                }
            };
            xhttp.open('POST', url, true);
            xhttp.send(data);
        });
    }
}
const httpClient = new HttpClient();
const data = await httpClient.get('some url');
*/




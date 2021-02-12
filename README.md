# ajaxNative

Still in-progress. Applying lessons learned to our ajax class and addressing shortfalls.

If you have ideas please create an issue(s).

```
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
```
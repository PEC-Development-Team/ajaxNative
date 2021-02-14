# ajaxNative

Still in-progress. Applying lessons learned to our ajax class and addressing shortfalls.

1. Formdata
2. File upload/download
3. JSON
4. Binary data
5. Progress bar
6. Request type vs return type

If you have ideas please create an issue(s).

```
let url = 'http://www.mickred.com/thefancast/TFC-Ep001-Logan1.mp3';
url = 'https://forecast.weather.gov/MapClick.php?lat=34.9943&lon=-91.9801&unit=0&lg=english&FcstType=json';
url = 'template.html';

let templateHtml;

let ajaxVar = new clsAjax(
	{
		url: url,
		method: 'GET',
		requestType: 'text',
		responseType: 'text',
		async: false,
		auth: 'None',
		data: {},
		success: function(response)
		{
			//Do stuff
			templateHtml = response;
		},
		error: function(response)
		{
			console.log('error', response);
		}
	});

console.log(templateHtml); //Works if async false if true the value is returned after this line is fired
```

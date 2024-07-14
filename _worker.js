/**
*- Telegram group: https://t.me/AM_CLUBS
*- YouTube channel: https://youtube.com/@AM_CLUB
*- VLESS temporary subscription address: https://worker.amcloud.filegear-sg.me/866853eb-5293-4f09-bf00-e13eb237c655
*- Github repository address: https://github.com/ansoncloud8
**/
// Define a variable called mytoken and set 'passwd' as the default read and write permissions
let mytoken= 'passwd';

export default {
	async fetch (request, env) {
		// If there is a TOKEN in the environment variable, assign it to mytoken, otherwise keep the default value
		mytoken = env.TOKEN || mytoken;

		let KV;
		// Check if KV (key-value storage) has been set
		if (env.KV) {
			// Assign env.KV to a constant named KV
			KV =  env.KV;
		} else {
			//throw new Error('KV namespace is not bound');
			return new Response('KV namespace not bound', {
				status: 400,
				headers: { 'content-type': 'text/plain; charset=utf-8' },
			});
		}

		// Get the required parameters from the requested URL
		const url = new URL(request.url);
		let token;
		if (url.pathname === `/${mytoken}`){
			token = mytoken;
		} else {
			// Get the 'token' in the URL query parameter, if it does not exist, assign it to "null"
			token = url.searchParams.get('token') || "null";
		}

		// Check if the provided token matches mytoken
		if (token === mytoken) {
			const 文件名 = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;

			if (filename == "config" || filename == mytoken) {
				const html = configHTML(url.hostname, token);
				return new Response(html, {
				  headers: {
					'Content-Type': 'text/html; charset=UTF-8',
				  },
				});
			} else if (filename == "config/update.bat") {
				return new Response(下载bat(url.hostname, token), {
				  headers: {
					"Content-Disposition": `attachment; filename=update.bat`, 
					"content-type": "text/plain; charset=utf-8",
				  },
				});
			} else if (filename == "config/update.sh") {
				return new Response(下载sh(url.hostname, token), {
				  headers: {
					"Content-Disposition": `attachment; filename=update.sh`, 
					"content-type": "text/plain; charset=utf-8",
				  },
				});
			} else {
				// Get the 'text' and 'b64' in the URL query parameters, and set them to "null" if they do not exist
				const text = url.searchParams.get('text') || "null";
				const b64 = url.searchParams.get('b64') || "null";

				// If both 'text' and 'b64' are "null", read and return the file contents from KV
				if (text === "null" && b64 === "null"){
					const value = await KV.get(filename);
					return new Response(value , {
						status: 200,
						headers: { 'content-type': 'text/plain; charset=utf-8' },
					});
				} else {
					// Check if the file exists
					await fileExists(KV, filename);
					
					// If 'b64' is "null", write the file in plain text; if 'text' is "null", write the file in base64
					if (b64 === "null" ){
						await KV.put(filename, text);
						return new Response(text, {
							status: 200,
							headers: { 'content-type': 'text/plain; charset=utf-8' },
						});
					} else if (text === "null" ){
						await KV.put(filename, base64Decode(replace spaces with plus signs(b64)));
						return new Response(base64Decode(replace the space with the plus sign(b64)), {
							status: 200,
							headers: { 'content-type': 'text/plain; charset=utf-8' },
						});
					}
				}
			}

			
		} else if (url.pathname == "/"){//The homepage is changed to an nginx disguise page
			return new Response(`
			<!DOCTYPE html>
			<html>
			<head>
			<title>Welcome to nginx!</title>
			<style>
				body {
					width: 35em;
					margin: 0 auto;
					font-family: Tahoma, Verdana, Arial, sans-serif;
				}
			</style>
			</head>
			<body>
			<h1>Welcome to nginx!</h1>
			<p>If you see this page, the nginx web server is successfully installed and
			working. Further configuration is required.</p>
			
			<p>For online documentation and support please refer to
			<a href="http://nginx.org/">nginx.org</a>.<br/>
			Commercial support is available at
			<a href="http://nginx.com/">nginx.com</a>.</p>
			
			<p><em>Thank you for using nginx.</em></p>
			</body>
			</html>
			`, {
			  headers: {
				'Content-Type': 'text/html; charset=UTF-8',
			  },
			});
		} else {// If the token does not match, return 'token error'//
			return new Response('token error', {
				status: 400,
				headers: { 'content-type': 'text/plain; charset=utf-8' },
			});
		}
	}
};

// Define an asynchronous function named fileExists to check whether the file exists by checking whether there is a value corresponding to filename in KV
async function fileExists(KV, filename) {
	const value = await KV.get(filename);
	return value !== null;
}

// Define a function called base64Decode to convert base64-encoded strings to utf-8-encoded characters
function base64Decode(str) {
	const bytes = new Uint8Array(atob(str).split('').map(c => c.charCodeAt(0)));
	const decoder = new TextDecoder('utf-8');
	return decoder.decode(bytes);
}

function space-replace-plus-sign(str) {
	str = str.replace(/ /g, '+');
	return str;
}

function downloadbat(domain name, token) {
	return [
	  `@echo off`,
	  `chcp 65001`,
	  `setlocal`,
	  ``,
	  `set "DOMAIN=${domain name}"`,
	  `set "TOKEN=${token}"`,
	  ``,
	  `rem %~nx1 represents the file name and extension of the first parameter`,
	  `set "FILENAME=%~nx1"`,
	  ``,
	  `rem PowerShell command reads the first 65 lines of the file, converts the content to UTF8 and encodes it in base64`,
	  `for /f "delims=" %%i in ('powershell -command "$content = ((Get-Content -Path '%cd%/%FILENAME%' -Encoding UTF8) | Select-Object -First 65) -join [Environment]::NewLine; [convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($content))"') do set "BASE64_TEXT=%%i"`,
	  ``,
	  `rem save the content to response.txt`,
	  `rem echo %BASE64_TEXT% > response.txt`,
	  ``,
	  `rem constructs a URL with filename and content as parameters`,
	  `set "URL=https://%DOMAIN%/%FILENAME%?token=%TOKEN%^&b64=%BASE64_TEXT%"`,
	  ``,
	  `rem shows the response to the request`,
	  `rem powershell -Command "(Invoke-WebRequest -Uri '%URL%').Content"`,
	  `start %URL%`,
	  `endlocal`,
	  ``,
	  `echo update data completed, automatically close the window after 5 seconds countdown...`,
	  `timeout /t 5 >nul`,
	  `exit`
	].join('\r\n');
}

function downloadsh(domain name, token) {
	return `#!/bin/bash
export LANG=zh_CN.UTF-8
DOMAIN="${domain name}"
TOKEN="${token}"
if [ -n "$1" ]; then 
  FILENAME="$1"
else
  echo "no file name"
  exit 1
be
BASE64_TEXT=$(head -n 65 $FILENAME | base64 -w 0)
curl -k "https://$DOMAIN/$FILENAME?token=$TOKEN&b64=$BASE64_TEXT"
echo "Update data completed"
`
}

function configHTML(domain name, token) {
	return `
	  <html>
		<head>
		  <title>CF-Workers-TEXT2KV</title>
		</head>
		<body>
			<p align='center'><img src='https://ansoncloud8.github.io/logo.png' alt='Image Description' style='margin-bottom: 20px;'>
			<b style='font-size: 15px;'>If you find this project useful, please check out our GitHub project and give me a star:</b>
			<a href='https://github.com/ansoncloud8/am-tunnel' target='_blank'>am-tunnel</a>
			<iframe src='https://ghbtns.com/github-btn.html?user=ansoncloud8&repo=am-tunnel&type=star&count=true&size=large' frameborder='0' scrolling='0' width='170' height='30' title='GitHub'></iframe>
	
		  <h1 class="centered">CF-Workers-TEXT2KV configuration information</h1>
		  <p class="centered">
		  Service domain name: ${domain name} <br>
		  token: ${token} <br>
		  <br>
		  <pre>Note! Due to the limited length of the URL, the script update method can update a maximum of 65 lines of content at a time</pre><br>
		  Windows script: <button type="button" onclick="window.open('https://${domain name}/config/update.bat?token=${token}', '_blank')">Click to download</button>
		  <br>
		  <pre>使用方法: <code>&lt;update.bat&nbsp;ip.txt&gt;</code></pre>
		  <br>
		  Linux script:
		  <code>&lt;curl&nbsp;https://${域名}/config/update.sh?token=${token}&nbsp;-o&nbsp;update.sh&nbsp;&&&nbsp;chmod&nbsp;+x&nbsp;update.sh&gt;</code><br>
		  <pre>使用方法: <code>&lt;./update.sh&nbsp;ip.txt&gt;</code></pre><br>
		  <br>
		  Online Documentation Search: <br>
		  https://${domain name}/<input type="text" name="keyword" placeholder="Please enter the document to be queried">?token=${token}    
		  <button type="button" onclick="window.open('https://${domain name}/' + document.querySelector('input[name=keyword]').value + '?token=${token}', '_blank')">View document content</button>
		  <button type="button" onclick="navigator.clipboard.writeText('https://${domain name}/' + document.querySelector('input[name=keyword]').value + '?token=${token}')">Copy document address</button>
		  </p>
	  <br>
		</body>
	  </html>
	`
}

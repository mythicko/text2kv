# am-text2kv

# Text file storage CF-Workers-TEXT2KV

CF-Workers-TEXT2KV is a serverless application running on Cloudflare Workers that can store text files in Cloudflare Workers KV key-value storage and read or update these text files through URL requests. It provides a secure way to manage and access your text files while leveraging Cloudflare's globally distributed network.

- Deployment video tutorial: [Newbie Tutorial](https://www.youtube.com/watch?v=dzxezRV1v-o)
- Video tutorials: [All tutorials](https://www.youtube.com/playlist?list=PLGVQi7TjHKXbrY0Pk8gm3T7m8MZ-InquF)

- AM Technology official website: [https://am.809098.xyz](official website)
- YouTube: [https://youtube.com/@AM_CLUB](AM Technology)
- Telegram: [https://t.me/AM_CLUBS](AM_CLUBS)
- Github: [https://github.com/ansoncloud8](ansoncloud8)
- VLESS subscription information: [Node subscription information](https://worker.amcloud.filegear-sg.me/866853eb-5293-4f09-bf00-e13eb237c655)

## Features

- **Text File Storage**: You can store any text file in Cloudflare Workers KV key-value storage, including plain text, JSON, XML, and other formats.
- **Read files via URL**: Simply by constructing a suitable URL, you can read the contents of text files stored in KV.
- **Update files via URL**: You can use URL query parameters to upload new text content to KV to update files.
- **Base64 encoding support**: Supports uploading and downloading files using Base64 encoding to cope with some special character scenarios.
- **Secure access control**: By setting the token parameter, you can restrict access to your files to only those requests with the correct key.
- **Auxiliary tool script**: Provides Windows batch files and Linux Shell scripts to easily upload files from local to KV.

## Instructions for use

1. Deploy to Cloudflare Workers

  Deploy the project code to your Cloudflare Workers service. You need to first create a Workers project on Cloudflare, then copy and paste the contents of the `_worker.js` file into the Workers editor.

2. **Create KV namespace**

  In the KV tab of your Cloudflare Workers and Pages project, create a new `KV` namespace to store text files. Make a note of the name of this KV namespace, as you will need to bind it to Workers.

3. **Set the TOKEN variable**

  - For added security, you need to set a TOKEN variable as a key to access the file. In the Cloudflare Workers environment variable settings, add a variable called `TOKEN` and give it a secure value.
  - The default TOKEN is: `passwd`
  - Find the "KV Namespace Binding" item in the variables, click Add Binding, add a variable named `KV`, and select a KV namespace. This is the name of the KV namespace created in step 2 above.

4. **Visit the configuration page**

For example, if your workers project domain name is: `txt.anson.workers.dev`, the token value is `passwd`;

  - Visit `https://yourWorkersdomain/config?token=yourTOKEN` or `https://yourWorkersdomain/yourTOKEN`, you will see a configuration page with instructions and a link to download the script.

  - Your project configuration page is:

    ```URL
    https://txt.anson.workers.dev/config?token=passwd
    or
    https://txt.anson.workers.dev/passwd
    ```

5. **Use auxiliary script to upload files**

  - Windows users can download the `update.bat` script, and then execute `update.bat filename` to upload local files to KV.
  - Linux users can download the `update.sh` script and execute `./update.sh filename` to upload local files.
  - **Note: Due to the URL length limit, if the saved content is too long, you can only modify and save the large file by directly editing the corresponding file content of `KV`. **

6. **Access files via URL**

For example, your workers project domain name is: `txt.anson.workers.dev`, the token value is `test`, and the file name to be accessed is `ip.txt`;

  - Construct the URL in the format of `https://yourWorkersdomain/filename?token=yourTOKEN`. You can view the contents of the file in the browser.
  - Your access address is: `https://txt.anson.workers.dev/ip.txt?token=test`.

7. **Simple update file content**

  To update the contents of a file, you can use the URL query parameters `text` or `b64` to specify the new text content or Base64-encoded content. The format of the URL is:

  ```URL
https://your Workers domain name/file name?token=your TOKEN&text=new text content
or
https://your Workers domain name/file name?token=your TOKEN&b64=Base64-encoded new text content
  ```

Workers will automatically store new content in the corresponding files.

With this serverless application, you can easily store and manage text files on Cloudflare's distributed network while enjoying the advantages of high performance, security and reliability. Welcome to CF-Workers-TEXT2KV!

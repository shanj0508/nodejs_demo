var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery) //读取路径+查询参数
  // console.log('Method:')  
  // console.log(method) //读取请求动词：get 或post
  // console.log('request.headers')
  // console.log(request.headers) //读取请求头


  if(path === '/'){ 
    response.statusCode = 200  //设置响应状态码
    response.setHeader('Content-Type', 'text/html;charset=utf-8')   //设置响应头
    response.write(`  
      <!DOCTYPE html>
        <head>
          <link rel="stylesheet" href="/x"
        </head>
        <body>
        </body>
      <h1>标题</h1>
      <script src="/y"></script>

    `) //response.write() 写入相应内容  括号内的字符串用反引号括起来，反引号中间的内容可换行编写
    //设置响应体
    response.end()  // response.end() 调用end，则响应发送给浏览器
  } else if(path === '/x'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`body{color: red;}`)
    response.end()
  }  else if(path === '/y'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(`console.log("这是JS内容")`)
    response.end()
  } 
  else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你访问的页面不存在`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
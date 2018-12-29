// import { connect } from "http2";


/*
        首先安装了npm install -g nodemon，或者是安装为开发依赖项npm install --save-dev nodemon，
        然后使用nodemon server.js启动我们的服务，这样就可以实现不用每次关闭服务，重新启动了
        如果需要手动刷新，可以输入rs然后回车，就可以实现刷新
        */

// 使用node.js创建一个服务
// 使用require（）导入我们所需要的模块，这里需要http跟fs模块。
// createServer（）方法创建一个服务器，
// require('http').createServer(function (req, res) {
//     // console.log(req.url);
//     // 判断服务器请求的地址是否为根目录，这里就是判断是否为http://localhost:3000
//     if ('/' == req.url) {
//         // console.log(res);
//         // 如果请求是根目录，则代码写入标头,如果成功则为状态200，如果成功则为状态404
//         // 响应的内容类型为text/html
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         });
//         // 导入fs模块并使用pipe（）读入和写出内容
//         // Pipe是发送文件的首选方法
//         // 也可以使用res.end（'HTML'）手动将HTML写为字符串
//         require('fs').createReadStream('server.html').pipe(res);
//     }
//     else if('/getpoints'==req.url){
//         res.writeHead(200,{
//             'Content-Type':'application/json'
//         });
//         let lat=Math.random()*(36-35)+35;
//         let lon=Math.random()*(-107+106)-106;
//         res.end(JSON.stringify([{
//             "lat":lat,
//             "long":lon
//         }]));
//         // res.end(JSON.stringify([{
//         //     "lat":42,
//         //     "long":-72
//         // }]));
//     }else{
//         res.writeHead(400);
//         res.end('页面不存在！！');
//     }


//     // 使用if来判断URl是很繁琐的，我们可以使用中间键，也就是connect
//     // Connect是一个为常见任务提供中间件代码的模块。 中间件允许您以最少的工作完成这些常见任务; 你只需要使用use（）函数。
//     // 安装Connect，命令：npm install –g connect
// }).listen(3000); //监听端口3000.


/* 路径：/Connect/website/server.js */

//

var http = require('http');
var fs = require('fs');

//创建http服务器
var server = http.createServer(function (req, res) {
    //检查请求方法是GET且URL是以/images开始，.jpg结束
    if ('GET' == req.method && './images' == req.url.substr(0, 7) && '.jpg' == req.url.substr(-4)) {
        //检查文件是否存在， __dirname获取当前服务器所在的路径
        fs.stat(__dirname + req.url, function (err, stat) {
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end('Not Found !');
                return;
            }
            serve(__dirname + req.url, 'application/jpg');
        });
    }
    //如果URL为'/'，则响应index.html
    else if ('GET' == req.method && '/' == req.url) {
        serve(__dirname + '/index.html', 'text/html');
    } else {
        res.writeHead(404);
        res.end('Not Found !');
    }
    //根据文件路径获取文件内容
    function serve(path, type) {
        res.writeHead(200, {
            'Content-type': type
        });
        fs.createReadStream(path).pipe(res);
    }
});

//监听端口
server.listen(3000);
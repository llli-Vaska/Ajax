const express = require('express');

const path = require('path');

const formidable = require('formidable');
// const bodyParser = require('body-parser');  //15. =>去掉
const fs = require('fs');

const app = express();

// app.use(bodyParser.urlencoded({extended:false}));   //15. =>去掉
// app.use(bodyParser.json());  //15. =>去掉

app.use(express.static(path.join(__dirname,'public')));

app.get('/first1', (req, res) => {
    res.status(400).send('hello ajax!')
});
app.get('/first', (req, res) => {
    res.send('hello ajax!')
});
app.get('/responseData', (req, res) => {
    res.send({"name":"llf"})
});

app.get('/get', (req, res) => {
    res.send(req.query);
});

app.post('/post', (req, res) => {
    res.send(req.body);
});

app.post('/json', (req, res) => {
    res.send(req.body);
});

app.get('/readystate', (req, res) => {
    res.send('hello');
});

app.get('/error', (req, res) => {
    res.status(400).send('not ok');
})

app.get('/cache', (req, res) => {
    fs.readFile('./test.txt', (error, result) => {
        res.send(result);
    });
})


//设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});

app.get('/searchAutoPrompt', (req, res) => {
    // 搜索关键字
    const key = req.query.key;
    // 提示文字列表
    const list = [
        '百度',
        '百度文库',
        '百度图库',
        '百度地图',
        '百度一下',
        '百度app',
        '前端开发工程师',
        '前端从入门到放弃',
        'Ajax',
        '前端就业前景如何', 
        '前端小白'
    ];
    // 搜索结果
    let result = list.filter(item => item.includes(key));
    // 将查询结果返回给客户端
    res.send(result);
 });
//  ---------------------------
// 获取省份
app.get('/province', (req, res) => {
    res.json([{
        id: '001',
        name: '黑龙江省'
    },{
        id: '002',
        name: '四川省'
    },{
        id: '003',
        name: '河北省'
    },{
        id: '004',
        name: '江苏省'
    }]);
});

// 根据省份id获取城市
app.get('/cities', (req, res) => {
    // 获取省份id
    const id = req.query.id;
    // 城市信息
    const cities = {
        '001': [{
            id: '300',
            name: '哈尔滨市'
        }, {
            id: '301',
            name: '齐齐哈尔市'
        }, {
            id: '302',
            name: '牡丹江市'
        }, {
            id: '303',
            name: '佳木斯市'
        }],
        '002': [{
            id: '400',
            name: '成都市'
        }, {
            id: '401',
            name: '绵阳市'
        }, {
            id: '402',
            name: '德阳市'
        }, {
            id: '403',
            name: '攀枝花市'
        }],
        '003': [{
            id: '500',
            name: '石家庄市'
        }, {
            id: '501',
            name: '唐山市'
        }, {
            id: '502',
            name: '秦皇岛市'
        }, {
            id: '503',
            name: '邯郸市'
        }],
        '004': [{
            id: '600',
            name: '常州市'
        }, {
            id: '601',
            name: '徐州市'
        }, {
            id: '602',
            name: '南京市'
        }, {
            id: '603',
            name: '淮安市'
        }]
    }
    // 响应
    res.send(cities[id]);
});

// 根据城市id获取县城
app.get('/areas', (req, res) => {
    // 获取城市id
    const id = req.query.id;
    // 县城信息
    const areas = {
        '300': [{
            id: '20',
            name: '道里区',
        }, {
            id: '21',
            name: '南岗区'
        }, {
            id: '22',
            name: '平房区',
        }, {
            id: '23',
            name: '松北区'
        }],
        '301': [{
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
            id: '32',
            name: '富拉尔基区'
        }]
    };
    // 响应
    res.send(areas[id] || []);
});
app.post('/formData', (req, res) => {
    //创建formidable表单解析
    const form = new formidable.IncomingForm();
    //解析客户端传递过来的formdata对象
    form.parse(req, (err, fields, files) => {
        res.send(fields);
    });
});

//实现文件上传路由
app.post('/upload', (req, res) => {
   //创建formidable表单解析
   const form = new formidable.IncomingForm();
   //设置客户端上传文件的存储路径
   form.uploadDir = path.join(__dirname, 'public', 'uploads')
   //保留上传文件的后缀名字(默认false)
   form.keepExtensions = true;
   //解析客户端传递过来的formdata对象
   form.parse(req, (err, fields, files) => {
       res.send(files.attrName.path.split('public')[1]);
   });
});

//代表拦截所有的请求(解决跨域问题)
// app.use((req, res, next) => {
//     //1.允许哪些客户端访问我
//     //* 代表允许所有的客户端访问我
//     res.header('Access-Control-Allow-Oribin','*');
//     //2.允许客户端使用哪些请求方法访问我
//     res.header('Access-Control-Allow-Methods','get,posit');
//     next();
// })

// app.get('/cross',(req,res) => {
//     //1.允许哪些客户端访问我
//     //* 代表允许所有的客户端访问我
//     res.header('Access-Control-Allow-Oribin','*');
//     //2.允许客户端使用哪些请求方法访问我
//     res.header('Access-Control-Allow-Methods','get,posit');

//     res.send('ok')
// })

//端口号
const port = 3000;
app.listen(port);

console.log('服务器启动成功！' +'端口号为：' + port);

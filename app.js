var express = require('express')
var router = require('./router.js')

var app = express()

// 配置模板引擎
app.engine('html', require('express-art-template'))

// 配置静态资源
app.use('/node_modules/', express.static('./node_modules'))
app.use('/public/', express.static('./public'))

// 配置使用req.body获得post体数据
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// 路由模块
// router(app)

// express包装路由方式
// 把路由容器挂载到app服务中
app.use(router)

app.listen(3000, function () {
    console.log('Server is running at port 3000.')
})
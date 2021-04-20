const fs = require('fs')
//var studentoprts = require('./studentoprts.js')
const Student = require('./students.js')

// module.exports = function (app) {
//     app.get('/', function (req, res) {
//         fs.readFile('./db.json', function (err, data) {
//             if (err) {
//                 return res.status(500).send('Server error.')
//             }
//             data = data.toString()
//             res.render('index.html', {
//                 students: JSON.parse(data).students
//             })
//         })
//     })
// } 


// express包装路由

var express = require('express')

// 创建路由容器
var router = express.Router()

// 把路由挂载到router路由容器中
router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Sever Error.')
        }
        res.render('index.html', {
            students: students
        })
    })
})

router.get('/students/new', function (req, res) {
    res.render('new.html')
})

router.post('/students/new', function (req, res) {
    new Student(req.body).save(function (err) {
        if (err) {
            return res.status(500).send('Server Error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/edit', function (req, res) {
    Student.findOne({ id: req.query.id }, function (err, student) {
        if (err) {
            return res.status(500).send('Server Error')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

router.post('/students/edit', function (req, res) {
    Student.updateOne({ id: req.body.id }, req.body, function (err) {
        if (err) {
            return res.status(500).send('Server Error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', function (req, res) {
    Student.deleteOne({ id: req.query.id }, function (err) {
        if (err) {
            return res.status(500).send('Server Error.')
        }
        res.redirect('/students')
    })
})

// 导出router
module.exports = router

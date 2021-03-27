var fs = require('fs')

var dbPath = './db.json'

// 查找学生
exports.findAll = findAll

function findAll(callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

exports.findById = function (id, callback) {
    findAll(function (err, students) {
        if (err) {
            return callback(err)
        }
        var student = students.find(function (item) {
            return item.id === id
        })
        callback(null, student)
    })
}

// 添加保存学生
exports.save = function (student, callback) {
    findAll(function (err, students) {
        if (err) {
            return callback(err)
        }
        students.push(student)
        var fileData = JSON.stringify({ students: students })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })

    })
}

// 更新学生
exports.update = function (student, callback) {
    findAll(function (err, students) {
        if (err) {
            return callback(err)
        }
        var stu = students.find(function (item) {
            return item.id === student.id
        })
        for (var key in student) {
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({ students: students })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

// 删除学生
exports.delete = function (id, callback) {
    findAll(function (err, students) {
        if (err) {
            return callback(err)
        }
        var indexOfDelete = students.findIndex(function(item) {
            return item.id === id
        })
        students.splice(indexOfDelete, 1)
        var fileData = JSON.stringify({ students: students })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
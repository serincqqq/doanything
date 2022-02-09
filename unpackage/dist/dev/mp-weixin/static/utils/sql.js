const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
	host: 'localhost',
	user: "root",
	password: "123456",
	database: "doanything"
})
db.connect((err) => {
	if (err) throw err
	console.log('link-success')
})

app.get("/test/:id", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	let sql = `select title from todos where id=${req.params.id}`;
	console.log(req.body)
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err)
		} else {
			console.log(result)
			res.send(JSON.stringify(result))

		}
	})
})
app.get("/get2", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	let sql = `select title from todos where id=${req.query.id}`;
	console.log(req.query)
	db.query(sql, (err, result) => {
		if (err) {
			console.log(err)
		} else {
			console.log(result)
			res.send(JSON.stringify(result))
		}
	})
})
app.post("/wDiary", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	console.log(req.body)
	//写个问号 防止sql注入 会在执行时把post传进sql语句 替换问号
	let sql = "INSERT INTO diary SET?";
	db.query(sql, req.body, (err, result) => {
		if (err) {
			console.log(err)
		} else {
			console.log(result)
			res.send("todos added")
		}
	})
})
module.exports = app

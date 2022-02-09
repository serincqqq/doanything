const express = require('express')
const app = express()
app.use(express.urlencoded({
	entended: false
}))
const cors = require('cors');
app.use(cors());
const qs = require('qs')
const bodyParser = require('body-parser');

/* const router = require('./route.js') */
const sql = require('./sql.js')
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

app.use('/api', sql)
app.listen(3002, () => {
	console.log('本地')
})

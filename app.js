const express = require('express')
const bodyParser = require('body-parser')
const mysqlConnection = require("./connection");

const app = express();
const port = process.env.PORT || 3000;


// const dbname = "shivayfa_test";
// const dbuser = "shivayfa_test123";
// const dbpass = "12345678";


app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
    mysqlConnection.query("SELECT * FROM test1;", (err, rows, fields) => {
        // console.log(rows);
        if (!err) {
            res.status(200).send({
                code: "200",
                message: "succes",
                data: rows,
            });
        } else {
            res.status(500).send({
                message: "failed",
                data: err,
            });
        }
    });
});


app.post("/add", (req, res) => {
    var data = req.body;
    mysqlConnection.query("INSERT INTO `test1` ( `name`, `email`, `msg`) VALUES ('" + data.name + "','" + data.email + "','" + data.msg + "');", (err, rows, fields) => {
        if (!err) {
            mysqlConnection.query("SELECT * FROM test.test1;", (err, rows, fields) => {
                // console.log(rows);
                if (!err) {
                    res.status(200).send({
                        code: "200",
                        message: "succes",
                        data: rows,
                    });
                } else {
                    res.status(500).send({
                        message: "failed",
                        data: err,
                    });
                }
            });
            res.send({
                "msg" : "sucessfully added"
            });
        }
    });

});








app.listen(port, () => console.log(`app listening on port ${port}!`));

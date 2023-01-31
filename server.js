const {fork} = require("child_process");

const express = require("express");
const app = express();

const PORT = 3000;
const HOST = 'localhost';

app.get("/:num", (req, res) => {
    const num = req.params.num;

    // const result = is_prime(num);
    const child = fork("./src/get_picture.js");
child.send({time: Date.now()});
    // child.send(num);

    child.on("message", (message) => {
        console.log(message);
        // res.json(message);
    } );

    child.on("error", (e) => {
        console.log(e);
    });

    child.on("exit", (code) => {
        console.log("child exited with code of ", code);
    });
    res.json({});
});

app.listen(PORT, () => {
    console.log(`Server up: http://${HOST}:${PORT}`);
});




const express = require('express');
const { exec } = require("child_process");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!, ayush helo')
})

app.post("/webhook", (req, res) => {
    console.log("🔄 Webhook triggered!");

    // Run deployment commands
    exec("cd E:\\realloc\\cicd && git pull && npm install && npm run deploy", (err, stdout, stderr) => {
        if (err) {
            console.error(`❌ Deployment error: ${err}`);
            return res.status(500).send("Deployment failed");
        }
        console.log(`✅ Deployment output: ${stdout}`);
        res.send("Deployment successful");
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


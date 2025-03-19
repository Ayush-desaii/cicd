
const express = require('express');
const { exec } = require("child_process");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!, automate deploy done 0-0-0-0-0-0-0-0-0-0-0')
})

app.post("/webhook", (req, res) => {
    console.log("🔄 Webhook triggered!", req.body);

    // Run deployment commands
    exec("cd /mnt/e/realloc/cicd && git pull && npm install && npm run deploy", (err, stdout, stderr) => {
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


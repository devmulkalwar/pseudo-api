import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api', (req, res) => {
    res.send("hello world ");
});

app.listen(3000, (err, res) => {
    console.log("server is running on port 3000");
});
import express from  "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/data", (req, res) => {
    res.json({ message: "Hello, World!" });
    console.log("Received GET request at /data");
    // Simulate a delay of 1 second
    setTimeout(() => {
        console.log("Data processing completed");
    }, 1000);
});

const PORT =3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

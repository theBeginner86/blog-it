const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const blogRouter = require("./routes/blogRoutes");

dotenv.config();

const PORT = 4000;

const app = express();
app.use(express.urlencoded({
    extends: true
}));
app.use(cors());
app.use(express.json());

connectDB();

app.use("/account", userRouter);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
    res.write(`<h1>This is a basic MERN Stack project for blogging</h1>`);
    res.send();
})

app.listen(PORT, () => console.log(`App is listening at ${PORT}`));

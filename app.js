const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//create a server
const data = require("./routes/factoryRoutes");

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/factory", data);

app.get("/", (req, res) => {
    res.sendStatus(204);
});


app.listen(9090, () => {
    console.log("Listening on port 9090");
});
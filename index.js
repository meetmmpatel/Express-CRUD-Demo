const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const logger = require("./Log/logger");

app.use(logger);

app.get("/hello", (req, res) => {
  res.send("<h1>Hello API World !!<h1>");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

//Set the public static
//This is how we can setup page by default
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/members"));

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

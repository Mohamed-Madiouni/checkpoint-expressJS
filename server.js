let express = require("express");
let app = express();

// app.use(express.static(__dirname+"/css"))
app.use((req, res, next) => {
  let date = new Date();
  let day = date.getDay();
  let hours = date.getUTCHours() + 1;
  console.log(day, hours);
  if ((day === 6 || day === 0) && (hours < 9 || hours > 17))
    throw new Error("Server Offline");
  next();
});
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(503)
  res.sendFile(__dirname + "/public/error.html");
});
app.get("/", (req, res) => {
  res.redirect("/home.html");
});
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/public/css/style.css");
})
app.get("/home.html", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});
app.get("/Services.html", (req, res) => {
  res.sendFile(__dirname + "/public/Services.html");
});
app.get("/Contact.html", (req, res) => {
  res.sendFile(__dirname + "/public/Contact.html");
});

app.listen(4000, (err) => {
  if (err) throw err;
  console.log("server running on port 4000");
});

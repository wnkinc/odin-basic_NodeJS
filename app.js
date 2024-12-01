const express = require("express");
const app = express();
const path = require("path");
const authorRouter = require("./routes/authorRouter");
const bookRouter = require("./routes/bookRouter");
// const indexRouter = require("./routes/indexRouter");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   res.render("index", { message: "EJS rocks!" });
// });

// app.js
const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
];
const users = ["Rose", "Cakje", "Biff"];
app.get("/", (req, res) => {
  res.render("index", { links: links, users: users });
});
app.get("/about", (req, res) => {
  res.render("about", { links: links, users: users, message: "About page" });
});

app.use("/authors", authorRouter);
app.use("/books", bookRouter);
// app.use("/", indexRouter);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });
app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact-me.html"));
});

// app.use((req, res, next) => {
//   throw new Error("OH NO!");
//   // or next(new Error("OH NO!"));
// });

// Every thrown error in the application or the previous middleware function calling `next` with an error as an argument will eventually go to this middleware function
app.use((err, req, res, next) => {
  console.error(`${err}, shit`);
  // We can now specify the `err.statusCode` that exists in our custom error class and if it does not exist it's probably an internal server error
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});

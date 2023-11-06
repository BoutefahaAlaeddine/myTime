var StaticServer = require("static-server");
var Server = new StaticServer({
  rootPath: "./dist/",
  port: 8080,
});

Server.start(function () {
  console.log("http://localhost:8080/");
});

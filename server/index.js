const express = require('express');
const bodyParser = require("body-parser");

const { logger } = require("./_utils");
const ApiRouter = require("./_routes/api");
const keys = require('./keys.json')

const app = express();

function startServer() {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
      const allowedOrigins = ["http://localhost:3001", ""];
      const origin = req.headers.origin;
      if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );
      res.setHeader("Access-Control-Allow-Credentials", true);
      next();
    });
  }

  app.use("/", ApiRouter);

  app.use(function (req, res, next) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write("<h2>The requested resource is not available.</h2>");
    res.write("Request received on port " + keys.PORT + "<br>");
    res.write("Request URL: " + req.url + "<br>");

  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") !== "production" ? err : {};
    logger.err(req.path, err.message)
    logger.err(err)
    // render the error page
    res.status(err.status || 500);
    res.json(err);
  });


  app.listen(keys.port, err => {
    if (err) {
      logger.err(err.message);
      return;
    }
    logger.log("listening on port " + keys.port);
  });
}

startServer()




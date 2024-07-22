const indexRouter = require("./index");
const usersRouter = require("./users");
const openaiRouter = require("./openai");
const chatbotConfig = require("./chatbotConfig");
const login = require("./login");
const signup = require("./signup");

function setupRoutes(app) {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/openai", openaiRouter);
  app.use("/chatbotConfig", chatbotConfig);
  app.use("/login", login);
  app.use("/signup", signup);
}

module.exports = setupRoutes;

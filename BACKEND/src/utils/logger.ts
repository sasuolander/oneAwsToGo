import log4js from "log4js";
log4js.configure({
  appenders: { logs: { type: "file", filename: "logs.log" } },
  categories: { default: { appenders: ["logs"], level: "info" } },
});

export const logger = log4js.getLogger();
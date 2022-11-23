import log4js from "log4js";
log4js.configure({
  appenders: { logs: { type: "stdout" } },
  categories: { default: { appenders: ["logs"], level: "info" } },
});

export const logger = log4js.getLogger();
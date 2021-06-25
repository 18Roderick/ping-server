const i18n = require("i18n");
const path = require("path");

i18n.configure({
  locales: ["en", "es"],
  defaultLocale: "es",
  queryParameter: "lang",
  directory: path.join(__dirname, "/locales"),
  api: {
    __: "translate",
    __n: "translateN",
  },    
});

module.exports = i18n;

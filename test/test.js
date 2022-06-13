const { DateTime } = require("luxon");

const date = new DateTime(new Date());

console.log(date.toFormat(DateTime.DATETIME_FULL_WITH_SECONDS));

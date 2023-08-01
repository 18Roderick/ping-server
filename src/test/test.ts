const { DateTime } = require("luxon");

const date = new DateTime(new Date());

console.log(
	DateTime.now().toLocaleString(),
	DateTime.now().plus({ days: -1 }).toLocaleString(),
);

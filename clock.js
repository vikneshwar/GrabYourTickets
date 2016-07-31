var CronJob = require('cron').CronJob;

var job = new CronJob({
	cronTime: '*/15 * * * *',
	onTick: require('./jobs/checkAvailable.js')(),
	start: true
});
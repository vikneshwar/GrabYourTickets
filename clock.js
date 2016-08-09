var CronJob = require('cron').CronJob;

var checkAvailable = require('./jobs/checkAvailable.js');
var job = new CronJob({
	cronTime: '*/15 * * * *',
	onTick: checkAvailable.initiateCheck,
	start: true
});


job.start();
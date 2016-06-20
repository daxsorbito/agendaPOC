console.log('app started');
var Agenda  = require('agenda')
var mongoConnectionString = "mongodb://192.168.99.100:27017/agenda";
var jobs = [
  {
    jobName: 'First job',
    interVal: 3
  },
  {
    jobName: 'Second job',
    interVal: 2
  }
]
var agenda = new Agenda({db: {address: mongoConnectionString}});
var definedJobs = [];
agenda.define('main job', function(job, done) {
  console.log('<<<<<   main job   >>>>>');
  for (var x =0; x < jobs.length; x++) {
    agenda.define(jobs[x].jobName, function(j, d) {
      console.log(j.attrs.name + ' is executed >>', new Date().toString());
      d();
    });
    agenda.every(jobs[x].interVal +' seconds', jobs[x].jobName);
    agenda.start();
  }
  console.log('<<<<<   main job - done  >>>>>');
  done();
});

agenda.on('ready', function() {
  agenda.now('main job');

  agenda.start();
});

console.log('app ended');

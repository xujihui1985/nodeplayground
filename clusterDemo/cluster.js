var cluster = require('cluster'),
    master = require('./master').MasterNode;

if(cluster.isMaster) {
    master(cluster).run({
        nodeCount: 2
    });
} else {
    require('./worker');
}

module.exports = {
    MasterNode: MasterNode
};

function MasterNode(cluster){

    var events = {
        'fork': function(worker){
            console.log('master: fork event(work '+worker.id+')');
        },
        'online': function(worker){
            console.log('master: online event(work '+worker.id+')');
        },
        'listening': function(worker){
            console.log('master: listening event(work '+worker.id+')');
        },
        'exit': function(worker,address){
            console.log('master: exit event(work '+worker.id+')');
            //restart a node if the worker die
            cluster.fork();
        }
    } 

    return {
        run: run
    };

    function setUpEvent(){
        for(var event in events){
            cluster.on(event,events[event]);
        }
    }

    function run(options){
        for(var i=0; i< options.nodeCount; i++){
            cluster.fork();
        }
        setUpEvent(cluster);
    }
}

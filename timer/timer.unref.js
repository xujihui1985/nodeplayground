var timmer = setTimeout(timemoutHandler, 1000);

function timemoutHandler(){
    console.log('time out fired');
}

timmer.unref();

var start = +new Date();
while(true) {
    var cur = +new Date();
    if(cur-start > 500){
        console.log('long process');
        break;
    }
}


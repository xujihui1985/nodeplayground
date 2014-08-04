I saw from some book said timer.unref() is to cancel the timeout, and that's not correct

from node doc

`timer.unref()` will allow you to create a timmer that is active but if it is the only item left in the event loop won't keep the program running

by default, the program will hangup if you are waiting the timer to fullfill, but sometime, you want when your process finish executing, whether the timer have fullfilled, the program exit

we can use unref, unref means, if the timer is the last thing in the event queue, it will be ignored

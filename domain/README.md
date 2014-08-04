we know in node, if exception thrown in one request, the server will blow up

we can use domain to rescue, in each request, we can create a isolate domian, and listen error event on the domain object, all the exception that thrownin the domain will be captured in this event.

###main api

1.create
2.run
3.add  
4.remove
5.bind
6.intercept
7.enter
8.exist
9.dispose

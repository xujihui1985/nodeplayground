this is a demo to test cluster package.

in this test there are three files.

1. cluster.js   this is the main entry of this test, just node cluster.js to run the test.
2. master.js    this is master node which is to fork the node.
3. worker.js    this is the actual worker

as we know node use single thread to handle all the incomming request, so if there is some error happened in one request, then 
the server just blow up.

so, in production server, we can use cluster for two reason

1. improve proformance
2. recover the node if one node die


`node cluster.js` to start the server

start another terminal, `curl http://localhost:3000?q=1`
this will throw an error that cause server down.
try to run this command serval times to see if the server is still work

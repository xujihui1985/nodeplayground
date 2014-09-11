#include <node.h>
#include <iostream>

using namespace v8;

Handle<Value> RunCallback(const Arguments& args) {
  HandleScope scope;

  //cast the second argument as Local<Function>
  Local<Function> cb = Local<Function>::Cast(args[1]);

  //cast the first argument as Local<String>
  Local<String> para = args[0]->ToString(); // args[0]->ToString() return v8::Local<String>
  //std::cout << "adf" << std::endl;
  //
  const unsigned argc = 1;

  //create an array of args
  Local<Value> argv[argc] = { para };

  //call callback
  cb->Call(Context::GetCurrent()->Global(), argc, argv);
  //return undefined
  return scope.Close(Undefined());
}

void Init(Handle<Object> exports, Handle<Object> module) {
  module->Set(String::NewSymbol("exports"),
	  FunctionTemplate::New(RunCallback)->GetFunction());
}

NODE_MODULE(addon, Init);
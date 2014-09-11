#include <node.h>
#include <string>

using namespace v8;

Handle<Value> MyFunction(const Arguments& args) {
  HandleScope scope;
  char* message = "hello";
  //for(int i = 0; i < 10; i++) {
	//strcat(message, "hello\n");
  //}
  // convert c++ string to javascript string
  return scope.Close(String::New(message));
}

Handle<Value> CreateFunction(const Arguments& args) {
  HandleScope scope;

  Local<FunctionTemplate> tpl = FunctionTemplate::New(MyFunction);

  Local<Function> fn = tpl->GetFunction();

  fn->SetName(args[0]->ToString()); // omit this make it anonymas

  return scope.Close(fn);
}

void Init(Handle<Object> exports, Handle<Object> module) {
  module->Set(String::NewSymbol("exports"),
	  FunctionTemplate::New(CreateFunction)->GetFunction());
}

NODE_MODULE(addon, Init);
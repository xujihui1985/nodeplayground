#include "myobject.h"

using namespace v8;


Persistent<Function> MyObject::constructor;

MyObject::~MyObject() {}

MyObject::MyObject(double value) : value_(value) {
}

void MyObject::Init(Handle<Object> exports) {
  Isolate * isolate = Isolate::GetCurrent();

  Local<FunctionTemplate> tpl = FunctionTemplate::New(New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);

  constructor.Reset(isolate, tpl->GetFunction());

  exports->Set(String::NewFromUtf8(isolate, "MyObject"), tpl->GetFunction());
}

void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate * isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  if (args.IsConstructCall()) {
	double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue();
	MyObject * obj = new MyObject(value);
	obj-> Wrap(args.This());
	args.GetReturnValue().Set(args.This());
  } else {
	const int argc = 1;
	Local<Value> argv[argc] = { args[0] };
	Local<Function> cons = Local<Function>::New(isolate, constructor);
	args.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

void MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.Holder());
  obj->value_ += 1;
  args.GetReturnValue().Set(Number::New(isolate, obj->value_));
}

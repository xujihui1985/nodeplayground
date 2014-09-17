#include <node.h>
#include "myobject.h"

using namespace v8;

void Init(Handle<Object> exports) {
  MyObject::Init(exports);
}

NODE_MODULE(addon, Init)

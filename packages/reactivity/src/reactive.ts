import { isObject } from "@vue/shared";
import { ReactiveFlags } from "./constants";

export function reactive(target: any) {
  return createReactiveObject(target);
}

const reactiveMap = new WeakMap();
const mutableHandlers = {
  get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    return res;
  },
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    return result;
  },
};

function createReactiveObject(target: any) {
  console.log("reactive target:", target);
  if (!isObject(target)) return target;
  if (target[ReactiveFlags.IS_REACTIVE]) return target;

  const existingProxy = reactiveMap.get(target);
  if (existingProxy) return existingProxy;
  
  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}

import { isObject } from "@vue/shared";
import { ReactiveFlags } from "./constants";
import { mutableHandlers } from "./baseHandlers";

const reactiveMap = new WeakMap();

export function reactive(target: any) {
  return createReactiveObject(target);
}

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

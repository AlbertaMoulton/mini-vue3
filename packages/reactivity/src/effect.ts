export let activeEffect;

class ReactiveEffect {
  active = true;
  constructor(
    public fn,
    public scheduler,
  ) {}

  run() {
    if (!this.active) {
      return this.fn();
    }
    let lastActiveEffect = activeEffect;
    try {
      activeEffect = this;
      return this.fn();
    } finally {
      activeEffect = lastActiveEffect;
    }
  }
}

export function effect(fn, options?) {
  console.log("effect");
  const _effect = new ReactiveEffect(fn, () => {
    // scheduler
    _effect.run();
  });
  _effect.run();
  return _effect;
}


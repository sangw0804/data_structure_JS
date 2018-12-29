class Stack {
  constructor() {
    this.stacks = [];
  }

  size() {
    return this.stacks.length;
  }

  push(value) {
    this.stacks.push(value);
    return this;
  }

  pop() {
    return this.stacks.pop();
  }
}

export { Stack };

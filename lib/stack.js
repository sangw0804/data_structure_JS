/*
 *  array를 사용하여 stack 구현.
 */

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

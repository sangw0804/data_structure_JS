/** 스택 클래스 */

class Stack {
  /**
   * 스택 생성.
   */
  constructor() {
    this.stacks = [];
  }

  /**
   * 현재 스택의 요소 개수를 리턴.
   * @return {number}
   */
  size() {
    return this.stacks.length;
  }

  /**
   * 스택의 맨 뒤에 요소 삽입.
   * @param {*} value
   */
  push(value) {
    this.stacks.push(value);
    return this;
  }

  /**
   * 스택의 맨 뒤 요소를 빼서 리턴한다.
   * @return {*}
   */
  pop() {
    return this.stacks.pop();
  }
}

export { Stack };

# &#128055; data_structure_JS

<br>

## INTRODUCTION

JS 에 네이티브하게 존재하지 않는 자료구조들을 구현한 라이브러리입니다.

<br>

## DEPENDENCY

- jest

- expect

테스트를 위해 jest 와 expect를 사용하였습니다.

- babel-preset-env

jest가 ES6 일부 문법을 이해하지 못해 바벨을 사용하였습니다.

- ejs

- express

visualization 웹 서버를 돌리기 위해 express / ejs를 사용하였습니다.

- eslint

코드 스타일은 eslint(airbnb)을 따릅니다.

<br>

## USAGE

### - Singly Linked List

```javascript

import { SinglyLinkedList } from dataStructureJS

// SLL 인스턴스 생성
const sll = new SinglyLinkedList();

sll.push(1); // [1]
sll.push(2); // [1, 2]

sll.size(); // 2

sll.pop(); // 2
sll.pop(); // 1
sll.pop(); // undefined

sll.unshift(2); // [2]
sll.unshift(1); // [1, 2]

sll.shift(); // 1
sll.shift(); // 2
sll.shift(); // undefined

// sll.insert(index, value)
sll.insert(0, 1); // [1]
sll.insert(0, 2); // [2, 1]
sll.insert(1, 4); // [2, 4, 1]

sll.insert(4, 5); // Error: index is out of range!

// sll.remove(index);
sll.remove(1); // 4
// [2, 1]
sll.remove(0); // 2
// [1]

sll.remove(4); // Error: index is out of range!

sll.push(2); // [1, 2]
sll.push(3); // [1, 2, 3]

sll.reverse();
sll; // [3, 2, 1]

```

### - Doubly Linked List

```javascript

import { DoublyLinkedList } from dataStructureJS

// DLL 인스턴스 생성
const dll = new DoublyLinkedList();

dll.push(1); // [1]
dll.push(2); // [1, 2]

dll.size(); // 2

dll.pop(); // 2
dll.pop(); // 1
dll.pop(); // undefined

dll.unshift(2); // [2]
dll.unshift(1); // [1, 2]

dll.shift(); // 1
dll.shift(); // 2
dll.shift(); // undefined

// dll.insert(index, value)
dll.insert(0, 1); // [1]
dll.insert(0, 2); // [2, 1]
dll.insert(1, 4); // [2, 4, 1]

dll.insert(4, 5); // Error: index is out of range!

// dll.remove(index);
dll.remove(1); // 4
// [2, 1]
dll.remove(0); // 2
// [1]

dll.remove(4); // Error: index is out of range!

dll.push(2); // [1, 2]
dll.push(3); // [1, 2, 3]

dll.reverse();
dll; // [3, 2, 1]

```

### - Stack

```javascript

import { Stack } from dataStructureJS

// 스택 인스턴스 생성
const stack = new Stack();

stack.push(1);
stack.push(2);

stack.size(); // 2

stack.pop(); // 2
stack.pop(); // 1
stack.pop(); // undefined

```

### - Queue

```javascript

import { Queue } from dataStructureJS

// 큐 인스턴스 생성
const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);

queue.size(); // 2

queue.dequeue(); // 1
queue.dequeue(); // 2
queue.dequeue(); // undefined

```

### - Dequeue

```javascript

import { Dequeue } from dataStructureJS

// 덱 인스턴스 생성
const dequeue = new Dequeue();

dequeue.pushHead(1); // [1]
dequeue.pushTail(2); // [1, 2]
dequeue.pushHead(3); // [3, 1, 2]

dequeue.size(); // 3

dequeue.popTail(); // 2
dequeue.popHead(); // 3
dequeue.popHead(); // 1
dequeue.popHead(); // undefined

```

### - Heap

```javascript

import { Heap } from dataStructureJS

// 힙 인스턴스 생성
// new Heap(boolean isMax = true)
// 생성자에 인자로 boolean 값을 줄 수 있다.
// true 이면 max heap, false 이면 min heap이 생성되고, 기본값은 true 이다.
const heap = new Heap();

heap.insert('not number'); // Error: Invalid value is given!

heap.insert(4); // [4]
heap.insert(6); // [6, 4]
heap.insert(5); // [6, 4, 5]
heap.insert(10); // [10, 6, 5, 4]

heap.size(); // 4

heap.pop(); // 10
// [6, 4, 5]
heap.pop(); // 6
// [5, 4]
heap.pop(); // 5
// [4]
heap.pop(); // 4
// []
heap.pop(); // undefined

```

<br>

## TEST

- 테스트 실행

```

npm run test

```

<br>

## SERVER LISTENING

루트 디렉토리에서 npm run start 로 visualization 웹 서버를 3000번 포트에 실행시킬 수 있습니다.

```

npm run start

```

<br>

> 웹 뷰 frontend 예시 페이지 : http://ec2-13-209-66-132.ap-northeast-2.compute.amazonaws.com/

<br>

## LICENSE

MIT

```

```

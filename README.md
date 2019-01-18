# &#128055; data_structure_JS

<br>

## INTRODUCTION

JS 에 네이티브하게 존재하지 않는 자료구조들을 구현한 라이브러리입니다. <br>
또한 자료구조 시각화 웹 뷰 프론트엔드가 구현되어 있어 학습 용도 등으로 활용 가능합니다.

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
import { SinglyLinkedList } from 'data-structure-visualization';

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
import { DoublyLinkedList } from 'data-structure-visualization';

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
import { Stack } from 'data-structure-visualization';

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
import { Queue } from 'data-structure-visualization';

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
import { Dequeue } from 'data-structure-visualization';

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
import { Heap } from 'data-structure-visualization';

// 힙 인스턴스 생성
// new Heap(isMax = true)
// 생성자에 인자로 boolean 값을 줄 수 있다.
// true 이면 max heap, false 이면 min heap이 생성되고, 기본값은 true 이다.
const heap = new Heap();

// insert 인자가 number 타입이 아니면 에러가 발생한다.
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

### - Priority Queue

```javascript
import { PriorityQueue } from 'data-structure-visualization';

// 우선순위 큐 인스턴스 생성
const pq = new PriorityQueue();

// pq.enqueue(priority, value)

// priority 가 number 타입이 아니면 에러가 발생한다.
pq.enqueue('not number', 'val'); // Error: Invalid value is given!

pq.enqueue(3, 'wash your hand');
// [{3, 'wash your hand'}]
pq.enqueue(4, 'eat food');
// [{3, 'wash your hand'}, {4, 'eat food'}]
pq.enqueue(1, 'find out location of toilet');
// [{1, 'find out location of toilet'}, {4, 'eat food'}, {3, 'wash your hand'}]

pq.size(); // 3

pq.dequeue(); // {priority: 1, value: 'find out location of toilet'}
// [{3, 'wash your hand'}, {4, 'eat food'}]
pq.dequeue(); // {priority: 3, value: 'wash your hand'}
// [{4, 'eat food'}]
pq.dequeue(); // {priority: 4, value: 'eat food'}
// []
pq.dequeue(); // undefined
```

### - Binary Search Tree

```javascript
import { BinarySearchTree } from 'data-structure-visualization';

// 이진탐색트리 인스턴스 생성
const bst = new BinarySearchTree();

// insert 의 인자가 number 이외의 타입일 경우 에러 발생
bst.insert('not number'); // Error: Invalid valud is given!

bst.insert(4);
// 4
bst.insert(3);
//   4
// 3
bst.insert(10);
//   4
// 3   10
bst.insert(100);
//   4
// 3   10
//       100

bst.find(3); // true
bst.find(11); // false

bst.remove(10);
//   4
// 3   100
bst.remove(20); // Error: given value doesn't exist!!
```

### - Graph

```javascript
import { Graph } from 'data-structure-visualization';

// 그래프 인스턴스 생성
const graph = new Graph();

graph.addVertex('a');
graph.addVertex('b');
graph.addVertex('b'); // Error: given value already exists!
graph.addVertex('c');

graph.sizeVertex(); // 3

graph.addEdge('a', 'b');
graph.addEdge('a', 'z'); // Error: given value doesn't exist!
graph.addEdge('a', 'c');
//    a
//  /  \
// b   c

graph.sizeEdge(); // 2

graph.removeEdge('a', 'b');
graph.removeEdge('a', 'z'); // Error: given value doesn't exist!
//    a
//     \
// b   c

graph.sizeEdge(); // 1

graph.removeVertex('c');
graph.removeVertex('d'); // Error: given value doesn't exist!
//   a
//
// b
// removeVertex 메소드를 실행하면 해당 vertex에 연결되어 있던 모든 edge들이 제거된다.

graph.sizeVertex(); // 2
graph.sizeEdge(); // 0
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

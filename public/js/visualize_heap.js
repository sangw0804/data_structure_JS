import { Heap } from '../index.js';
import { createHeapElement } from '../components/index.js';

const heapName = { true: 'Max Heap', false: 'Min Heap' };
let isMaxHeap = true;
let heap = new Heap();
const main = document.getElementById('main');
const name = document.getElementById('name');

// insert
const insertButton = document.getElementById('insert_button');
const insertInput = document.getElementById('insert_value');
insertButton.onclick = () => {
  heap.insert(+insertInput.value);
  main.innerHTML = null;
  main.appendChild(createHeapElement(heap));
};

// pop
const popButton = document.getElementById('pop_button');
popButton.onclick = () => {
  heap.pop();
  main.innerHTML = null;
  main.appendChild(createHeapElement(heap));
};

// minHeap / maxHeap change
const changeButton = document.getElementById('change_button');
changeButton.onclick = () => {
  isMaxHeap = !isMaxHeap;
  heap = new Heap(isMaxHeap);
  main.innerHTML = null;
  name.innerText = heapName[isMaxHeap];
};

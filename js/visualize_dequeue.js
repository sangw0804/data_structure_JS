import { Dequeue } from '../index.js';
import { createDequeueElement } from '../components/index.js';

const dequeue = new Dequeue();
const main = document.getElementById('main');

// push_tail
const pushTailButton = document.getElementById('push_tail_button');
const pushTailInput = document.getElementById('push_tail_value');
pushTailButton.onclick = () => {
  dequeue.pushTail(pushTailInput.value);
  main.innerHTML = null;
  main.appendChild(createDequeueElement(dequeue));
};

// pop_tail
const popTailButton = document.getElementById('pop_tail_button');
popTailButton.onclick = () => {
  dequeue.popTail();
  main.innerHTML = null;
  main.appendChild(createDequeueElement(dequeue));
};

// push_head
const pushHeadButton = document.getElementById('push_head_button');
const pushHeadInput = document.getElementById('push_head_value');
pushHeadButton.onclick = () => {
  dequeue.pushHead(pushHeadInput.value);
  main.innerHTML = null;
  main.appendChild(createDequeueElement(dequeue));
};

// pop_head
const popHeadButton = document.getElementById('pop_head_button');
popHeadButton.onclick = () => {
  dequeue.popHead();
  main.innerHTML = null;
  main.appendChild(createDequeueElement(dequeue));
};

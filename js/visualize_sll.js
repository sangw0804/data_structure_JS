import { SinglyLinkedList } from '../index.js';
import { createSinglyLinkedListElement } from '../components/index.js';

const sll = new SinglyLinkedList();
const main = document.getElementById('main');

// push
const pushButton = document.getElementById('push_button');
const pushInput = document.getElementById('push_value');
pushButton.onclick = () => {
  sll.push(pushInput.value);
  main.innerHTML = null;
  main.appendChild(createSinglyLinkedListElement(sll));
};

// pop
const popButton = document.getElementById('pop_button');
popButton.onclick = () => {
  sll.pop();
  main.innerHTML = null;
  main.appendChild(createSinglyLinkedListElement(sll));
};

// unshift
const unshiftButton = document.getElementById('unshift_button');
const unshiftInput = document.getElementById('unshift_value');
unshiftButton.onclick = () => {
  sll.unshift(unshiftInput.value);
  main.innerHTML = null;
  main.appendChild(createSinglyLinkedListElement(sll));
};

// shift
const shiftButton = document.getElementById('shift_button');
shiftButton.onclick = () => {
  sll.shift();
  main.innerHTML = null;
  main.appendChild(createSinglyLinkedListElement(sll));
};

// insert
const insertButton = document.getElementById('insert_button');
const insertIndexInput = document.getElementById('insert_index_value');
const insertValueInput = document.getElementById('insert_value_value');
insertButton.onclick = () => {
  try {
    sll.insert(+insertIndexInput.value, insertValueInput.value);
    main.innerHTML = null;
    main.appendChild(createSinglyLinkedListElement(sll));
  } catch (e) {
    alert(e);
  }
};

// remove
const removeButton = document.getElementById('remove_button');
const removeIndexInput = document.getElementById('remove_index_value');
removeButton.onclick = () => {
  try {
    sll.remove(+removeIndexInput.value);
    main.innerHTML = null;
    main.appendChild(createSinglyLinkedListElement(sll));
  } catch (e) {
    alert(e);
  }
};

// reverse
const reverseButton = document.getElementById('reverse_button');
reverseButton.onclick = () => {
  sll.reverse();
  main.innerHTML = null;
  main.appendChild(createSinglyLinkedListElement(sll));
};
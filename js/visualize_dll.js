import { DoublyLinkedList } from '../index.js';
import { createDoublyLinkedListElement } from '../components/index.js';

const dll = new DoublyLinkedList();
const main = document.getElementById('main');

// push
const pushButton = document.getElementById('push_button');
const pushInput = document.getElementById('push_value');
pushButton.onclick = () => {
  dll.push(pushInput.value);
  main.innerHTML = null;
  main.appendChild(createDoublyLinkedListElement(dll));
};

// pop
const popButton = document.getElementById('pop_button');
popButton.onclick = () => {
  dll.pop();
  main.innerHTML = null;
  main.appendChild(createDoublyLinkedListElement(dll));
};

// unshift
const unshiftButton = document.getElementById('unshift_button');
const unshiftInput = document.getElementById('unshift_value');
unshiftButton.onclick = () => {
  dll.unshift(unshiftInput.value);
  main.innerHTML = null;
  main.appendChild(createDoublyLinkedListElement(dll));
};

// shift
const shiftButton = document.getElementById('shift_button');
shiftButton.onclick = () => {
  dll.shift();
  main.innerHTML = null;
  main.appendChild(createDoublyLinkedListElement(dll));
};

// insert
const insertButton = document.getElementById('insert_button');
const insertIndexInput = document.getElementById('insert_index_value');
const insertValueInput = document.getElementById('insert_value_value');
insertButton.onclick = () => {
  try {
    dll.insert(+insertIndexInput.value, insertValueInput.value);
    main.innerHTML = null;
    main.appendChild(createDoublyLinkedListElement(dll));
  } catch (e) {
    alert(e);
  }
};

// remove
const removeButton = document.getElementById('remove_button');
const removeIndexInput = document.getElementById('remove_index_value');
removeButton.onclick = () => {
  try {
    dll.remove(+removeIndexInput.value);
    main.innerHTML = null;
    main.appendChild(createDoublyLinkedListElement(dll));
  } catch (e) {
    alert(e);
  }
};

// reverse
const reverseButton = document.getElementById('reverse_button');
reverseButton.onclick = () => {
  dll.reverse();
  main.innerHTML = null;
  main.appendChild(createDoublyLinkedListElement(dll));
};
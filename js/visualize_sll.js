import { SinglyLinkedList } from '../index.js';
import { createSinglyLinkedListElement } from '../components/index.js';

const sll = new SinglyLinkedList();
sll
  .push(1)
  .push(2)
  .push(3);
const main = document.getElementById('main');
main.appendChild(createSinglyLinkedListElement(sll));

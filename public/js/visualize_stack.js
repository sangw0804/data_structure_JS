import { Stack } from '../index.js';
import { createStackElement } from '../components/index.js';

const stack = new Stack();
const main = document.getElementById('main');

// push
const pushButton = document.getElementById('push_button');
const pushInput = document.getElementById('push_value');
pushButton.onclick = () => {
  try {
    if (!pushInput.value.length) throw new Error('채워지지 않은 필드가 있습니다.');
    stack.push(pushInput.value);
    main.innerHTML = null;
    main.appendChild(createStackElement(stack));
  } catch (e) {
    alert(e);
  }
};

// pop
const popButton = document.getElementById('pop_button');
popButton.onclick = () => {
  stack.pop();
  main.innerHTML = null;
  main.appendChild(createStackElement(stack));
};

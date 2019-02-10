import { createNodeElement } from '../node.js';

const createStackElement = stack => {
  const result = document.createElement('div');
  result.setAttribute('id', 'stack');
  result.setAttribute(
    'style',
    'width: 150px; border-left: 1px solid black; border-right: 1px solid black; border-bottom: 1px solid black; display: flex; flex-direction: column-reverse; align-items: center'
  );

  if (!stack.size()) return result;

  stack.stacks.forEach(s => {
    result.appendChild(createNodeElement({ value: s }));
  });

  return result;
};

export { createStackElement };

const createNodeElement = value => {
  const nodeElement = document.createElement('div');

  nodeElement.setAttribute(
    'style',
    'font-size: 2rem; border-radius:10px; background-color: tomato; height: 100px; width:100px; display:inline-block; margin: 5px; text-align: center'
  );

  nodeElement.appendChild(document.createTextNode(`${value}`));
  return nodeElement;
};

const createPriorityNodeElement = (value, priority) => {
  const priorityNodeElement = document.createElement('div');

  priorityNodeElement.setAttribute(
    'style',
    'border-radius:10px; background-color: tomato; height: 100px; width:100px; display: inline-flex; flex-direction:column; justify-content: around; align-items:center; margin: 5px; text-align: center'
  );

  const priorityNode = document.createElement('div');
  priorityNode.setAttribute('style', 'font-size: 1.3rem; margin: 10px');
  priorityNode.innerText = priority;

  const valueNode = document.createElement('div');
  valueNode.setAttribute('style', 'font-size: 1.7rem; margin: 10px');
  valueNode.innerText = value;

  priorityNodeElement.appendChild(priorityNode);
  priorityNodeElement.appendChild(valueNode);
  return priorityNodeElement;
};

export { createNodeElement, createPriorityNodeElement };

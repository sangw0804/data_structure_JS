const createNodeElement = ({ value, colored }) => {
  const nodeElement = document.createElement('div');

  nodeElement.setAttribute(
    'style',
    `font-size: 2rem; border-radius:10px; background-color: ${colored ||
      'tomato'}; height: 100px; width:100px; display:inline-block; margin: 5px; text-align: center`
  );

  nodeElement.appendChild(document.createTextNode(`${value}`));

  return nodeElement;
};

const createPriorityNodeElement = ({ value, priority, colored }) => {
  const priorityNodeElement = document.createElement('div');

  priorityNodeElement.setAttribute(
    'style',
    `border-radius:10px; background-color: ${colored ||
      'tomato'}; height: 100px; width:100px; display: inline-flex; flex-direction:column; justify-content: around; align-items:center; margin: 5px; text-align: center`
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

const createBTreeNodeElement = ({ values, children, valueLength, colored, valuesColor }) => {
  const BTreeNodeElement = document.createElement('div');

  BTreeNodeElement.setAttribute(
    'style',
    `border-radius:10px; background-color: ${colored || 'tomato'}; height: 100px; width: ${80 *
      valueLength}px; display: inline-flex; flex-direction: column; margin: 5px; text-align: center`
  );

  const valuesElement = document.createElement('div');
  valuesElement.setAttribute(
    'style',
    'flex-basis: 80%; width: 100%; display: flex; flex-direction: row; justify-content: around'
  );
  for (let i = 0; i < valueLength; i += 1) {
    const tempDivElement = document.createElement('div');
    tempDivElement.setAttribute(
      'style',
      `flex-basis: ${100 / valueLength}%; border-radius:10px; ${
        valuesColor[i] ? `background-color: ${valuesColor[i]};` : ''
      }`
    );
    tempDivElement.innerText = values[i];
    valuesElement.appendChild(tempDivElement);
  }

  const childrenElement = document.createElement('div');
  childrenElement.setAttribute(
    'style',
    'flex-basis: 20%; width: 100%; display: flex; flex-direction: row; justify-content: around'
  );
  for (let i = 0; i < valueLength + 1; i += 1) {
    const tempDivElement = document.createElement('div');
    tempDivElement.setAttribute('style', `flex-basis: ${100 / (valueLength + 1)}%`);
    childrenElement.appendChild(tempDivElement);
  }

  BTreeNodeElement.appendChild(valuesElement);
  BTreeNodeElement.appendChild(childrenElement);

  return BTreeNodeElement;
};

const createEmptyNodeElement = () => {
  const nodeElement = document.createElement('div');
  nodeElement.setAttribute('style', 'font-size: 2rem; height: 100px; width:100px; display:inline-block; margin: 5px;');

  nodeElement.appendChild(document.createTextNode('empty'));

  return nodeElement;
};

const createEmptyPriorityNodeElement = () => {
  const nodeElement = document.createElement('div');
  nodeElement.setAttribute('style', 'font-size: 2rem; height: 100px; width:100px; display:inline-flex; margin: 5px;');

  nodeElement.appendChild(document.createTextNode('empty'));

  return nodeElement;
};

export {
  createNodeElement,
  createPriorityNodeElement,
  createEmptyNodeElement,
  createEmptyPriorityNodeElement,
  createBTreeNodeElement
};

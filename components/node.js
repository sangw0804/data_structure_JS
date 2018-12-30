const createNodeElement = value => {
  const nodeElement = document.createElement('div');

  nodeElement.setAttribute('style', 'background-color: red; height: 100px; width:100px; display:inline-block');

  nodeElement.appendChild(document.createTextNode(`${value}`));
  return nodeElement;
};

export { createNodeElement };

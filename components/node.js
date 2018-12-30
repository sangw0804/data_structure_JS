const createNodeElement = value => {
  const nodeElement = document.createElement('div');

  nodeElement.setAttribute(
    'style',
    'font-size: 2rem;background-color: tomato; height: 100px; width:100px; display:inline-block'
  );

  nodeElement.appendChild(document.createTextNode(`${value}`));
  return nodeElement;
};

export { createNodeElement };

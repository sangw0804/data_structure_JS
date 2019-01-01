const createNodeElement = value => {
  const nodeElement = document.createElement('div');

  nodeElement.setAttribute(
    'style',
    'font-size: 2rem; border-radius:10px; background-color: tomato; height: 100px; width:100px; display:inline-block; margin: 5px; text-align: center'
  );

  nodeElement.appendChild(document.createTextNode(`${value}`));
  return nodeElement;
};

export { createNodeElement };

const createArrow = direction => {
  const mapDirectionToCode = { right: '=>', left: '<=' };
  const pointerElement = document.createElement('span');
  pointerElement.appendChild(document.createTextNode(mapDirectionToCode[direction]));
  return pointerElement;
};

export { createArrow };

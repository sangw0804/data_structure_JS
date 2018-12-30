const createArrow = direction => {
  const mapDirectionToCode = { right: '=>' };
  const pointerElement = document.createElement('span');
  pointerElement.appendChild(document.createTextNode(mapDirectionToCode[direction]));
  return pointerElement;
};

export { createArrow };

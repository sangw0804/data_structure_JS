const buttonDisableHOC = (func, label) => {
  return async event => {
    event.target.innerText = 'progressing..';
    event.target.setAttribute('disabled', true);

    await func(event);

    event.target.innerText = label;
    event.target.removeAttribute('disabled');
  };
};

export { buttonDisableHOC };

const delayAndApply = async (applyed, applyer, sec) => {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), sec));
  applyed.innerHTML = null;
  applyed.appendChild(applyer);
};

export { delayAndApply };

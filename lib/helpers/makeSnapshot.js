const makeSnapshot = original => {
  const snapshot = Object.create(original);
  Object.keys(original).forEach(key => {
    snapshot[key] = JSON.parse(JSON.stringify(original[key]));
  });

  return snapshot;
};

export { makeSnapshot };

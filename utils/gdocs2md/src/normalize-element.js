const normalizeElement = (element) => {
  if (element.type && element.value) {
    return { [element.type]: normalizeElement(element.value) };
  }

  if (Array.isArray(element)) {
    return element.map(normalizeElement);
  }

  return element;
};

module.exports = { normalizeElement };

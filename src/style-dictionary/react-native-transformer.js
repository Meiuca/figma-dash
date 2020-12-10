module.exports = (prop) => {
  let extractedNumber = parseFloat(prop.value);

  if (isNaN(extractedNumber)) return prop.value;

  return {
    original: prop.value,
    number: extractedNumber,
    scale: extractedNumber * 16,
    decimal: extractedNumber / 100,
  };
};

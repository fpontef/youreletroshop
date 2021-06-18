const convertMoney = ({ value, numberFormat = 'pt-BR', currency = 'BRL' }) => {
  const valueToFormat = Number(value);

  // TODO: Create a conversion to cents instead of full value multiply by 100
  // TODO: Convert back from cents to full value using ( value / 100 )

  const result = new Intl.NumberFormat(numberFormat, {
    style: 'currency',
    currency: currency,
  }).format(valueToFormat);

  return result;
};

export default convertMoney;

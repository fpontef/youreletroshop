// Following https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

const formatDate = ({ date, intl = 'pt-br' }) => {
  const dateToFormat = new Date(date);
  return dateToFormat.toLocaleString('pt-br');
};

export default formatDate;

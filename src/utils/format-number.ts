const formatNumber = (
  amount: any,
  decimalCount = 2,
  decimal = ',',
  thousands = '.',
) => {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    const i: any = parseInt(
      (amount = Math.abs(amount || 0).toFixed(decimalCount)),
    ).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return (
      'R$' +
      (negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : ''))
    );
};

export default formatNumber;

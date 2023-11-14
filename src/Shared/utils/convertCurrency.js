export default function convertCurrency(price) {
  let currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return currency.format(price);
}

export default function formatAmount(num = 0) {
  const str = num.toString().split('.')

  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
  }

  if (str[1]) {
    str[1] = str[1].slice(0, 2)
  }

  return str.join('.')
}

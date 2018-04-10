export const copy = str => {
  // https://ru.stackoverflow.com/questions/553424/js-Копирование-в-буфер-обмена
  const tmp = document.createElement('INPUT')
  const focus = document.activeElement

  tmp.value = str

  document.body.appendChild(tmp)
  tmp.select()
  document.execCommand('copy')
  document.body.removeChild(tmp)
  focus.focus()
}

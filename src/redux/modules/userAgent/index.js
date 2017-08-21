/*
  Модуль-заглушка, для корректного определения userAgent при SSR.
  userAgent проставляется один раз во время SSR из заголовка запроса
*/

export default (state = '') => state

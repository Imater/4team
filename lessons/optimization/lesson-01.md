# Диагностика производительности

### Perf
Позволяет выявлять компоненты, которые перерисовываются без причины. Позволяет анализировать время рендера компонентов.
React Addons Perf - расширение хрома, которое позволяет запускать и останавливать сбор статистики.

*Демо:* Запуск неоптимизированного короткого приложения с списком элементов, вывод таблицы производительности.

### Developer Tools
Позволяет: 
- проводить глубокий анализ кода
- анализировать производительности
- анализировать потребления памяти
- отображение перерендера
- дебаг 
- пользоваться React расширением хрома
- пользоваться Redux расширением хрома
- отображать хранилище redux
- условные точки остановки
- Elements Panel показывает изменения и перерендер компонентов в реакт
- React Perf on Timeline

*Демо:* Показать основной функционал из списка, рассказать как использовать на практике, научить проводить отладку приложений без изменения кода

### Console
- console.time
- console.assert
- console.group
- console.log
- console.profile
- console.trace
*Демо:* Добавление отладочных сообщений без изменения кода

### Использование window.perfomance
Позволяет в коде ставить метки с названием компонента или страницы для более удобного анализа производительности

### FPS Meter
Позволяет вовремя диагностировать падение производительности, особенно при scroll, websocket

### Пропатченный connect
Отображает все случае бесполезного перерендера контейнера с `@connect` функцией при изменённом `props`, который изменился по ссылке, но остался прежним по содержанию

### Angular компонент
Позволяет использовать Trace React Updates


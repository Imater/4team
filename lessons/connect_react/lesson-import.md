# Подключаем React: операторы import / export

### Import
Оператор Import необходим для того, чтобы использовать и переиспользовать код размещенный в других файлах и библиотеках.

### Import – пути до файлов и библиотек
Чаще всего импорт используется в виде:
```javascript
import lib from 'npmlibrary'
```
В node.js мире, такая запись идентична:
```javascript
const lib = require('npmlibrary')
```

Путь до библиотеки или файла, откуда будет импортироваться код может быть нескольких видов:
```javascrip
import myCode from './thisDirectoryFile' // точка означает текущую директорию
import myCode from '../../parentDirectoryFile' // две точки означают переход на директорию выше
import npmFunction from 'npmlibrary' // импорт из npm библиотеки, находящейся в папке node_modules
import subfunction from 'npmlibrary/subfunction' // импорт из npm библиотеки, находящейся в папке node_modules, конкретный файл
```
Обратите внимание, что если используется система сборки webpack, то расширение файла можно опускать, тогда система сама будет искать разные варианты: `thisDirectoryFile.js`, `thisDirectoryFile.jsx`, `thisDirectoryFile/index.js`, `thisDirectoryFile.json`. Какие расширения искать по умолчанию, задаётся в webpack конфгурации в разделе resolve (https://github.com/Imater/4team/blob/develop/webpack/prod.config.js#L63)

В этом же resolve разделе, можно указать целые папки/пути, по которым webpack будет искать alias, таким образом, вы можете сокращать часто используемые пути к локальным директориям, чтобы не писать каждый раз вот так: `../../../../src/components/Button`, если указать путь и alias, то такая запись `src/components/Button` или даже `components/Button` будет заходить в казанную директорию и импортировать код оттуда.

### Import – использование деструктуризации
Вы можете импортировать не только библиотеку целиком, но и отдельные её части, это делается при помощи ES6 оператора диструктуризации:
```javascript

import React, { PureComponent, PropTypes } from 'react'
import styles from './AdaptiveHeader.styl'
import Tabs from '../Tabs/Tabs'

class AdaptiveHeader extends PureComponent {
  static propTypes = {
    containerQuery: PropTypes.object
  }
  render() {
    return (
      <div className={styles.adaptiveHeader}>
        <Tabs />
      </div>
    )
  }
}

export default AdaptiveHeader

```
Тут в первой строчке в React переменную попадает вся библиотека React целиком, а в PureComponent и PropTypes переменные только отдельные функции. Т.е. в react библиотеке экспортируется default секция и она попадает в React переменную, и экспортируются именованные функции PureComponent, PropTypes.

### Import – использование "псевдонимов" при помощи `as`
Бывает так, что по умолчанию, именованные функции имеют неудобное при конкретном использовании имя, оно может, например, дублироваться. Тогда используют оператор `as`, который создаёт псевдоним для библиотеки или её отдельных функций.

```
import * as name from "module-name"; 
import { export as alias } from "module-name"; 
import { export1 , export2 as alias2 } from "module-name"; 
import defaultExport, * as name from "module-name"; 
```

### Import – простой импорт самоисполняющегося кода
Для простого импорта кода, который исполнится сам или импорта стилей, поллифилов, используют import без создания переменной. Это называется импорт модуля для использования его побочного эффекта:
```
import "module-name";
```

### Import – область видимости

import создаёт переменную в текущей области видимости, поэтому когда вы импортируете код внутри функции, то эта переменная будет существовать только там.

### Пример импорта и экспорта
```javascript
// file.js - модуль
function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () { 
     callback(this.responseText)
  };
  xhr.open('GET', url, true);
  xhr.send();
}

export function getUsefulContents(url, callback) {
  getJSON(url, data => callback(JSON.parse(data)));
}
```

```javascript
// file.js – основной код
import { getUsefulContents } from '/modules/file.js';

getUsefulContents('http://www.example.com',
    data => { doSomethingUseful(data); });
```

### Динамический import

Напомню, что import создаёт переменные в текущей области видимости, что позволяет использовать импорт нужных участков кода локально, например внутри асинхронной функции. Тогда вам понадобится асинхронный import. Если вы будете его использовать и правильно настроете конфигурацию webpack, тогда при вызове функции происходит импорт из отдельного файла скрипта ("чанка", созданного на этапе сборки проекта) и только потом будет выполнен код использующий функции из этого файла.

```
handleLoadClick() {
    import('../utils/get-awesome-data')
      .then(({ getAwesomeText }) => {
        this.setState({
          data: getAwesomeText()
        })
      })
      .catch(err => {
        console.error(err.message);
      });
  };
```

Это открывает широкие возможности оптимизации больших и сложных приложений. Но злоупотреблять этим не стоит, так как преждевременная оптимизация может принести больше вреда, чем пользы. Динамические импорты не являются частью стандарта языка, и потому чтобы использовать их в коде необходимо обязательно установить babel-plugin-syntax-dynamic-import и добавить его в конфигурации Babel.

Также, нужно проверять данный код на работоспособность при серверном рендеринге, если он используется.

### Export – экспорт кода для дальнейшего использования при помощи `import`

```
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // или var
export let name1 = …, name2 = …, …, nameN; // или var, const

export default выражение;
export default function (…) { … } // или class, function*
export default function name1(…) { … } // или class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```

Существует два типа экспорта, каждый из которых описан ниже:

Именованный экспорт :
```javascript
export { myFunction }; // экспорт ранее объявленной функции
export const foo = Math.sqrt(2); // экспорт константы
```

Дефолтный экспорт (экспорт по умолчанию) (один на скрипт):
```javascript
export default function() {} // или 'export default class {}'
// тут не ставится точка с запятой
```

Именованная форма более применима для экспорта нескольких величин. Во время импорта, можно будет использовать одно и то же имя, чтобы обратиться к соответствующему экспортируемому значению.

Касательно экспорта по умолчанию (default), он может быть только один для каждого отдельного модуля (файла). Дефолтный экспорт может представлять собой функцию, класс, объект или что-то другое. Это значение следует рассматривать как "основное", так как его будет проще всего импортировать.

### Особенности серверного рендеринга

Если вы вынесли код в отдельный файл и экспортируете его результаты, обратите внимание, что внутри у файла своя область видимости и все "неэкспортированные переменные" будут существовать только внутри этого файла. Многие пользуясь этим, объявляют переменные для хранения состояния, чтобы при запуске экспортированных функций возращать каждый раз это состояние.

Необходимо понимать, что при выполнении вашего кода для серверного рендеринга, node.js будет импортировать ваш код *один раз* и при каждом вызове функции будет переиспользовать тот же модуль. Поэтому происходит очень частая ошибка, когда между разными клиентами, открывающими страницу, за счёт использования let внутри модулей, между клиентами делющими одновременный запрос, начинают мелькать одни и те же данные, так как запросов несколько, а переменная для хранения состояния одна. Код в node.js выполняется асинхронно и функция может быть вызвана одновременно.

Поэтому не храните состояние в модулях. Создавайте функции, которые могут создавать экземляр другой функции в которой хранится своё состояние и прокидывая этот "инстанс" по коду, можно воспользоваться этим состоянием в рамках *одного* запроса клиента.


### Ссылки для дальнейшего изучения
* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/import
* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/export

# Деструктуризация

Деструктуризация позволяет присваивать несколько переменных одновременно, например в одной строчке

### Деструктуризация массивов

```javascript
const [first, second, third] = ['First', `Second`, `Third`]
```
идентично коду:
```javascript
const arr = ['First', `Second`, `Third`]
const first = arr[0]
const second = arr[1]
const third = arr[2]
```
В данном примере видно, что деструктуризация увеличивает читаемость кода, расширяет возможности однострочно использовать однотипные операции за один раз.

### Деструктуризация объектов

```javascript
const { first, second, third } = { first: 'First', second: `Second`, third: `Third` }
```
идентично коду:
```javascript
const obj = { first: 'First', second: `Second`, third: `Third` }
const first = obj.first
const second = obj.second
const third = obj.third
```

Также можно производить переименования во время деструктуризации объектов:

```javascript
const { first, second, third: th } = { first: 'First', second: `Second`, third: `Third` }
// в данном случае third переменной не будет, будет только th === 'Third'
```

### Значения по умолчанию при деструктуризации

```javascript
const [first, second, third = 'Third'] = ['First', `Second`]
```

```javascript
const { first, second, third = 'Third' } = { first: 'First', second: `Second` }
```

### Вложенные деструктуризации

Иногда необходимо достать переменную, которая "сидит" глубоко в объекте. Если вы уверены, что "глубокий объект" существует, вы можете достать его свойства при помощи вложенной деструктуризации

```javascript
let options = {
  size: {
    width: 300,
    height: 500
  },
  items: ["First", "Second"]
}

let { title="Default_title", size: {width, height}, items: [item1, item2] } = options;

// Default_title 300 500 First Second
alert(title);  // Default_title
alert(width);  // 300
alert(height); // 500
alert(item1);  // First
alert(item2);  // Second
```
Обратите внимание, что если объекта из которого вы пытаетесь прочитать свойство не существует, будет ошибка выполнения javascript. Чтобы обойти это, используйте фукнцию ramda библиотеки `path` или `pathOr`, либо выставляйте проверки или дефолтные значения

### Оператор "spread"
Если мы хотим получить и последующие значения массива, но не уверены в их числе – можно добавить ещё один параметр, который получит «всё остальное», при помощи оператора "..." («spread», троеточие):

```javascript
let [firstName, lastName, ...rest] = "Юлий Цезарь Император Рима".split(" ");

alert(firstName); // Юлий
alert(lastName);  // Цезарь
alert(rest);      // Император,Рима (массив из 2х элементов)
```

Значением rest будет массив из оставшихся элементов массива. Вместо rest можно использовать и другое имя переменной, оператор здесь – троеточие. Оно должно стоять только последним элементом в списке слева.


### Источники

* https://learn.javascript.ru/destructuring

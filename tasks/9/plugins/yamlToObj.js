export function yamlToObj(yamlStr) {
  const lines = yamlStr
    .split('\n')
    .map(line => line.replace(/\s*#.*$/, '')) // убираем комментарии
    .filter(line => line.trim() !== '');      // убираем пустые

  const result = {};
  let currentParent = result;       // текущий родитель (объект)
  let currentKey = null;            // последний ключ, например "items"
  let currentIndent = 0;            // отступ последней строки с ключом
  let expectArray = false;          // флаг: после "ключ:" ожидаем массив

  for (const line of lines) {
    const indent = line.match(/^(\s*)/)[1].length;
    const content = line.trim();

    // Если отступ меньше или равен предыдущему — выходим из вложенности
    if (indent < currentIndent && currentParent !== result) {
      currentParent = result;
      expectArray = false;
    }

    if (content.startsWith('- ')) {
      // Это элемент массива
      if (expectArray && currentKey) {
        // Создаём массив в родителе под currentKey
        currentParent[currentKey] = [parseValue(content.slice(2))];
        // Теперь currentParent = массив
        currentParent = currentParent[currentKey];
        expectArray = false; // больше не ожидаем массив (уже создали)
      } else if (Array.isArray(currentParent)) {
        // Уже внутри массива — просто пушим
        currentParent.push(parseValue(content.slice(2)));
      }
    } else {
      // Обычная строка: ключ: значение
      const colonIndex = content.indexOf(':');
      if (colonIndex === -1) continue;

      const key = content.slice(0, colonIndex).trim();
      const valueStr = content.slice(colonIndex + 1).trim();

      currentKey = key;
      currentIndent = indent;

      if (valueStr === '') {
        // Будет вложенность. Если следующая строка — массив, то это массив
        expectArray = true;
        // НЕ создаём объект. Ждём следующую строку.
      } else {
        // Простое значение
        result[key] = parseValue(valueStr);
        expectArray = false;
      }
    }
  }

  return result;
}

function parseValue(str) {
  if (str === 'true') return true;
  if (str === 'false') return false;
  if (str === 'null') return null;
  if (/^-?\d+$/.test(str)) return parseInt(str, 10);
  if (/^-?\d+\.\d+$/.test(str)) return parseFloat(str);
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    return str.slice(1, -1);
  }
  return str;
}
# Вычислитель отличий

### Hexlet tests and linter status:

[![Actions Status](https://github.com/aleksusergit/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/aleksusergit/frontend-project-46/actions)

## Описание

Проект "Вычислитель отличий" – это программа (утилита), определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например, http://www.jsondiff.com/. Подобный механизм зачастую используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

<!-- Возможности утилиты:

- Поддержка разных входных форматов: yml, yaml, json
- Генерация отчета в виде plain text, stylish и json
 -->

## Требования

- Git клиент
- Node.js 18 или выше
- Make

## Установка

- Клонировать проект

```
$ git clone
```

- Установить пакет (может потребоваться sudo)

```
$ make setup
```

## Пример использования

### Сравнение плоских файлов (JSON)

```
$ gendiff filePath1.json filePath2.json
```

[![asciicast](https://asciinema.org/a/aO7WXJ44NJal35GaMaT70iWE1.svg)](https://asciinema.org/a/aO7WXJ44NJal35GaMaT70iWE1)

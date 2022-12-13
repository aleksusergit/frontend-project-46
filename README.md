# Вычислитель отличий

### Hexlet tests and linter status:

[![Actions Status](https://github.com/aleksusergit/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/aleksusergit/frontend-project-46/actions)
[![Node CI](https://github.com/aleksusergit/frontend-project-46/actions/workflows/github-actions.yml/badge.svg)](https://github.com/aleksusergit/frontend-project-46/actions/workflows/github-actions.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/2fd0ee9edf6c6de49b8e/maintainability)](https://codeclimate.com/github/aleksusergit/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2fd0ee9edf6c6de49b8e/test_coverage)](https://codeclimate.com/github/aleksusergit/frontend-project-46/test_coverage)

## Описание

Проект "Вычислитель отличий" – это программа (утилита), определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например, http://www.jsondiff.com/. Подобный механизм зачастую используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

Возможности утилиты:

- Поддержка разных входных форматов: yml, yaml, json

- Генерация отчета в виде stylish, plain text и json

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

### Сравнение плоских файлов (.json)

```
$ gendiff filepath1.json filepath2.json
```

[![asciicast](https://asciinema.org/a/aO7WXJ44NJal35GaMaT70iWE1.svg)](https://asciinema.org/a/aO7WXJ44NJal35GaMaT70iWE1)

### Сравнение плоских файлов (.yml, .yaml, .json)

```
$ gendiff filepath1.yaml filepath2.yaml
```

[![ascicast](https://asciinema.org/a/pIaGc0TZHcFJpmR8KYC0bummQ.svg)](https://asciinema.org/a/pIaGc0TZHcFJpmR8KYC0bummQ)

### Сравнение файлов (.yml, .yaml, .json) с вложенной структурой в формате stylish

```
$ gendiff filepath1.json filepath2.yaml
```

[![ascicast](https://asciinema.org/a/NhO0wSWwcuZDc5H8qMj0WTZC5.svg)](https://asciinema.org/a/NhO0wSWwcuZDc5H8qMj0WTZC5)

### Сравнение файлов (.yml, .yaml, .json) с вложенной структурой в формате plain text

```
$ gendiff -f plain filepath1.json filepath2.yaml
```

[![ascicast](https://asciinema.org/a/uJHuRagkm5qRXsyCjrSHIrnJL.svg)](https://asciinema.org/a/uJHuRagkm5qRXsyCjrSHIrnJL)

### Сравнение файлов (.yml, .yaml, .json) с вложенной структурой в формате json

```
$ gendiff -f json filepath1.json filepath2.yaml
```

[![ascicast](https://asciinema.org/a/COLsz1hvAFoIE6WWxRoKyp6kn.svg)](https://asciinema.org/a/COLsz1hvAFoIE6WWxRoKyp6kn)

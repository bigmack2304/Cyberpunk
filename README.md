<p align="center">
  <a href="https://github.com/bigmack2304/Cyberpunk"><img src="./source/img/logos/Cyberpunk_logo-min.svg" alt=""></a>
</p>
<p align="center">
  <a href="https://github.com/bigmack2304/Cyberpunk"><img src="https://github.com/bigmack2304/qr-txt-decompiller/actions/workflows/github-actions-main.yml/badge.svg" alt=""></a>
</p>

Данный проект предназначен исключительно для демонстрации верстки по макету, минимальное количество интерактивных елементов, однако все-же есть заскриптованные элементы.

### Особенности:

-   На странице не используются никакие сторониие библиотеки.
-   Ризиново адаптивная верстка под три типа экранов (мобильные, планшеты, мониторы).
-   Адаптивный размер шрифтов.
-   Использование последних возможностей CSS таких как: контейнерные селекторы, flex, grid, clamp, и др.
-   Используется предзагрузка шрифтов. (По возможности шрифты грузятся сразу после загрузки html).
-   Используется тег "picture" для определения того, какой именно вариант картинки нужен на текущем устройстве. (Нету смысла грузить картинку в большом качестве на устройство с небольшим экраном).
-   Асинхронная загрузка скриптов для повышения скорости загрузки страницы.
-   Оптимизированы и сжаты абсолютно все ресурсы страницы (картинки, svg, шрифты), для PROD. сборки настроенно сжатие .html, .css, .js фаилов (удаляются все комментарии и ненужные пробелы).

-   Настроенна "lazy" загрузка для картинок, кроме этого присутствует скрипт с полностью своей реализацией "lazy" загрузки.
-   Применен "динамический импорт" так как на телефонах некоторый функционал не потребуется (для оптимизации и повышения скорости загрузки).
-   Плавное отображение контента по мере прокрутки страницы (полностью своя реализация).
-   Настроен "Автопрефиксер" для поддержки новых своиств разными браузерами
-   Конечная сборка осуществляется Вебпаком на стороне gitHub, через gitHub actions

#### Ссылки:

1. **[Ссылка](https://bigmack2304.github.io/Cyberpunk/build_final/final/index.html) на релизную версию страницы.**

2. [Ссылка](https://bigmack2304.github.io/Cyberpunk/build_dev/dev/index.html) на последнюю тестовую версию страницы.

3. [Ссылка](https://www.figma.com/file/cyOuCcxqhxwqCrillGbcFm/Cyberpunk?node-id=14%3A64&mode=dev) на макет.

#### Используемые технологии:

-   HTML5
-   CSS3
-   LESS
-   PostCSS
-   Java Script
-   Type Script
-   WebPack

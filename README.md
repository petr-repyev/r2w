R2W
===

[Главная](http://r2w.herokuapp.com/-i.html), [индекс](http://r2w.herokuapp.com/-i.html).


Можно собирать самостоятельно с помощью [middleman](http://middlemanapp.com/).

Для сборки нужно установить [rubygems](https://rubygems.org/), после этого внутри директории запустить: `bundle install`, затем `middleman server` для запуска или `middleman build` для сборки (собранный проект будет лежать в директории `tmp`.

Шаблонизация
---

Для разметки используется [HAML](http://haml.info/).

Шаблоны страниц находятся в директории `layouts`:

* `layout` — шаблон по умолчанию
* `main` — шаблон главной страницы
* `account` — шаблон страниц профиля
* `help` — шаблон страниц помощи

Из страниц в шаблоны можно передавать переменные с помощью [frontmatter](http://middlemanapp.com/basics/frontmatter/).

Для сборки страниц также используются [partials](http://middlemanapp.com/basics/templates#partials), они находятся в директории `shared`

CSS
---

В качестве препроцессора используется [SASS](http://sass-lang.com/) с SCSS синтаксисом.

Стили собираются в файле `s.scss`.

* `_normalize.scss` — нормализация стилей
* `_vars.scss` — переменные проекта
* `_common.scss` — общие стили
* `partials/` — стили блоков
* `pages/` — стили страниц

JS
---

JS собирается с помощью [Asset Pipeline](http://middlemanapp.com/basics/asset-pipeline/).

* `x.js` — общий для всего проекта js
* `main.js` — js главной страницы

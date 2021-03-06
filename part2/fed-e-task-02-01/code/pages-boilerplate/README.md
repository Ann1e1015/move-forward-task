## 以下是该项目自动化启动方法


## Getting Started

```shell
# 进入到pages-boilerplate目录后
# install dependencies
$ yarn # or npm install
```

## Usage

```shell
$ yarn <task> [options]
```

### e.g.

```shell
# Runs the app in development mode
$ yarn serve
# Builds the app for production to the `dist` folder
$ yarn build --production
# 一些服务器的配置在serve方法中
$  bs.init({
   # 开启服务器提醒
    notify: false,
   #  开启的端口
    port: 8080,
   #  自动打开浏览器
    open: false,
   #  文件位置
    files: 'dist/**',
    server: {
      #  查找资源的目录
      baseDir: ['temp', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
```

### Available Scripts

#### `yarn compile` or `npm run compile`

<!-- 如果需要放出来compile功能，需要在gulpfile.js最后module.exports导出的对象中添加compile方法 -->
Compile the styles & scripts & pages file. 

#### `yarn serve` or `npm run serve`

Runs the app in development mode with a automated server.

##### options

- `open`: Open browser on start, Default: `false`
- `port`: Specify server port, Default: `2080`

#### `yarn build` or `npm run build`

Builds the app for production to the `dist` folder. It minify source in production mode for the best performance.

##### options

#### `yarn clean` or `npm run clean`

Clean the `dist` & `temp` files.

## Folder Structure

```
└── my-awesome-pages ································· project root
   ├─ public ········································· static folder
   │  └─ favicon.ico ································· static file (unprocessed)
   ├─ src ············································ source folder
   │  ├─ assets ······································ assets folder
   │  │  ├─ fonts ···································· fonts folder
   │  │  │  └─ pages.ttf ····························· font file (imagemin)
   │  │  ├─ images ··································· images folder
   │  │  │  └─ logo.png ······························ image file (imagemin)
   │  │  ├─ scripts ·································· scripts folder
   │  │  │  └─ main.js ······························· script file (babel / uglify)
   │  │  └─ styles ··································· styles folder
   │  │     ├─ _variables.scss ······················· partial sass file (dont output)
   │  │     └─ main.scss ····························· entry scss file (scss / postcss)
   │  ├─ layouts ····································· layouts folder
   │  │  └─ basic.html ······························· layout file (dont output)
   │  ├─ partials ···································· partials folder
   │  │  └─ header.html ······························ partial file (dont output)
   │  ├─ about.html ·································· page file (use layout & partials)
   │  └─ index.html ·································· page file (use layout & partials)
   ├─ .csscomb.json ·································· csscomb config file
   ├─ .editorconfig ·································· editor config file
   ├─ .gitignore ····································· git ignore file
   ├─ .travis.yml ···································· travis ci config file
   ├─ CHANGELOG.md ··································· repo changelog
   ├─ LICENSE ········································ repo license
   ├─ README.md ······································ repo readme
   ├─ gulpfile.js ···································· gulp tasks file
   ├─ package.json ··································· package file
   └─ yarn.lock ······································ yarn lock file
```

## Related

- [zce/x-pages](https://github.com/zce/x-pages) - A fully managed gulp workflow for static page sites.

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)



[travis-image]: https://img.shields.io/travis/zce/pages-boilerplate/master.svg
[travis-url]: https://travis-ci.org/zce/pages-boilerplate
[version-image]: https://img.shields.io/github/package-json/v/zce/pages-boilerplate/master.svg
[version-url]: https://github.com/zce/pages-boilerplate
[license-image]: https://img.shields.io/github/license/zce/pages-boilerplate.svg
[license-url]: https://github.com/zce/pages-boilerplate/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/pages-boilerplate.svg
[dependency-url]: https://david-dm.org/zce/pages-boilerplate
[devdependency-image]: https://img.shields.io/david/dev/zce/pages-boilerplate.svg
[devdependency-url]: https://david-dm.org/zce/pages-boilerplate?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: http://standardjs.com

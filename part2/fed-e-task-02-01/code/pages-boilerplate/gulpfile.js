// 实现这个项目的构建任务
// 1. 引用src，dest模块完成读取写入流
const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')

// 开启服务器自动更新插件
const browserSync = require('browser-sync')

// 自动加载插件
const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()

const bs = browserSync.create()

// 2. 转换CSS插件
// const plugins.sass = require('gulp-sass')
// const plugins.babel = require('gulp-babel')
// const plugins.swig = require('gulp-swig')
// const plugins.imagemin = require('gulp-imagemin')

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}
// 清除dist和temp目录
const clean = () => {
  return del(['dist', 'temp'])
}

const style = () => {
  // 制定base可以保留文件目录
  return src('src/assets/styles/*.scss', { base: 'src' })
  // 默认全展开
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
    // 这里的reload是在
    .pipe(bs.reload({ stream: true }))
}

const script = () => {
  // 制定base可以保留文件目录
  return src('src/assets/scripts/*.js', { base: 'src' })
  // 设置要使用的babel转换插件
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}
// 整合模板，写入temp
const page = () => {
  return src('src/**/*.html', { base: 'src' })
  // 将模板引擎缓存设为false
    .pipe(plugins.swig({ data, defaults: { cache: false } }))
    // .pipe(swig({ data }))  用data可以向模板传值
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}
// 图片压缩
const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
// 字体图标压缩
const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
// 复制public下的文件
const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/**/*.html', page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
    // 这里的reload只是在静态资源在变化的时候才reload
  ], bs.reload)

  bs.init({
    notify: false,
    port: 8080,
    open: false,
    files: 'dist/**',
    server: {
      baseDir: ['temp', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

// 将目录下所有的文件压缩
const useref = () => {
  return src('temp/*.html', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({ 
      // 折叠所有的html内容
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page)

const build = series(
  clean, 
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

const develop = series(compile, serve)

module.exports = {
  build,
  develop,
  clean
}
// 实现这个项目的构建任务
// 1. 引用src，dest模块完成读取写入流
const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')

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

const clean = () => {
  return del(['dist', 'temp'])
}

const style = () => {
  // 制定base可以保留文件目录
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
}

const script = () => {
  // 制定base可以保留文件目录
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
}

const page = () => {
  return src('src/**/*.html', { base: 'src' })
    .pipe(plugins.swig())
    // .pipe(swig({ data }))  用data可以向模板传值
    .pipe(dest('temp'))
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

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
    'src/assets/styles/*.scss',
    'src/assets/scripts/*.js',
    'src/**/*.html',
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
  compile,
  build,
  develop,
  useref,
  clean
}
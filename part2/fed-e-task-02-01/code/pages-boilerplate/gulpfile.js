// 实现这个项目的构建任务
// 1. 引用src，dest模块完成读取写入流
const { src, dest } = require('gulp')
// 2. 转换CSS插件
const cleanCss = require('gulp-clean-css')
const sass = require('gulp-sass')
const babel = require('gulp-babel')

const style = () => {
  // 制定base可以保留文件目录
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

const script = () => {
  // 制定base可以保留文件目录
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'))
}

module.exports = {
  style,
  script
}
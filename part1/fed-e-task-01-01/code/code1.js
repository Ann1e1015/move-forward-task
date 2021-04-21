/*
  将下面异步代码使用 Promise 的方法改进
  尽量用看上去像同步代码的方式
  setTimeout(function () {
    var a = 'hello'
    setTimeout(function () {
      var b = 'lagou'
      setTimeout(function () {
        var c = 'I ♥ U'
        console.log(a + b +c)
      }, 10)
    }, 10)
  }, 10)
*/

const wait10 = val => {
  return new Promise ((res, rej) => {
    setTimeout(() => res(val) , 10)
  })
}

wait10(['hello'])
  .then(val => {
    return wait10(val.concat('lagou'))
  })
  .then(val => {
    return wait10(val.concat('I ♥ U'))
  })
  .then(val => {
    console.log(val.join(' '))
  })
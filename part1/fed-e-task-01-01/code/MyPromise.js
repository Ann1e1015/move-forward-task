/*
尽可能还原 Promise 中的每一个 API, 并通过注释的方式描述思路和原理.
*/

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      console.log(err.message)
    }
  }

  status = 'pending'

  resCallback = []

  rejCallback = []

  value = undefined

  reason = undefined

  resolve = (value) => {
    if (this.status !== 'pending') return
    this.status = 'fulfilled'
    this.value = value
    // this.resCallback && this.resCallback(value)
    while (this.resCallback.length !== 0) this.resCallback.shift()()
  }

  reject = (reason) => {
    if (this.status !== 'pending') return
    this.status = 'rejected'
    this.reason = reason
    // this.rejCallback && this.rejCallback(reason)
    while (this.resCallback.length !== 0) this.rejCallback.shift()()
  }

  then = (resCallback, rejCallback) => {
    let promise2 = new Promise((res, rej) => {
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = resCallback(this.value)
            resolvePromise(promise2, x, res, rej)
          } catch (err) {
            rej(err)
          }
        }, 0)
      } else if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            let x = rejCallback(this.reason)
            resolvePromise(promise2, x, res, rej)
          } catch (err) {
            rej(err)
          }
        }, 0)
      } else {
        this.resCallback.push(() => {
          setTimeout(() => {
            try {
              let x = resCallback(this.value)
              resolvePromise(promise2, x, res, rej)
            } catch (err) {
              rej(err)
            }
          }, 0)
        })
        this.rejCallback.push(() => {
          setTimeout(() => {
            try {
              let x = rejCallback(this.reason)
              resolvePromise(promise2, x, res, rej)
            } catch (err) {
              rej(err)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
}

function resolvePromise (promise2, x, res, rej) {
  if (promise2 === x) rej(new TypeError('no own'))
  if (x instanceof MyPromise) {
    x.then(res, rej)
  } else res(x)
}

module.exports = MyPromise

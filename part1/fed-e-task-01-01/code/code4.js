const MyPromise = require('./MyPromise')

const pro = new MyPromise((res, rej) => {
    setTimeout(() => {
        res('new a promise')
    }, 2000);
    // res('new a promise')
})

function other () {
    return new MyPromise((res, rej) => {
        res('other promise')
    })
}

pro.then(val => {
    console.log(val)
    return other()
}).then(val => {
    console.log(val)
})
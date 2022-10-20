// setTimeout(function () {
//     console.log('One')
//     setTimeout(function () {
//         console.log('Two')
//         setTimeout(function () {
//             console.log('Three')
//             try {
//                 setTimeout(function () {
//                     throw new Error('Async error')
//                     console.log('Four')
//                 }, 3000)

//             } catch (error) {
//                 console.error('Error')
//             }
//         }, 1500)
//     }, 2000)
// }, 1000)

// EventEmitter
// someAsync.send('sdfsdf')
// someAsync.on('end', () => {})
// someAsync.on('error', () => {})

// pending
// fulfilled
// rejected
// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Message from resolve')
//     }, 2000)
//     setTimeout(() => {
//         reject('Error')
//     }, 1000)
// })

function delay(param, ms = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(param)
        }, ms)
    })
}

// Promise hell
// delay('One').then((message) => {
//     console.log(message);
//     return Promise.resolve('Two')
// }).then((message) => {
//     console.log(message);
//     return Promise.race([delay('One all'), delay('Two all', 2000)])
//     return delay('Three', 3000)
// }).then((message) => {
//     console.log(message);
//     return 'Four'
// }).then((message) => {
//     console.log(message);
// }).catch((message) => {
//     console.log(message);
// })

// async function test() {
//     try {
//         let message = await delay('One')
//         console.log(message);
//         // message = await Promise.reject('Error')
//         // throw new Error('Error')
//         console.log(message);
//         message = await delay('Three')
//         console.log(message);
//         return 'Some value'
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// test().then(message => {
//     console.log(message);
// })

// async function test2() {
//     const value = await test()
// }

// Promise
// fetch('/').then(function() {
//     console.log('Hello')
// })
// console.dir(promise)

function decoratorLogger(fn) {
    console.log('Decorator');
    return (...args) => {
        console.log(args)
        console.log('Logger');
        fn(...args)
    }
}

const testFunc = () => {
    console.log('testFunc')
}

const decoratedFunc = decoratorLogger(testFunc)

decoratedFunc(1,2,3)
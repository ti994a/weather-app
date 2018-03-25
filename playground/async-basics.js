console.log('starting app');

setTimeout(() => {
    console.log('inside of callback');
}, 2000);

setTimeout(() => {
    console.log('inside of callback, 0 ms timeout delay');
}, 0);

console.log('finishing app');

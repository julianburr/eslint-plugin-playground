const x = new Promise(resolve => setTimeout(resolve, 10));

x.then(() => {
  console.log('Hi there!');
});

function asyncFunction () {
  return new Promise(resolve => resolve());
}

async function test () {
  await asyncFunction();
  console.log('hello world');
}

x
  .then(() => {
    console.log('Hi there!');
  })
  .catch(() => {
    console.log('Hi not there!');
  });

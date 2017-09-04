const IDGenerator = require('../index');

const generator = new IDGenerator({
    prefix: '',    
    radix: 36,
    hash: false
});

const id = generator.generate();

console.log(id);
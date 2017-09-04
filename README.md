# ID Generator
An uncentralized id generator based on mac address, process id, timestamp and random numbers.

## INSTALLATION
```bash
npm install --save @byted/id-generator
```

## USAGE
```bash
const IDGenerator = require('@byted/id-generator');

const generator = new IDGenerator(options);
const id = generator.generate();
```
options
- prefix: prefix of id string, default to ''; 
- radix: an integer between 2 and 36 that represents the radix (the base in mathematical numeral systems) of id, default to 10;
- hash: true or false, return hased id if true, default to false.

## EXAMPLE
```bash
const IDGenerator = require('@byted/id-generator');

const generator = new IDGenerator({
    prefix: '',
    radix: 36,
    hash: false
});
const id = generator.generate();
```
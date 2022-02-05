# Node Data Cacher
Cache data through function call.

## Example
```
const {Cache} = require('node-data-cacher')

function dataFunction() {
    let data = 'hello'
    return data
}

Cache(dataFunction, 'data_type', Date.now() + 10000)
```
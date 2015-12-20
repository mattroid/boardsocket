// ignore css requires in tests with
// mocha --compilers css:./test/null.js
function noop () { return null }
require.extensions['.css'] = noop

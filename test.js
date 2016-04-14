import glob from 'glob'
import jsdom from 'jsdom'
import Mocha from 'mocha'
const mocha = new Mocha()

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = {userAgent: 'node.js'}

glob('src/**/test.js', (err, files) => {
  if (err) throw err
  files.forEach(file => {
    mocha.addFile(file)
  })
  mocha.reporter('spec').ui('tdd').run(failures => {
    process.on('exit', () => {
      process.exit(failures)
    })
  })
})

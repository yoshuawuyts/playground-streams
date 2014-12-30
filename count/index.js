
const es      = require('event-stream')
const split   = require('split')
const fs      = require('fs')
const path    = require('path')
const mapSync = es.mapSync

function count() {
  return mapSync(function(data) {
    return data.length
      ? 'chars: ' + data.length + '\t' + data + '\n'
      : undefined
  })
}

const fileName = path.resolve(__dirname, '../README.md')
fs.createReadStream(fileName, { encoding: 'utf-8' })
  .pipe(split())
  .pipe(count())
  .pipe(process.stdout)

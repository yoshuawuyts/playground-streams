
const join  = require('event-stream').join
const split = require('split')
const path  = require('path')
const fs    = require('fs')

const filePath = path.resolve(__dirname, '../README.md')
fs.createReadStream(filePath, { encoding: 'utf-8' })
  .pipe(split())
  .pipe(join('\n******\n'))
  .pipe(process.stdout)

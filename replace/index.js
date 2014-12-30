
const Stream = require('stream')
const es     = require('event-stream')

objectStream()
  .pipe(es.stringify())
  .pipe(tap())
  .pipe(es.parse())
  .pipe(padId())
  .pipe(es.stringify())
  .pipe(process.stdout)

// object stream
function objectStream() {
  var s       = new Stream()
  var objects = 0

  var iv = setInterval(ivFn, 20)

  return s

  function ivFn() {
    s.emit('data', { id: objects, created: new Date() })
    if (++objects != 3) return
    s.emit('end')
    clearInterval(iv)
  }
}

// tap
function tap() {
  return es.through(write)
  function write(data) {
    console.log('\n' + data)
    this.emit('data', data)
  }
}

// padId
function padId() {
  return es.mapSync(mapFn)
  function mapFn(obj) {
    obj.id = '000' + obj.id
    return obj
  }
}

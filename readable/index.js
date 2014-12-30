
const es = require('event-stream')

es.readable(tenSquares)
  .pipe(es.stringify())
  .pipe(process.stdout)

// ten squares
// @param {Number} count
// @param {Function} cb
// @return {Number}
function tenSquares(count, cb) {
  return count < 10
    ? cb(null, count * count)
    : this.emit('end')
}

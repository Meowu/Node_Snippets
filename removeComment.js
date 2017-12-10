
const readline = require('readline')
const fs = require('fs')

const fRead = fs.createReadStream('rule.vue')
const rl  = readline.createInterface({
  input: fRead,
  // output: process.stdout,
  // prompt: 'OHAI'
  crlfDelay: Infinity
})
// rl.prompt()
// fRead.on('data', () => {
//   console.log('Read.')
// })
rl.on('line', (line) => {
  // switch (line.trim()) {
  //   case 'hello':
  //     console.log('Node.js')
  //     break;
  //   default:
  //     console.log(`Say what? I might have heard '${line.trim()}'`)
  //     break;
  // }
  // rl.prompt()

  if (line.length === 0) return 
  const lineNumber = line.lastIndexOf('//')
  if (lineNumber === 0) {
    // line.splice(lineNumber)
    // console.log("skip");
  } else if (lineNumber > 0) {
    line = line.slice(0, lineNumber)
    console.log(line)
  } else {
    console.log(line)
  }
}).on('close', () => {
  console.log("Have a great day.")
  process.exit(0)
})

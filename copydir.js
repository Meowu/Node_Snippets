
const path = require('path')
const fs = require('fs')

function copy() {
  console.log("copy running...")
  const start = Date.now()
  const src = 'C:\\Users\\xiaojie\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets'
  const des = 'C:\\Users\\xiaojie\\wallpapers'
  
  console.log("start to read src dir...")
  fs.readdir(src, (err, files) => {
    if (err) throw err 
    // files.forEach((file, index) => {
    //   let asrc = path.join(src, file)
    //   let name = path.parse(asrc).name
    
    // })
    ;(function iterate(index) {
      if (index >= files.length) {
        const end = Date.now()
        console.log("copy done.")
        console.log(`consume ${end - start} ms.`)
        return
      }
      let asrc = path.join(src, files[index])
      let name = path.parse(asrc).name
      console.log(`copying file ${index+1}: ${name}`)
      fs.copyFile(asrc, path.resolve(des, `${name}.jpg`), (err) => {
        if (err) throw err
        iterate(index+1)
      })
    })(0)
  })
}

copy()
/**
 * 移除当前目录下的所有jpg图片，不递归。
 */

const path = require("path");
const fs = require("fs");

function remove() {
  const pwd = process.cwd();
  console.log("reading diretory...");
  fs.readdir(pwd, (err, files) => {
    if (err) throw err;
    console.log("read success.");
    //  console.log(files)
    (function iterate(index) {
      if (index === files.length) {
        console.log("delete done.");
        return;
      }
      const file = files[index];
      console.log(file);
      const extname = path.extname(file);
      console.log(extname);

      if (extname === ".jpg") {
        fs.unlink(file, err => {
          if (err) throw err;
          console.log(`deleting file ${index + 1}: ${file}`);
          iterate(index + 1);
        });
      } else {
        iterate(index + 1);
      }
    })(0);
  });
}
remove();

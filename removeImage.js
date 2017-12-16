/**
 * 移除当前目录下的所有指定格式图片，不递归。
 */

const path = require("path");
const fs = require("fs");

function remove(ext) {
  if (typeof ext !== 'string') {
    throw new Error('extention name must be string.')
    return 
  }
  const pwd = process.cwd();
  fs.readdir(pwd, (err, files) => {
    if (err) throw err;
    (function iterate(index) {
      if (index === files.length) {
        return;
      }
      const file = files[index];
      const extname = path.extname(file);
      if (extname === ext) {
        fs.unlink(file, err => {
          if (err) throw err;
          iterate(index + 1);
        });
      } else {
        iterate(index + 1);
      }
    })(0);
  });
}
remove();

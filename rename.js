
const fs = require('fs')
const path = require('path')

/**
 * 把某个文件夹下的文件重命名成指定的名字。
 * 这里是为了把sketch导出的图片后面的@2x去掉。
 */
function rename() {
	fs.readdir(process.cwd(), (err, files) => {
		if (err) throw err
		files.forEach((file, index) => {
			fs.stat(file, (err, stats) => {
				if (err) throw err
					if (stats.isFile()) {
						const basename = path.basename(file)
						console.log(`file ${index}: ${basename}`)
						if (basename.includes('@2x')) {
							let newname = basename.replace('@2x', '')
							console.log(newname)
							fs.rename(file, newname, (err) => {
								if (err) throw err
								console.log(`new file ${index}: ${newname}`)
							})
						}
			} 
			})
		})
		console.log("rename all.")
	})
}
rename()
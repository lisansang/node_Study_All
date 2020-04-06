// 自动生成router
const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')
module.exports = async () => {
    // 获取文件列表
    const list =
        fs.readdirSync('./src/views')
            .filter(item => item !== 'Home.vue')
            .map(item => ({
                name: item.replace('.vue', '').toLowerCase(),
                file: item
            }))

    // 生成路由定义 
    compile({ list }, './src/router.js', './template/router.js.hbs')

    // 生成菜单
    compile({ list }, './src/App.vue', './template/App.vue.hbs')

    /**
     * 编译模板文件
     * @param {*} meta 数据定义
     * @param {*} filePath 目标文件路径
     * @param {*} templatePath 模板文件路径
     */
    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString()
            const result = handlebars.compile(content)(meta)
            fs.writeFileSync(filePath, result)
        }
        console.log(chalk.green(`🚀创建${filePath}创建成功`));
    }
}
const fs = require('fs')
const path = require('path')
const { compile } = require('vue-template-compiler/build.js')
const template = fs.readFileSync('./test.vue','utf-8')
fs.readdir('./secs',  (err, files) => {
  let list = []
  let publicUrl = './secs/'
  files.forEach(fileName => {
    let url = publicUrl + fileName
    let template = compile(fs.readFileSync(url,'utf-8'), { preserveWhitespace: false }).ast
    list.push(JSON.safeStringify(template))
    // console.log(template)
    // console.log(JSON.stringify(template))
  })
  console.log(list)
})
// console.log(compile(template, { preserveWhitespace: false }).ast.children)

JSON.safeStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === "object" && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return retVal;
};
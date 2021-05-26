#!/usr/bin/env node

// 文件头

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Project name?",
    },
  ])
  .then((answers) => {
    // 模板地址
    const tmplDir = path.join(__dirname, "templates");
    // cmd地址
    const destDir = process.cwd();
    // 读取到文件名
    fs.readdir(tmplDir, (err, files) => {
      if (err) throw err;
      // 创建用户输入的文件名的文件
      fs.mkdir(`${destDir}/${answers.name}`, (err, projectFile) => {
        if (err) console.log(err);
        else files.forEach((file) => {
          // 根据地址用模板拼出要写入的代码
          ejs.renderFile(path.join(tmplDir, file), answers, (err, result) => {
            if (err) throw err;
            // 拼完的代码写入到cmd地址
              fs.writeFileSync(
                path.join(`${destDir}/${answers.name}`, file),
                result
              );
          });
        });
      });
    });
  });

# library
简介：是一个 monorepo(monolithic repositories)仓库。使用 [pnpm](https://www.pnpm.cn/) 包管理工具。

## 工程目录结构

```
├── build                         // 【 构建相关脚本 】
├── dist                          // 【 构建后代码 】
├── examples                      // 【 示例 】
    ├── public                        // - 静态资源
    ├── src                           // - 示例源码
├── packages                      // 【 所有包 】
    ├── components                    // - 组件
    ├── theme                         // - 样式
    ├── utils                         // - 工具方法
├── scripts                       // 【 发布脚本 】
├── typings                       // 【 类型定义 】
├── .editorconfig                 // 【 编辑器格式化配置 】
├── .eslintignore                 // 【 eslint忽略目录/文件 】
├── .gitignore                    // 【 git忽略目录/文件 】
├── README.md                     // 【 总项目 readme 文件 】
└── lerna.json                    // 【 lerna配置 】
└── package.json                  // 【 npm包配置 】

```

## 新建 package xxx

```
cd packages
mkdir xxx
cd xxx
pnpm init
```
## changelog 和 version 管理

changesets



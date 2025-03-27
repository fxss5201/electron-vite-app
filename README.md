# electron-vite-app

An Electron application with Vue and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## typeORM 数据迁移

需要将 `tsconfig.json` 修改为 `tsconfig.app.json` ，并将 `tsconfig-typeorm.json` 修改为 `tsconfig.json`（执行完了之后需要还原）。

### 生成迁移文件

1. 将 `./src/main/db/data-source.ts` 中的 database 改为 `database: './src/main/db/database.sqlite'`；
2. 执行 `npx typeorm-ts-node-commonjs migration:generate ./src/main/db/migration/data -d ./src/main/db/data-source.ts` 生成迁移文件。

### 执行迁移文件

1. 执行 `npx typeorm-ts-node-commonjs migration:run -d ./src/main/db/data-source.ts` 执行迁移文件。

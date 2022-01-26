// 异步启动
import type { IApi } from 'umi';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default (api: IApi) => {
  api.onGenerateFiles(() => {
    const path = api.env === 'production' ? './src/.umi/index.ts' : './src/.umi/umi.ts';
    const buffer = readFileSync(resolve(path));
    const c = String(buffer);
    api.writeTmpFile({
      path: 'index.ts',
      content: c,
    });
    api.writeTmpFile({
      path: 'umi.ts',
      content: 'import("./index")',
    });
  });
};

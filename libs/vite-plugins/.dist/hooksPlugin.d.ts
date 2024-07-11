export default function hooksPlugin({ rmFiles, // 字符串数组，包含要在构建开始时删除的文件或目录路径
afterBuild, // 构建完成后的回调函数（可选）
beforeBuild, }: {
    beforeBuild?: Function;
    afterBuild?: Function;
    rmFiles?: string[];
}): {
    name: string;
    buildStart(): void;
    buildEnd(err?: Error): void;
};

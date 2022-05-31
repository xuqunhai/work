// https: //www.jianshu.com/p/211280b5d70d

// 第一次加载某个模块时，Node 会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports属性。

// 所有缓存的模块保存在require.cache之中，如果想删除模块的缓存

// 如果发生模块的循环加载，即 A 加载 B，B 又加载 A，则 B 将加载 A 的不完整版本。
// 第二次加载 a.js 和 b.js 时，会直接从缓存读取 exports 属性
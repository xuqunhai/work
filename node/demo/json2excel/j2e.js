/* 需要导出的JSON数据 */
var data = [
    {"name":"John", "city": "Seattle"},
    {"name":"Mike", "city": "Los Angeles"},
    {"name":"Zach", "city": "New York"}
];

/* 如果没有导入xlsx组件则导入 */
if(typeof XLSX == 'undefined') XLSX = require('xlsx');

/* 创建worksheet */
var ws = XLSX.utils.json_to_sheet(data);

/* 新建空workbook，然后加入worksheet */
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "People");

/* 生成xlsx文件 */
XLSX.writeFile(wb, "sheetjs.xlsx");


// 自动化工具来完成
// https://segmentfault.com/a/1190000023007443
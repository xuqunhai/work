　// el-upload组件中绑定的changeFile
function changeFile(file) {
    let f = file.raw;
    let reader = new FileReader();
    reader.readAsBinaryString(f);
    reader.onload = function (e) {
      let data = e.target.result;
      if(typeof XLSX == 'undefined') XLSX = require('xlsx');
      let wb = XLSX.read(data, { type: 'binary' });
      let json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      console.log(json)
    };
  };

if(typeof require !== 'undefined') XLSX = require('xlsx');
const path = require('path')
const xlsPath = path.join(__dirname, './sheetjs.xlsx')
var workbook = XLSX.readFile(xlsPath);
var sheet_name_list = workbook.SheetNames;

sheet_name_list.forEach(function(y) { /* iterate through sheets */
  console.log('y', y) // Sheet1
  var worksheet = workbook.Sheets[y];

  // const jsonData = JSON.stringify( XLSX.utils.sheet_to_json(worksheet) ); // 得到json字符串
  const jsonData = XLSX.utils.sheet_to_json(worksheet); // 得到json数组
  console.log('jsonData', jsonData);
 })

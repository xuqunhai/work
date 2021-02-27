// 
// 
class Search {
    // ES7
    static num = 10;
    // ES6
    // static num () {
    //     return 6;
    // }
    constructor () {
        this.keyValue = '';
    }
    @readOnly
    // ES7 私有属性 定义方式
    url = 'urlA-';
    getCount () {
        console.log('发送请求');
    }
};

var oS = new Search();
console.log(oS);
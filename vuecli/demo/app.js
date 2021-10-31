const inquirer = require("inquirer");

/*
inquirer.prompt([
    {
        type:"input",
        message:"请输入你的姓名：",
        name:"name",
        default:"大傻子"
    },
    // {
    //     type:"input",
    //     message:"请输入你的年龄:",
    //     name:"age",
    //     default:18
    // },
    {
        type:"input",
        message:"请输入你的年龄：",
        name:"age",
        default:18,
        validate:(val)=>{
            if(val > 10 && val < 120){
                // input validate 那里应该return true ，不然无法往下走了
                return true;
            }else{
                return "我猜你绝对不是一个正常人类";
            }
        }
    }
]).then(answer=>{
    // 用户输入的结果最终会在这里输出
    console.log(answer);
});
*/

/*
inquirer.prompt([
    {
        type:"confirm",
        message:"是否现在监听？",
        name:"watch",
        default:true,
        prefix:"☆☆☆☆"//前缀
    },
    {
        type: "confirm",
        message: "是否能看到我取决于上面是否通过？",
        name: "pass",
        suffix: "后缀",
        when: function(answer) { // 当watch为true的时候才会到达这步
            return answer.watch//只有我return true才会这个confirm
        }
    }
]).then(answer=>{
    // 用户输入的结果最终会在这里输出
    console.log(answer);
});
*/

/*
inquirer.prompt([
    {
        type:"list",
        message:"请选择一个选项：",
        name:"fruit",
        default:"Apple",
        prefix:"☆☆☆☆",
        suffix:"****",
        choices:[
            "Apple",
            "pear",
            "Banana"
        ],
        filter: function (val) { // 使用filter将值变为大写
            return val.toUpperCase();
        }
    }
]).then(answer=>{
    console.log(answer);
});
*/

/*
inquirer.prompt([
    {
        type:"rawlist",
        message:"请选择一个选项：",
        name:"fruit",
        default:"Apple",
        prefix:"☆☆☆☆",
        suffix:"****",
        choices:[
            "Apple",
            "pear",
            "Banana"
        ],
        filter: function (val) { // 使用filter将值变为大写
            return val.toUpperCase();
        }
    }
]).then(answer=>{
    console.log(answer);
});
*/

/*
inquirer.prompt([
    {
        type:"expand",
        message:"请选择一个颜色：",
        name:"color",
        default:"red",
        choices:[
            {
                key : 'R',
                value : "red"
            },
            {
                key : 'B',
                value : "blue"
            },
            {
                key : 'G',
                value : "green"
            }
        ]
    }
]).then(answer=>{
    console.log(answer);
});
*/

/*
inquirer.prompt([
    {
        type:"checkbox",
        message:"选择一至多种颜色：",
        name:"color",
        // choices:[
        //     "red",
        //     "blue",
        //     "green",
        //     "pink",
        //     "orange"
        // ],
        choices:[
            {
                name : "red"
            },
            new inquirer.Separator(), // 添加分隔符
            {
                name : "blue"
            },
            {
                name : "green"
            },
            {
                name : "pink",
                checked : true//默认
            },
            new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
            {
                name : "orange"
            }
        ]
    }
]).then(answer=>{
    console.log(answer);
});
*/

/*
inquirer.prompt([
    {
        type:"password",
        message:"请输入你的密码：",
        name:"pwd"
    }
]).then(answer=>{
    console.log(answer);
});
*/

/*
inquirer.prompt([
    {
        type:"number",
        message:"请输入数字：",
        name:"num"
    }
]).then(answer=>{
    console.log(answer);
});
*/

inquirer.prompt([
    {
        type:"editor",
        message:"写下你想写的东西：",
        name:"editor"
    }
]).then(answer=>{
    console.log(answer);
});
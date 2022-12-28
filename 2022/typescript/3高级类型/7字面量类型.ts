type Profession0 = 'teacher';

type Profession = "teacher" | "doctor" | "accountant"
// 只能从三种允许的字符串中选择一种作为参数使用
function personCreator(profession: Profession) {

}
personCreator('teacher')
personCreator('doctor')
personCreator('accountant')
// personCreator('programmer') // 类型“"programmer"”的参数不能赋给类型“Profession”的参数。

{
  // 数字字面量
  function getAge(): 1 | 2 | 3 {
    return 3
  }
}
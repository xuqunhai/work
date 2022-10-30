{
  interface Teacher {
    teach(): void
  }
  interface Student {
    learn(): void
  }
  function getPerson(): Teacher | Student {
    return {} as Teacher
  }

  const person = getPerson();
  // person.teach(); // 类型“Student”上不存在属性“teach”。
  // person.learn(); // 类型“Teacher”上不存在属性“learn”。

  // 必须写上类型断言，但很麻烦
  (<Teacher>person).teach();
  (person as Student).learn();

  // 所以有了类型保护
}

// 类型保护
{
  interface Teacher {
    teach(): void
  }
  interface Student {
    learn(): void
  }
  function getPerson2(): Teacher | Student {
    return {} as Teacher
  }
  const person = getPerson2()

  // 类型保护，person is Teacher 就是类型保护语句
  function isTeacher(person: Teacher | Student): person is Teacher {
    return (person as Teacher).teach !== undefined
  }
  if (isTeacher(person)) {
    person.teach()
  } else {
    person.learn()
  }
}

// 类型保护2
{
  interface Man {
    isHandsome(): void
  }
  interface Woman {
    isBeautiful(): void
  }
  function getPerson3(): Man | Woman {
    return {} as Man
  }
  const person = getPerson3()
  function isMan(person: Man | Woman): person is Man {
    return (person as Man).isHandsome !== undefined
  }

  if (isMan(person)) {
    person.isHandsome()
  } else {
    person.isBeautiful()
  }
}
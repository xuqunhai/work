{
  const fs = require('fs')
  function loadJSONSync(filePath: string) {
    // 忽略一些可能异常，如文件不存在，文件内容不是有效json
    return JSON.parse(fs.readFileSync(filePath))
  }
  console.log(loadJSONSync('test.json'))
}

/** 可解析为T类型的JSON字符串 */
interface JSONString<T> extends String {
  _: never // 首先给JSONString增加一个never类型的字段，使之不能被一般字符串赋值。
}

// 通过声明合并的方式，覆盖原始的JSON声明，让JSONString这个类型只在JSON.stringify和JSON.parse之间流转，
// 这就完美得保证了JSONString的类型安全
interface JSON {
  stringify<T>(value: T): JSONString<T>
  parse<T>(text: JSONString<T>): T
}

{
  const fs = require('fs');
  function loadJSON(filePath: string, callback: (error: Error | null, data?: any) => void) {
    fs.readFile(filePath, function (e: Error, data: string) {
      if (e) {
        callback(e);
      } else {
        // try {
        //   callback(null, JSON.parse(data));
        // } catch (err) {
        //   callback(err);
        // }
        let result;
        try {
          result = JSON.parse(data)
        } catch (err: any) {
          callback(err);
        }
        callback(null, result);
      }
    })
  }
}

// 使用promise
{
  // 1创建promise
  const promise = new Promise((resolve, reject) => { })
}

{
  // 2使用then/catch订阅,then和catch返回的都是一个新的promise
  const promise1 = new Promise((resolve, reject) => {
    resolve(111)
  })
  const promise2 = new Promise((resolve, reject) => {
    reject(new Error('something incorrect'))
  })
  promise1.then(res => console.log(res))
  promise2.catch(err => console.log(err))

}

{
  // promsie链式性
  Promise.resolve(222).then(res => {
    console.log(res);
    return 333
  }).then(res => {
    console.log(res)
    return Promise.resolve(444)
  }).then(res => {
    console.log(res);
    return Promise.resolve(555)
  })

  Promise.reject(new Error('incorrect')).then(res => {
    console.log(res)
    return 22
  }).then(res => {
    console.log(res)
    return Promise.resolve(33)
  }).then(res => {
    console.log(res)
    return Promise.resolve(44)
  }).catch(err => console.log(err.message)) // catch仍然会返回一个新的promsie对象
}

// ts和promise
{
  const fs = require('fs')
  function readFileAsync(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (error: Error, result: string) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }
  function loadJSONAsync(filePath: string): Promise<any> {
    return readFileAsync(filePath).then(result => JSON.parse(result))
  }

  loadJSONAsync('test.json').then(result => console.log(result)).catch(err => console.log(err));

}

// 并行控制流
{
  function fetchUserInfo(userId: string): Promise<{}> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ userId })
      }, 1000)
    })
  }
  function fetchCartInfo(userId: string): Promise<{}> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ userId })
      }, 1200)
    })
  }
  function fetchGoodInfo(goodId: string): Promise<{}> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ goodId })
      }, 1500)
    })
  }

  Promise.all([fetchUserInfo("1"), fetchCartInfo("2"), fetchGoodInfo("3")]).then(res => console.log(res));

}

// async await
{

}

// 重载
{

}

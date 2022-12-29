// npm install -D husky # 安装husky
// npx husky install    # 初始化husky
// # 新增commit msg钩子
// npx husky add .husky/commit-msg "node scripts/verifyCommit.js"

// 执行 git commit 的同时，就会首先进行 ESLint 校验，然后执行 commit 的 log 信息格式检查，全部通过后代码才能提交至 Git，
// npx husky add .husky/pre-commit "npm run lint"

const msg = require('fs').readFileSync('.git/COMMIT_EDITMSG', 'utf-8').trim()

const commitRE =
  /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/
const mergeRe = /^(Merge pull request|Merge branch)/
if (!commitRE.test(msg)) {
  if (!mergeRe.test(msg)) {
    console.log('git commit信息校验不通过')

    console.error(`git commit的信息格式不对, 需要使用 title(scope): desc的格式
      比如 fix: xxbug
      feat(test): add new 
      具体校验逻辑看 scripts/verifyCommit.js
    `)
    process.exit(1)
  }
} else {
  console.log('git commit信息校验通过')
}

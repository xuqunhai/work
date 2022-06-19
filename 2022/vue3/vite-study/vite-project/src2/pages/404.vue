<template>
  <div>
    <el-result icon="warning" title="404Not Found" sub-title="页面找不到了～">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>
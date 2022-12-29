<template>
  <div></div>
</template>

<script setup>
function handleLogin() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      const { code, message } = await useStore.login(loginForm)
      loading.value = false
      if (code === 0) {
        router.replace(toPath || '/')
      } else {
        message({
          message: '登录失败',
          type: 'error'
        })
      }
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped></style>

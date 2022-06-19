<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="flex items-center justify-center flex-col">
      <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
      <div class="text-gray-200 text-sm">此站点是视频课程跟随的项目，自己手写，加深学习！</div>
    </el-col>
    <el-col :lg="8" :md="12" class="bg-light-50 flex items-center justify-center flex-col">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form ref="formRef" :model="form" class="w-[250px]" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="username">
            <template #prefix>
              <el-icon>
                <user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="password">
            <template #prefix>
              <el-icon>
                <lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button round color="#626aef" class="w-[250px]" type="primary" :loading="loading" @click="onSubmit">login</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue';
// import { User, Lock } from '@element-plus/icons-vue';
import { login, getinfo } from '~/api/manager';
import { ElNotification } from 'element-plus';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useRouter } from 'vue-router';
const router = useRouter();

// do not use same name with ref
const form = reactive({
  username: '',
  password: ''
});

const formRef = ref();
const loading = ref(false);

const rules = {
  username: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  password: [{ required: true }]
};

const onSubmit = () => {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
      loading.value = true;
      login(form.username, form.password)
        .then((res) => {
          console.log('login res', res);
          const cookie = useCookies();
          cookie.set('admin-token', res.token);
          ElNotification({
            message: 'login success',
            type: 'success',
            duration: 2000
          });
          getinfo().then((res) => console.log('getinfo res', res));
          router.push('/');
        })
        .finally((_) => (loading.value = false));
    } else {
      console.log('login error submit!', fields);
    }
  });
};
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;
}
</style>
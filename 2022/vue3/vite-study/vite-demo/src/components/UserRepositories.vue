<script>
// 组件开始变得更大时，逻辑关注点的列表也会增长。会导致组件难以阅读和理解。
// 选项的分离掩盖了潜在的逻辑问题。
// 处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      repositories: [], // 1 显示某个用户的仓库列表
      filters: {}, // 3 筛选功能
      searchQuery: '' // 2 搜索
    };
  },
  computed: {
    filteredRepositories() {}, // 3
    repositoriesMatchingSearchQuery() {} // 2
  },
  watch: {
    user: 'getUserRepositories' // 1 在用户有任何更改时进行刷新
  },
  methods: {
    getUserRepositories() {
      // 外部 API 获取该用户的仓库
      // 使用 `this.user` 获取用户仓库
    }, // 1
    updateFilters() {} // 3
  },
  mounted() {
    this.getUserRepositories(); // 1
  }
};
</script>

<script>
import { fetchUserRepositories } from '@/api/repositories';
import { ref, onMounted, watch, toRefs, computed } from 'vue';
// 使用组合式 API，我们首先需要一个可以实际使用它的地方。在 Vue 组件中，我们将此位置称为 setup。
// 新的 setup 选项在组件被创建之前执行，一旦 props 被解析完成，
// 在 setup 中你应该避免使用 this，因为它不会找到组件实例。
// setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。
// 接收 props 和 context 的函数
// 将 setup 返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(props); // { user: '' }
    // 使用 `toRefs` 创建对 `props` 中的 `user` property 的响应式引用
    // 确保我们的侦听器能够根据 user prop 的变化做出反应。
    const { user } = toRefs(props);

    // repositories 变量是非响应式的。这意味着从用户的角度来看，仓库列表将始终为空。
    // let repositories = [];
    const repositories = ref([]);
    // 可以通过一个新的 ref 函数使任何响应式变量在任何地方起作用
    // ref 接收参数并将其包裹在一个带有 value property 的对象中返回
    const counter = ref(0);
    console.log(counter); // { value: 0 } 将值封装在一个对象中，看似没有必要，但为了保持 JavaScript 中不同数据类型的行为统一，这是必须的。
    // 因为在 JavaScript 中，Number 或 String 等基本类型是通过值而非引用传递的：
    // 在任何值周围都有一个封装对象，这样我们就可以在整个应用中安全地传递它，而不必担心在某个地方失去它的响应性。
    // ref 为我们的值创建了一个响应式引用。
    console.log(counter.value); // 0
    // 参数，它是一个类似 getter 的回调函数，输出的是一个只读的响应式引用。
    const twiceTheCounter = computed(() => counter.value * 2);
    counter.value++;
    console.log(counter.value); // 1
    console.log(twiceTheCounter.value); // 2

    // 想要侦听的响应式引用或 getter 函数
    watch(counter, (newValue, oldValue) => {
      console.log('The new counter value is: ' + counter.value);
    });

    const getUserRepositories = async () => {
      // repositories = await fetchUserRepositories(props.user);
      repositories.value = await fetchUserRepositories(props.user);
    };
    // 在 setup 中注册生命周期钩子的方法。
    // 组合式 API 上的生命周期钩子与选项式 API 的名称相同，但前缀为 on
    // 接受一个回调，当钩子被组件调用时，该回调将被执行。
    onMounted(getUserRepositories); // 在 `mounted` 时调用 `getUserRepositories`

    // 在 user prop 的响应式引用上设置一个侦听器
    watch(user, getUserRepositories);

    const searchQuery = ref('');
    const repositoriesMatchingSearchQuery = computed(() => {
      return repositories.value.filter((repository) => repository.name.includes(searchQuery.value));
    });

    return {
      repositories,
      getUserRepositories // 返回的函数，它的行为与将其定义在 methods 选项中的行为相同
    }; // 这里返回的任何内容都可以用于组件的其余部分
  },
  data() {
    return {
      searchQuery,
      repositoriesMatchingSearchQuery,
      filters: {}, // 3
      searchQuery: '' // 2
    };
  },
  computed: {
    filteredRepositories() {}, // 3
    repositoriesMatchingSearchQuery() {} // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    updateFilters() {} // 3
  },
  mounted() {
    this.getUserRepositories(); // 1
  }
  // 组件的“其余部分”
};
</script>

<script>
import useUserRepositories from '@/composables/useUserRepositories';
import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch';
import useRepositoryFilters from '@/composables/useRepositoryFilters';

import { toRefs } from 'vue';
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { user } = toRefs(props);
    const { repositories, getUserRepositories } = useUserRepositories(user);
    const { searchQuery, repositoriesMatchingSearchQuery } = useRepositoryNameSearch(repositories);
    const { filters, updateFilters, filteredRepositories } = useRepositoryFilters(repositoriesMatchingSearchQuery);
    return {
      // 因为我们并不关心未经过滤的仓库
      // 我们可以在 `repositories` 名称下暴露过滤后的结果
      repositories: repositoriesMatchingSearchQuery,
      getUserRepositories,
      searchQuery,
      filters,
      updateFilters
    };
  },
  data() {
    return {
      filters: {} // 3
    };
  },
  computed: {
    filteredRepositories() {} // 3
  },
  methods: {
    updateFilters() {} // 3
  }
};
</script>
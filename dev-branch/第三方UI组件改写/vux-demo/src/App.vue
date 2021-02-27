<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <hr>
    <h2>vux component range</h2>
    <div class="rangBox">
      <range
        :rangeHandleHeight="rangeHandleHeight"
        :rangeBarHeight="rangeBarHeight"
        :step="1"
        :max="5"
        :customOptions="customOptions"
        v-model="data13" v-show="showData13"
        @on-touchstart="touchRange"
        @on-touchend="leaveRange"
      ></range>
    </div>
    <hr>
    <h2>vux component tab</h2>
    <!-- <tab>
      <tab-item selected @on-item-click="onItemClick">已发货</tab-item>
      <tab-item @on-item-click="onItemClick">未发货</tab-item>
      <tab-item @on-item-click="onItemClick">全部订单</tab-item>
    </tab>
    <br/>
    <tab bar-position="top">
      <tab-item selected @on-item-click="onItemClick">已发货</tab-item>
      <tab-item @on-item-click="onItemClick">未发货</tab-item>
      <tab-item @on-item-click="onItemClick">全部订单</tab-item>
    </tab>
    <br/>
    <br/>
    <h2>手动切换</h2>
    <tab v-model="index01" prevent-default @on-before-index-change="switchTabItem">
      <tab-item selected>已发货</tab-item>
      <tab-item>未发货</tab-item>
      <tab-item>全部订单</tab-item>
    </tab>
    <br/>
    <h2>定义bar固定宽度</h2>
    <tab :line-width="1" custom-bar-width="60px">
      <tab-item selected>已发货</tab-item>
      <tab-item>未发货</tab-item>
      <tab-item>全部订单</tab-item>
    </tab>
    <br/>
    <h2>使用函数定义bar宽度</h2>
    <tab :line-width="1" :custom-bar-width="getBarWidth">
      <tab-item selected>AA</tab-item>
      <tab-item>AAAA</tab-item>
      <tab-item>AAAAAAA</tab-item>
    </tab>
    <br/>
    <tab bar-active-color="#668599" :line-width="1">
      <tab-item>已发货</tab-item>
      <tab-item selected>未发货</tab-item>
      <tab-item>全部订单</tab-item>
      <tab-item>全部订单</tab-item>
      <tab-item>全部订单</tab-item>
    </tab>
    <br/>
    <h2>different active class</h2>
    <tab :animate="false">
      <tab-item active-class="active-6-1">已发货</tab-item>
      <tab-item active-class="active-6-2" selected>未发货</tab-item>
      <tab-item active-class="active-6-3">全部订单</tab-item>
    </tab>
    <br/>
    <h2>no animation</h2>
    <tab :animate="false">
      <tab-item>已发货</tab-item>
      <tab-item selected>未发货</tab-item>
      <tab-item>全部订单</tab-item>
    </tab>
    <br/>
    <h2>disabled</h2>
    <tab>
      <tab-item selected>A</tab-item>
      <tab-item>B</tab-item>
      <tab-item disabled>Disabled</tab-item>
    </tab> -->
    <br/>
    <h2>tab-item badge</h2>
    <tab>
      <tab-item selected badge-label="1">收到的消息</tab-item>
      <tab-item badge-background="#38C972" badge-color="#fff" badge-label="2">发出的消息</tab-item>
    </tab>
    <br/>
    <h3>tab-item badge diffTab</h3>
    <div class="diffTabBox">
      <tab :diffTab="diffTab">
        <tab-item selected badge-label="1">收到</tab-item>
        <tab-item badge-background="#38C972" badge-color="#fff" badge-label="2">发出</tab-item>
      </tab>
    </div>
    <br/>
    <h2>scroll</h2>
    <tab>
      <tab-item v-for="n in 8" :key="n" :selected="n===1">已发货{{ n }}</tab-item>
    </tab>
    <br/>
    <h3>tab-item scroll diffTab</h3>
    <div class="diffTabBox">
      <tab :diffTab="diffTab">
        <tab-item v-for="n in 8" :key="n" :selected="n===1">已发货{{ n }}</tab-item>
      </tab>
    </div>
    <br>
    <h2>scroll threshold</h2>
    <tab :scroll-threshold="5">
      <tab-item v-for="n in 5" :key="n" :selected="n===1">已发货{{ n }}</tab-item>
    </tab>
    <br/>
    <tab :line-width="2">
      <tab-item :selected="demo3 === item" v-for="(item, index) in list3" :class="{'vux-1px-r': index===0}" @click="demo3 = item" :key="index">{{item}}</tab-item>
    </tab>
    <hr>
    <h2>vux component timeline</h2>
    <div>
      <timeline>
        <timeline-item>
          <h4 class="recent">【广东】 广州市 已发出</h4>
          <p class="recent">2016-04-17 12:00:00</p>
        </timeline-item>
        <timeline-item>
          <h4> 申通快递员 广东广州 收件员 xxx 已揽件</h4>
          <p>2016-04-16 10:23:00</p>
        </timeline-item>
        <timeline-item>
          <h4> 商家正在通知快递公司揽件</h4>
          <p>2016-04-15 9:00:00</p>
        </timeline-item>
      </timeline>
      <timeline>
        <timeline-item v-for="(i, index) in count" :key="index">
          <h4 :class="[i === 0 ? 'recent' : '']">Timeline Node {{i + 1}}</h4>
          <p :class="[i === 0 ? 'recent' : '']">index {{i + 1}}</p>
        </timeline-item>
      </timeline>
    </div>
    <br/>
    <hr>
    <h2>vux component x-circle</h2>
    <hr>
    <h4>0%    stroke-dashoffset: 298.451px;</h4>
    <h4>100%    stroke-dashoffset: 0;</h4>
    <h4>顺时针</h4>
    <h5>想象一下，顺时针表示红色虚线一开始在右边，慢慢往左边移动，所以一开始为正数，慢慢往0靠近</h5>
    <div style="width:150px;height:150px;">
      <x-circle
        :percent="percent"
        :stroke-width="5"
        stroke-color="#f00">
        <span>{{ percent }}%</span>
      </x-circle>
    </div>
    <br>
    <h6>gap: {{gap}}</h6>
    <div style="width:150px;height:150px;">
      <x-circle
        :gap="gap"
        :percent="percent"
        :stroke-width="4"
        :trail-width="4"
        stroke-color="#f00">
        <span>{{ percent }}%</span>
      </x-circle>
      <br>
    </div>
    <div style="width:150px;height:150px;">
      <x-circle
        anticlockwise
        :gap="gap"
        :percent="percent"
        :stroke-width="4"
        stroke-color="#f00">
        <span>{{ percent }}%</span>
      </x-circle>
    </div>
    <br>
    <div class="circle-demo-range">
      <range v-model="percent" :min="0" :max="100"></range>
    </div>
    <br>
    <hr>
    <h3>anticlockwise</h3>
    <h4>0%    stroke-dashoffset: -298.451px;</h4>
    <h4>100%    stroke-dashoffset: 0;</h4>
    <h4>逆时针</h4>
    <h5>想象一下，从0处切断圆，变成线段，线段向右为正向，逆时针表示一开始实线在0左边，然后慢慢向右移动出现，卷成圆时就是逆时针</h5>
    <div style="width:150px;height:150px;">
      <x-circle
        :percent="percent"
        :stroke-width="5"
        stroke-color="#0f0"
        anticlockwise>
        <span>{{ percent }}%</span>
      </x-circle>
    </div>
    <br>
    <div style='width:100px;height:100px;'>
      <x-circle
        :percent="percent"
        :stroke-width="6"
        :trail-width="6"
        :stroke-color="['#36D1DC', '#5B86E5']"
        trail-color="#00f">
        <span style="color:#36D1DC">{{ percent }}%</span>
      </x-circle>
    </div>
    <br>
    <hr>
    <br>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
// import { Range } from 'vux'
// import { Tab, TabItem } from 'vux'
import { Icon } from 'vux'
import Range from './components/range/index'
import Popup from './components/popup/index'
import XCircle from './components/x-circle/index'
import { Tab, TabItem } from './components/tab/index'
import { Timeline, TimelineItem } from './components/timeline/index'

export default {
  name: 'app',
  data () {
    return {
      diffTab: true,
      gap: 80,
      percent: 50,
      count: 3,
      list3: ['收到的消息', '发出的消息'],
      demo3: '收到的消息',
      getBarWidth: function (index) {
        return (index + 1) * 22 + 'px'
      },
      index01: 0,
      msg: 'Welcome to Your Vue.js App',
      data13: 0,
      showData13: true,
      rangeHandleHeight: 30,
      rangeBarHeight: 5,
      disabled: true,
      customOptions: {
        hideRange: true, // 是否隐藏左右两侧的最大最小值标尺
        isAlignCircleCenter: true, // 圆球中心是否对齐左右两端
        isShowCurValue: true, // 是否显示toast
        isAlignLR: true, // toast左右两侧是否对齐
        isCircleActive: true,
      },
    }
  },
  components: {
    Range,
    Tab,
    TabItem,
    Timeline,
    TimelineItem,
    XCircle,
    Popup,
  },
  methods: {
    switchTabItem (index) {
      console.log('on-before-index-change', index)
      this.$vux.loading.show({
        text: 'loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.index01 = index
      }, 1000)
    },
    onItemClick (index) {
      console.log('on item click:', index)
    },
    touchRange() {
      // console.log('touchRange');
    },
    leaveRange() {
      // console.log('leaveRange');
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

// li {
//   display: inline-block;
//   margin: 0 10px;
// }

a {
  color: #42b983;
}
</style>
<style lang="less">
@import './components/range/reset.less';
@import './components/styles/1px.less';
.rangBox {
  width: 880px;
  margin: 30px;
  padding: 100px 0;
  border: 1px solid;
}
.rangBox .range-handle {
  background-color: red;
}

.diffTabBox {
  .vux-tab .vux-tab-item:nth-child(1) {
    flex: 0 0 35%;
  }
  .vux-tab .vux-tab-item:nth-child(2) {
    flex: 0 0 30%;
  }
  .vux-tab .vux-tab-item:nth-child(3) {
    flex: 0 0 16%;
  }
  .vux-tab .vux-tab-item:nth-child(5) {
    flex: 0 0 25%;
  }
  .vux-tab .vux-tab-item:nth-child(6) {
    flex: 0 0 35%;
  }
  .vux-tab .vux-tab-item:nth-child(7) {
    flex: 0 0 50%;
  }
}
</style>
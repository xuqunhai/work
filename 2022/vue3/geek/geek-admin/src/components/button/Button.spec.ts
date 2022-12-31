
import Button from './Button.vue'
// 可以在命令行里模拟 Vue 的组件渲染
import { mount } from '@vue/test-utils'
describe('按钮测试', () => {
  it('按钮能够显示文本', () => {
    const content = '大圣小老弟'
    // 在 Button 的 slot 传递了文本之后，wrapper.text() 就能获取到文本内容，然后对 Button 渲染结果进行判断。
    const wrapper = mount(Button, {
      slots: {
        default: content
      }
    })
    expect(wrapper.text()).toBe(content)
  })
  it('通过size属性控制大小', () => {
    const size = 'small'
    const wrapper = mount(Button, {
      props: {
        size
      }
    })
    // size内部通过class控制
    expect(wrapper.classes()).toContain('el-button--small')
  })

})
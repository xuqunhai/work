module.exports = {
  name: 'ELEMENT',
  url: '',
  style: '',
  components: [
    {
      name: 'Button',
      title: '按钮',
      image: '',
      property: [
        {
          name: 'size',
          title: '尺寸',
          type: 'enum',
          values: [
            { label: '中', value: 'medium' },
            { label: '小', value: 'small' },
            { label: '迷你', value: 'mini' }
          ]
        },
        {
          name: 'type',
          title: '类型',
          type: 'enum',
          values: [
            { label: 'primary', value: 'primary' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
            { label: 'info', value: 'info' },
            { label: 'text', value: 'text' }
          ]
        },
        {
          name: 'plain',
          title: '是否朴素按钮',
          type: 'switch'
        },
        {
          name: 'round',
          title: '是否圆角按钮',
          type: 'switch'
        },
        {
          name: 'circle',
          title: '是否圆形按钮',
          type: 'switch'
        },
        {
          name: 'loading',
          title: '是否加载中状态',
          type: 'switch'
        },
        {
          name: 'disabled',
          title: '是否禁用按钮',
          type: 'switch'
        },
        {
          name: 'icon',
          title: '图表类名',
          type: 'switch'
        },
        {
          name: 'autofocus',
          title: '是否默认聚焦',
          type: 'switch'
        },
        {
          name: 'native-type',
          title: '原生 type 属性',
          type: 'enum',
          values: [
            { label: '按钮', value: 'button' },
            { label: '提交', value: 'submit' },
            { label: '重置', value: 'reset' }
          ]
        }
      ]
    },
    {
      name: 'Radio',
      title: '单选',
      image: '',
      property: [
        {
          name: 'label',
          title: '值',
          type: 'text'
        },
        {
          name: 'disabled',
          title: '禁用',
          type: 'switch'
        }
      ]
    }
  ]
};

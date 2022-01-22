import './editorPanel.less';
import Vue from 'vue';
import utils from 'utils';
import ComponentTree from 'components/platform/common/ComponentTree';
let cache = {};
let history = [];

export default {
  name: 'editor-panel',
  props: {
    modelData: {
      type: Object,
      require: false
    },
    comsData: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      showMode: 'skeleton',
      currentDrop: {},
      bodyStyle: {},
      modelId: utils.getQueryString('modelId'),
      treeData: {},
      isMenu: true
    };
  },
  created() {
    this.componentsTree = new ComponentTree();
    eventHub.$on('xp-com-property-change', (cid, data) => {
      this.componentsTree.updateProps(cid, data);
      this.updateTreeData();
    });
    eventHub.$on('xp-com-body-property-change', (data) => {
      this.componentsTree.treeData.props = { ...data };
      this.updateTreeData();
    });
    eventHub.$on('xp-com-copy', (data) => {
      history.unshift(JSON.parse(JSON.stringify(this.treeData)));
      let cur = this.componentsTree.copy(this.$root.curComData.cid);
      this.componentsTree.insertComponent(this.$root.curComData.cid, cur);
    });
    eventHub.$on('xp-com-delete', (data) => {
      history.unshift(JSON.parse(JSON.stringify(this.treeData)));
      let cur = this.$root.curComData;
      this.componentsTree.removeComponent(cur.cid);
      this.updateTreeData();
    });
    eventHub.$on('xp-com-rename', (name) => {
      history.unshift(JSON.parse(JSON.stringify(this.treeData)));
      let cur = this.componentsTree.find(this.$root.curComData.cid);
      node.title = name;
    });
    eventHub.$on('xp-set-global-data', (name) => {});
  },
  render(h) {
    let me = this;
    this.$root.modelData = me.componentsTree.treeData;
    return (
      <div class="editorPanel" ref="editorPanel">
        <div class="top-tool">
          <span class="group-btn">
            <span mode="skeleton" class={me.showMode === 'skeleton' ? 'on' : ''} on-click={this.viewChange}>
              骨架视图
            </span>
          </span>
        </div>
      </div>
    );
  },
  mounted() {
    document.addEventListener('contextmenu', (e) => {
      // let tar=e.target;
      // if(tar.getAttribute('data-cid')){
      //     e.preventDefault()
      //     me.$refs.menu.style.display='block'
      //     me.$refs.menu.style.left=(e.pageX-rect.left+30)+'px'
      //     me.$refs.menu.style.top=(e.pageY-rect.top+50)+'px'
      // }else{
      //     me.$refs.menu.style.display='none'
      // }
    });
  },
  methods: {
    doRender() {
      if (this.showMode === 'skeleton') {
        return <div ref="skep" class="skeletonPanel" on-click={this.showBodyProperty}></div>;
      }
    },
    insert(e) {
      e.preventDefault();
      e.stopPropagation();
      var me = this;
      let cur = e.currentTarget;
      let cid = cur.getAttribute('data-cid');
      let exist = e.dataTransfer.getData('mod-exist');
      let path = e.dataTransfer.getData('mod-path');
      let ocid = e.dataTransfer.getData('mod-cid');
      let modName = e.dataTransfer.getData('mod-name');
      if (exist && cid) {
        me.componentsTree.prependComponent(cid, ocid);
      } else {
        me.componentsTree.prependComponent(cid, {
          name: modName,
          path: path,
          props: {},
          children: []
        });
      }
    },
    xxx() {
      if (x) {
        if (!root.children) return;
        for (var i = 0; i < root.length; i++) {
          let child = root.children[i];
          stack.push(child);
          let node;
          while (stack.length > 0) {
            node = stack.pop();
            if (!cache[node.path] && node.path) {
              let clas;
              if (node.comType === 'lib') {
                clas = window[this.comsData.name][node.path];
                if (!clas) {
                  throw new Error(`组件${node.path}不存在`);
                }
                if (clas.default) {
                  clas = clas.default;
                }
                Vue.component(clas.name, clas);
                cache[node.path] = clas;
              }
            } else {
              clas = require(`../../common/$${node.name}/${node.name}`);
              if (!clas) {
              }
            }
          }
        }
        if (Node.display === 'flex') {
          cn = 'component-item flex-item';
        } else if (Node.display === 'fixed') {
          cn = 'component-item fixed-item';
        }
        node.vnode = <div class={cn}>{h(node.name, { attrs: { cid: node.cid }, props: newProps }, children)}</div>;
        // node.vnode = (
        //   <div class={cn}>
        //     <div name="spaceItem" class="space-item"></div>
        //     <div class="component-wrapper" on-click="">
        //       {history(
        //         node.name,
        //         {
        //           attrs: { cid: node.cid },
        //           props: {}
        //         },
        //         children
        //       )}
        //       {children.length === 0 ? <div class=""></div> : ''}
        //     </div>
        //   </div>
        // );
      } else if (node.children.length === 0) {
        node.rendered = true;
        stack.push(node);
      } else {
        let count = 0;
        for (var j = 0; j < node.children.length; j++) {
          if (!node.children[j].rendered) {
            if (count === 0) {
              stack.push(node);
            }
            count++;
            stack.push(node.children[j]);
          }
        }
        if (count === 0) {
          node.rendered = true;
          stack.push(node);
        }
        result.push(node.vnode);
      }
      return result;
    },
    doPublish() {
      let me = this;
      let stack = [];
      let result = [];
      let root = JSON.parse(JSON.stringify(me.treeData));
      if (!root.children) return;
      for (var i = 0; i < root.children.length; i++) {
        let child = root.children[i];
        stack.push(child);
        let node;
        while (stack.length > 0) {
          node = stack.pop();
          if (node.rendered) {
            let children = node.children.map((item) => item.vnode);
            let newProps = Object.assign({ cid: node.cid }, node.props);
            let propStr = [];
            for (let key in newProps) {
              if (key !== 'cid') {
                propStr.push(`:${key}='${newProps[key]}'`);
              }
            }
            switch (node.name) {
              case 'Text':
                node.vnode = node.props.text;
                break;
              default:
                node.vnode = `<${node.name} ${propStr.join(' ')}>${children.join('')}</${node.name}>`;
                break;
            }
          } else if (node.children.length === 0) {
            node.rendered = true;
            stack.push(node);
          } else {
            let count = 0;
            for (var j = 0; j < node.children.length; j++) {
              if (!node.children[j].rendered) {
                if (count === 0) {
                  stack.push(node);
                }
                count++;
                stack.push(node.children[j]);
              }
            }
            if (count === 0) {
              node.rendered = true;
              stack.push(node);
            }
          }
        }
        result.push(node.vnode);
      }
      eventHub.$emit('publish-page', rsult.join('\n'));
    },
    updateTreeData() {
      history.length = 10;
      this.treeData = this.componentsTree.treeData;
    },
    save() {
      this.getSchema();
    },
    getSchema() {
      let stack = [];
      let schema = JSON.parse(JSON.stringify(this.treeData));
      let parent = schema;
      // index = 0;
      let item;
      for (var i = 0; ; ) {
        // let currentParent = parent;
        let child = parent.children[i];
        stack.push(child);
        while (stack.length > 0) {
          let node = stack.shift();
          let clas = cache[node.path].props;
          let props = Object.keys(node.props);
          for (let [k, v] of props) {
            if (clas[k].configrable) {
              node.props[k] = {
                value: v,
                title: clas[k].title
              };
            }
          }
        }
      }
    }
  },

  beforeDestroy() {
    eventHub.$off('xp-set-global-data');
    eventHub.$off('xp-com-property-change');
    eventHub.$off('xp-com-body-property-change');
    eventHub.$off('xp-com-copy');
    eventHub.$off('xp-com-delete');
    eventHub.$off('xp-com-rename');
    eventHub.$off('xp-widget-save');
    eventHub.$off('xp-global-add-component');
    eventHub.$off('xp-global-update-component');
    eventHub.$off('xp-undo');
    eventHub.$off('xp-redo');
    eventHub.$off('xp-save');
  },
  watch: {
    modelData(val, oldVal) {
      if (val.model_content) {
        history.push(val.model_content);
        this.componentsTree.setData(val.model_content);
        this.updateTreeData();
        eventHub.$emit('show-model-property', val.model_content);
      }
    }
  }
};

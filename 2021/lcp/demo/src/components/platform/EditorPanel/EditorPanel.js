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
    eventHub.$on('xp-com-delete', (date) => {
      history.unshift(JSON.parse(JSON.stringify(this.treeData)));
      let cur = this.$root.curComData;
      this.componentsTree.removeComponent(cur.cid);
      this.updateTreeData();
    });
    eventHub.$on('xp-com-rename', (name) => {
      history.unshift(JSON.parse(JSON.stringify(this.treeData)));
      let node = this.componentsTree.find(this.$root.curComData.cid);
      node.title = name;
    });
    eventHub.$on('xp-set-global-data', (data) => {
      this.componentsTree.setData(data);
      this.updateTreeData();
    });
    eventHub.$on('xp-global-add-component', (cid, com) => {
      history.unshift(JSON.parse(JSON.stringify(this.treeData)));
      this.componentsTree.addComponent(cid, {
        title: '',
        name: com.name,
        path: com.path,
        props: com.props,
        children: []
      });
    });
    eventHub.$on('xp-global-update-component', (cid, props) => {
      history.unshift(JSON.parse(JSON.stringify(this.treeData)));
      this.componentsTree.updateProps(cid, props);
    });
    eventHub.$on('xp-global-remove-component', (cid) => {
      history.unshift(JSON.parse(JSON.stringify(this.treeData)));
      this.componentsTree.removeComponent(cid);
    });
    eventHub.$on('xp-global-update-children', (cid, children) => {
      history.unshift(JSON.parse(JSON.stringify(this.treeData)));
      this.componentsTree.updateChildren(cid, children);
    });
    eventHub.$on('xp-undo', (cid, children) => {
      this.redoState = JSON.parse(JSON.stringify(this.treeData));
      let stateData = history.shift();
      if (stateData && Object.keys(stateData) != 0) {
        this.treeData = stateData;
      }
    });
    eventHub.$on('xp-redo', (cid, children) => {
      if (this.redoState) {
        this.treeData = JSON.parse(JSON.stringify(this.redoState));
        this.redoState = null;
      }
    });
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
            <span mode="edit" class={me.showMode === 'edit' ? 'on' : ''} on-click={this.viewChange}>
              编辑视图
            </span>
            <span mode="preview" class={me.showMode === 'preview' ? 'on' : ''} on-click={this.viewChange}>
              预览视图
            </span>
          </span>
          <span class="publish" on-click={this.doPublish}>
            <i class="icon-publish2" />
            代码
          </span>
        </div>
        <ul class="contextmenu" ref="menu">
          <li>置于最前</li>
          <li>置于最前</li>
          <li class="split"></li>
          <li>对齐</li>
          <li class="split"></li>
          <li>复制</li>
          <li>删除</li>
          <li>保存为组合件</li>
        </ul>
        {this.doRender()}
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
        return (
          <div
            ref="skep"
            class="skeletonPanel"
            on-click={this.showBodyProperty}
            on-drop={this.drop}
            on-drop={this.dragEnter}
            on-drop={this.dragLeave}
            on-drop={this.dragOver}
            name="body"
            data-cid="0"
          >
            {this.renderSkeletion(h)}
          </div>
        );
      } else if (this.showMode === 'edit') {
        return (
          <div class="editPanel">
            <div class="iphone-wrapper">
              <div class="iphone">
                <div class="iphone-top"></div>
                <div class="iphone-screen"></div>
              </div>
            </div>
            <div
              ref="edip"
              class="components-body"
              on-click={this.showBodyProperty}
              on-drop={this.drop}
              on-drop={this.dragEnter}
              on-drop={this.dragLeave}
              on-drop={this.dragOver}
              name="body"
            ></div>
          </div>
        );
      }
    },
    showProperty(e) {
      let cur = e.currentTarget;
      let cid = cur.getAttribute('data-cid');
      let itm = this.componentsTree.find(cid);
      this.$root.curComData = itm;
      eventHub.$emit('show-component-property', itm);
      let ws = Array.prototype.slice.call(document.querySelectorAll('.component-wrapper.active'), 0);
      ws.map((item) => item.classList.remove('active'));
      cur.classList.add('active');
      e.stopPropagation();
    },
    showBodyProperty(e) {
      let ws = Array.prototype.slice.call(document.querySelectorAll('.component-wrapper'), 0);
      ws.map((item) => item.classList.remove('active'));
      eventHub.$emit('show-body-property', {
        name: 'xp-page-body',
        cid: 0
      });
      e.stopPropagation();
    },
    dragStart(e) {
      let cur = e.currentTarget;
      e.dataTransfer.setData('mod-exist', true);
      e.dataTransfer.setData('mod-name', cur.getAttribute('name'));
      e.dataTransfer.setData('mod-path', cur.getAttribute('path'));
      e.dataTransfer.setData('mod-cid', cur.getAttribute('data-cid'));
      e.stopPropagation();
    },
    dragOver(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    dragEnter(e) {
      e.preventDefault();
      e.stopPropagation();
      let cur = e.currentTarget;
      let tar = e.target;
      if (e.target.className === 'component-mask') {
        tar = e.target.parentNode;
      }
      if (cur === tar) {
        tar.classList.add('active');
      } else if (cur.parentNode.className.indexOf('flex-item') !== -1) {
        if (tar.parentNode === cur) {
          tar.classList.add('active');
        }
      }
    },
    dragLeave() {
      e.preventDefault();
      e.stopPropagation();
      let cur = e.currentTarget;
      let tar = e.target;
      if (e.target.className === 'component-mask') {
        tar = e.target.parentNode;
      }
      if (cur === tar) {
        tar.classList.remove('active');
      } else if (cur.parentNode.className.indexOf('flex-item') !== -1) {
        if (tar.parentNode === cur) {
          tar.classList.remove('active');
        }
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
    maskDrop(e) {},
    drop(e) {
      e.preventDefault();
      e.stopPropagation();
      let cur = e.currentTarget;
      let tar = e.target;
      if (e.target.className === 'component-mask') {
        tar = e.target.parentNode;
      }
      if (cur === tar) {
        let cid = cur.getAttribute('data-cid');
        let type = e.dataTransfer.getData('mod-type');
        let exist = e.dataTransfer.getData('mod-exist');
        let path = e.dataTransfer.getData('mod-path');
        let ocid = e.dataTransfer.getData('mod-cid');
        let modName = e.dataTransfer.getData('mod-name');
        let props = e.dataTransfer.getData('mod-props');
        if (exist && cid) {
          me.componentsTree.moveComponent(ocid, cid);
        } else {
          me.componentsTree.addComponent(cid, {
            title: '',
            name: modName,
            path: path,
            property: JSON.parse(props),
            props: [],
            comType: type,
            children: []
          });
          this.updateTreeData();
        }
      }
    },
    removeItem(e) {},
    camalise(str) {
      return str.replace('(^w)|-(w)', (s0, s1) => {
        return s1.toUpperCase();
      });
    },
    viewChange(e) {
      let tar = e.target;
      var mod = tar.getAttribute('mode');
      if (mode === 'preview') {
        window.__modelData = this.treeData;
      }
      this.showMode = mod;
    },
    renderSkeletion(h) {
      let me = this;
      let stack = [];
      let result = [];
      let root = JSON.parse(JSON.stringify(this.treeData));
      if (!root.children) return;
      for (let i = 0, length = root.children.length; i < length; i += 1) {
        let child = root.children[i];
        stack.push(child);
        let node;
        while (stack.length > 0) {
          node = stack.pop();
          if (node.rendered) {
            node.vnode = (
              <div class="component-item">
                <div
                  name="spaceItem"
                  class="space-item"
                  on-dragenter={me.dragEnter}
                  on-dragleave={me.dragLeave}
                  on-dragOver={me.dragOver}
                  on-drop={me.insert}
                  path={node.path}
                  data-cid={node.cid}
                ></div>
                <div
                  class="component-wrapper skeleton-item"
                  on-click={me.showProperty}
                  on-dragstart={me.dragStart}
                  on-dragleave={me.dragLeave}
                  on-dragenter={me.dragEnter}
                  on-drop={me.drop}
                  name={node.name}
                  path={node.path}
                  data-cid={node.cid}
                  draggable="true"
                >
                  {node.title || node.name}
                  <span class="close" on-click={me.removeItem}>
                    x
                  </span>
                  {node.children.map((item) => item.vnode)}
                </div>
              </div>
            ); // 数组前面所有包含自己的父节点和自己是同一个引用
          } else if (node.children.length === 0) {
            node.rendered = true;
            stack.push(node);
          } else {
            let count = 0;
            for (let j = 0, length = node.children.length; j < length; j += 1) {
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
      return result;
    },
    renderComponents(h) {
      let stack = [];
      let result = [];
      let root = JSON.parse(JSON.stringify(this.treeData));
      if (!root.children) return;
      for (let i = 0, length = root.children.length; i < length; i += 1) {
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
            } else {
              clas = require(`../../common/${node.name}/${node.name}`);
              if (!clas) {
                throw new Error(`组件${node.path}不存在`);
              }
              if (clas.default) {
                clas = clas.default;
              }
              Vue.component(clas.name, clas);
              cache[node.path] = clas;
            }
          }
          node.name = cache[node.path].name;
          node.display = cache[node.path].display;
          if (node.rendered) {
            let children = node.children.map((item) => item.vnode);
            let newProps = Object.assign({ cid: node.cid }, node.props);
            let cn = 'component-item';
            if (node.display === 'flex') {
              cn = 'component-item flex-item';
            } else if (node.display === 'fixed') {
              cn = 'component-item fixed-item';
            }
            node.vnode = (
              <div class={cn}>
                <div
                  name="spaceItem"
                  class="space-item"
                  on-dragenter={this.dragEnter}
                  on-dragleave={this.dragLeave}
                  on-dragover={this.dragOver}
                  on-drop={this.insert}
                ></div>
                <div
                  class="component-wrapper"
                  on-click={this.showProperty}
                  on-dragstart={this.dragStart}
                  on-dragleave={this.dragLeave}
                  on-dragenter={this.dragEnter}
                  on-drop={this.drop}
                >
                  {h(
                    node.name,
                    {
                      attrs: { cid: node.cid },
                      props: newProps
                    },
                    children
                  )}
                  {children.length === 0 ? <div class="component-mask"></div> : ''}
                </div>
              </div>
            );
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
      return result;
    },
    renderView() {
      let me = this;
      let stack = [];
      let result = [];
      let root = JSON.parse(JSON.stringify(me.treeData));
      if (!root.children) return;
      for (let i = 0, length = root.children.length; i < length; i += 1) {
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
            } else {
              clas = require(`../../common/${node.name}/${node.name}`);
              if (!clas) {
                throw new Error(`组件${node.path}不存在`);
              }
              if (clas.default) {
                clas = clas.default;
              }
              Vue.component(clas.name, clas);
              cache[node.path] = clas;
            }
          }
          node.name = cache[node.path].name;
          node.display = cache[node.path].display;
          if (node.rendered) {
            let children = node.children.map((item) => item.vnode);
            let newProps = Object.assign({ cid: node.cid }, node.props);
            let cn = 'component-item';
            if (node.display === 'flex') {
              cn = 'component-item flex-item';
            } else if (node.display === 'fixed') {
              cn = 'component-item fixed-item';
            }
            node.vnode = (
              <div class={cn}>
                {h(
                  node.name,
                  {
                    attrs: { cid: node.cid },
                    props: newProps
                  },
                  children
                )}
              </div>
            );
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
                propStr.push(`;${key}='${newProps[key]}'`);
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
      eventHub.$emit('publish-page', result.join('\n'));
    },
    updateTreeData() {
      history.length = 10;
      this.treeData = this.componentsTree.treeData;
    },
    save() {
      this.getSchema();
    },
    getSchema() {
      let stach = [];
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

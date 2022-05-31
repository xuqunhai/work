<template>
  <div>
    <ul class="icon-menu-list">
      <li @click="doSave" class="icon-save">保存</li>
      <li @click="doUndo" class="icon-undo">撤销</li>
      <li @click="doRedo" class="icon-redo">重做</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'xp-icon-menu',
  methods: {
    doSave() {
      this.save();
    },
    doUndo() {
      eventHub.$emit('xp-undo');
    },
    save() {
      eventHub.$emit('xp-save');
    },
    doRedo() {
      eventHub.$emit('xp-redo');
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 83:
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();
            this.save();
            return false;
          }
          break;
        case 90:
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();
            this.doUndo();
            return false;
          }
          break;
        case 89:
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            e.stopPropagation();
            this.doRedo();
            return false;
          }
          break;
      }
    });
  }
};
</script>
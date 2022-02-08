// javascript-state-machine - github
var fsm = new StateMachine({
  init: '收藏',
  transitions: [
    {
      name: 'doStore',
      from: '收藏',
      to: '取消收藏'
    },
    {
      name: 'deleteStore',
      from: '取消收藏',
      to: '收藏'
    }
  ],
  methods: {
    onDoStore: function () {
      alert('收藏成功');
      updateText();
    },
    onDeleteStore: function () {
      alert('已取消收藏');
      updateText();
    }
  }
});

$btn.click(function () {
  if (fsm.is('收藏')) {
    fsm.doStore();
  } else {
    fsm.deleteStore();
  }
});

function updateText() {
  $btn.text(fsm.state);
}

updateText(); // init

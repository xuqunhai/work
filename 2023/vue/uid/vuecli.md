vue.config.js
```
module.exports = {
    chainWebpack: config => {
        config.module
          .rule('vue')
          .use('vue-loader')
          .loader('vue-loader')
          .tap(options => {
            options.compilerOptions.modules = [
              ...compilerOptionsModules
            ];
            return options;
          });
    }
}
```

compilerOptionsModules.js
```
const crypto = require('crypto');

const compilerOptionsModules = [
  {
    preTransformNode(el) {
      const attrsMap = el.attrsMap || {};
      let vForVal = attrsMap['v-for'] || '';
      vForVal = vForVal.trim()
      if (vForVal && !vForVal.startsWith('(')) {
        // 这里简单处理 item in list -> (item, uitestIndex) in list
        const itemName = vForVal.split(' ')[0];
        attrsMap['v-for'] = vForVal.replace(itemName, `(${itemName}, uitestIndex)`);
      }
      return el;
    },
  },
  {
    transformNode(el) {
      const attrsMap = el.attrsMap || {};
      const vForVal = attrsMap['v-for'];
      if (vForVal) {
        // 获取vFor中索引的变量, 如 '(item, index) in list' 中的 index
        const dynamicsKey = vForVal.split(',')[1].trim().split(')')[0];
        const keyVal = `keyVal:${vForVal}`;
        let uidVal = crypto.createHash('md5').update(keyVal).digest('hex').slice(0, 6);
        uidVal = "'for" + uidVal + "' + " + dynamicsKey;
        el.attrsList.unshift({ name: ':uid', value: uidVal });
        return el;
      }

      const attrsMapKeys = Object.keys(attrsMap);
      const vModelKey = attrsMapKeys.filter(attr => attr === 'v-model')[0];
      const eventKeys = attrsMapKeys.filter(attr => attr.startsWith('@'));

      const uitestIdArr = [];
      if (attrsMap.id) {
        uitestIdArr.push(`id_${attrsMap.id}`);
      } else if (vModelKey) {
        uitestIdArr.push(`vmodel_${attrsMap['v-model']}`);
      } else if (eventKeys.length) {
        const eventNames = eventKeys.map(event => attrsMap[event]);
        uitestIdArr.push(`events_${eventNames.join(' ')}`);
      }

      if (uitestIdArr.length) {
        const uitestid = uitestIdArr[0];
        const uidVal = crypto.createHash('md5').update(uitestid).digest('hex').slice(0, 6);
        el.attrsList.unshift({ name: 'uid2', value: uidVal });
      }
      return el;
    },
  },
];

module.exports = compilerOptionsModules;

```
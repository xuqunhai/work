;[
  (el) => {
    const oldProps = el.props
    const oldLastNodeProp = oldProps && oldProps[oldProps.length - 1]
    let modelVal = '',
      onVal = '',
      bindKey = ''
    if (oldLastNodeProp) {
      const oldPropsLen = oldProps.length
      let bindKeyProp = null
      for (let i = 0; i < oldPropsLen; i++) {
        const oldProp = oldProps[i]
        if (oldProp.name === 'bind' && oldProp.arg.content === 'key') {
          bindKey = oldProp.exp?.loc?.source
          bindKeyProp = JSON.parse(JSON.stringify(oldProp))
        }
        if (oldProp.name === 'model' && !modelVal) {
          modelVal = oldProp.exp?.loc?.source
        }
        if (oldProp.name === 'on' && !onVal) {
          onVal = oldProp.exp?.loc?.source
        }
      }
      const oldLastLoc = oldLastNodeProp?.loc
      const oldLastLocEnd = oldLastLoc.end
      const line = oldLastLocEnd.line
      const locStartColumn = oldLastLocEnd.column + 1
      const locStartOffset = oldLastLocEnd.offset + 1
      const crypto = require('crypto')
      if (modelVal || onVal) {
        try {
          const name = 'uid'
          let val = modelVal ? modelVal : onVal
          // val = val.replace(/[^\d\w]/g, '');
          val = crypto.createHash('md5').update(val).digest('hex').slice(0, 6)
          val = modelVal ? `m${val}` : `o${val}`
          const locEndColumn = locStartColumn + name.length + val.length + 3
          const locEndOffset = locStartOffset + name.length + val.length + 3
          const valueLocStartColumn = locStartColumn + name.length + 1
          const valueLocStartOffset = locStartOffset + name.length + 1
          const obj = {
            type: 6,
            name: name,
            value: {
              type: 2,
              content: val,
              loc: {
                start: {
                  column: valueLocStartColumn,
                  line: line,
                  offset: valueLocStartOffset
                },
                end: {
                  column: locEndColumn,
                  line: line,
                  offset: locEndOffset
                },
                source: `"${val}"`
              }
            },
            loc: {
              start: {
                column: locStartColumn,
                line: line,
                offset: locStartOffset
              },
              end: {
                column: locEndColumn,
                line: line,
                offset: locEndOffset
              },
              source: `${name}="${val}"`
            }
          }

          !bindKey && el.props.push(obj)
        } catch (error) {}
      }
      if (bindKey) {
        const name = 'key'
        const locSource = bindKeyProp?.loc?.source
        const expLocSource = bindKeyProp.exp?.loc?.source
        let expLocSourceStr = modelVal || onVal || expLocSource
        // expLocSourceStr = expLocSourceStr.replace(/[^\d\w]/g, '');
        expLocSourceStr = crypto
          .createHash('md5')
          .update(expLocSourceStr)
          .digest('hex')
          .slice(0, 6)
        expLocSourceStr = 'f' + expLocSourceStr
        const addStr = "+'" + expLocSourceStr + "'"
        const newExpLocSourceStr = expLocSource + addStr
        const newLocSource = locSource.replace(expLocSource, newExpLocSourceStr)
        const newBindKeyProp = {
          exp: {
            loc: {
              source: newExpLocSourceStr,
              start: {
                line,
                column: locStartColumn + name.length + 3,
                offset: locStartOffset + name.length + 3
              },
              end: {
                line,
                column:
                  locStartColumn + name.length + 3 + newExpLocSourceStr.length,
                offset:
                  locStartOffset + name.length + 3 + newExpLocSourceStr.length
              }
            },
            children: []
          },
          arg: {
            content: 'uid',
            loc: {
              source: 'uid',
              start: {
                line,
                column: locStartColumn + 1,
                offset: locStartOffset + 1
              },
              end: {
                line,
                column: locStartColumn + 1 + 3,
                offset: locStartOffset + 1 + 3
              }
            }
          },
          loc: {
            start: {
              line,
              column: locStartColumn,
              offset: locStartOffset
            },
            end: {
              line,
              column: locStartColumn + newLocSource.length,
              offset: locStartOffset + newLocSource.length
            },
            source: newLocSource
          }
        }
        if (bindKeyProp?.loc) {
          bindKeyProp.loc.source = newBindKeyProp?.loc?.source
          bindKeyProp.loc.start = newBindKeyProp?.loc?.start
          bindKeyProp.loc.end = newBindKeyProp?.loc?.end
        }
        if (bindKeyProp.exp) {
          bindKeyProp.exp.loc.source = newBindKeyProp.exp?.loc?.source
          bindKeyProp.exp.loc.start = newBindKeyProp.exp?.loc?.start
          bindKeyProp.exp.loc.end = newBindKeyProp.exp?.loc?.end
          let divide
          if (bindKeyProp.exp.children) {
            bindKeyProp.exp.children.forEach((item) => {
              if (item && item?.loc) {
                if (divide === undefined) {
                  divide =
                    newBindKeyProp.exp?.loc?.start?.column -
                      item?.loc?.start?.column || 0
                }
                item.loc.start.column += divide
                item.loc.start.offset += divide
                item.loc.end.column += divide
                item.loc.end.offset += divide
              }
            })
            bindKeyProp.exp.children.push(addStr)
          }
        }
        if (bindKeyProp.arg) {
          bindKeyProp.arg.loc.source = newBindKeyProp.arg?.loc?.source
          bindKeyProp.arg.loc.start = newBindKeyProp.arg?.loc?.start
          bindKeyProp.arg.loc.end = newBindKeyProp.arg?.loc?.end
          bindKeyProp.arg.content = newBindKeyProp.arg?.content
        }
        el.props.push(bindKeyProp)
      }
    }
  }
]

// show.js
export default {
    bind(){
        var next = this.el.nextElementSibling;
        if(next && getAttr(next, 'v-else') !== null){
            this.elseEl = next
        }
    },
    update(value) {
        this.apply(this.el, value)
        if(this.elseEl) {
            this.apply(this.elseEl, !value)
        }
    },
    apply(el, value) {
        if(inDoc(el)){
            applyTransition(el, value ? 1 : -1, toggle, this.vm)
        } else {
            toggle()
        }
        function toggle() {
            el.style.display = value ? '' : 'none'
        }
    }
}

// model.js
export default {
    priority: MODEL,
    twoWay: true,
    handlers: handlers,
    params: ['lazy', 'number', 'debounce'],
    bind() {
        this.checkFilters()
        if(this.hasRead && !this.hasWrite) {}
        var el = this.el
        var tag = el.tagName
        var handler
        if (tag === 'INPUT') {
            handler = handlers[el.type] || handlers.text
        } else if (tag === 'SELECT') {
            handler = handlers.select
        } else if (tag === 'TEXTAREA') {
            handler = handlers.text
        } else {
            process.env.NODE_ENV !== 'production' && warn()
            return
        }
        el.__v_model = this
        handler.bind.call(this)
        this.update = handler.update
        this._unbind = handler.unbind
    },
    checkFilters() {}
}
import { autorun } from 'mobx'
import * as mobx from 'mobx'
if (cc.sys.isBrowser) { window.mobx = mobx }
mobx.configure({ enforceActions: "always" })

export const observer = (constructor) => {
    return class extends constructor {
        _disposer = [];
        _reaction;
        _autorun;
        onLoad() {
            super.onLoad && super.onLoad()
            if (this._autorun) {
                this._disposer.push(...this._autorun.map((x) => autorun(this[x].bind(this))))
            }
            if (this._reaction) {
                this._disposer.push(...this._reaction.map((x) => { return this[x]() }))
            }
        }
        onDestroy() {
            super.onDestroy && super.onDestroy()
            if (this._disposer) this._disposer.forEach(x => x())
            this._disposer.length = 0
        }
    }
}

export const render = (target, key, descriptor) => {
    let obs = target['_autorun']
    if (!obs) { obs = target['_autorun'] = [] }
    obs.push(key)
}

export const reactor = (target, key, descriptor) => {
    let obs = target['_reaction']
    if (!obs) { obs = target['_reaction'] = [] }
    obs.push(key)
}

export const react = (expression, effect) => {
    return mobx.reaction(expression, effect, {fireImmediately: true })
}
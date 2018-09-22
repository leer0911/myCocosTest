import { store } from "./store";
import { action } from "mobx";

@cc._decorator.ccclass
export default class Button extends cc.Component {
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick)
    }
    @action
    onClick() {
        store.total += 1 
    }
}
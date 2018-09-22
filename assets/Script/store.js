/**
 * 程序状态机
 */
import { observable } from "mobx";
class Store {
    // 总共点击次数
    @observable total = 0
}
export const store = new Store

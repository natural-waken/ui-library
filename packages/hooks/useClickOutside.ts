import { type Ref } from 'vue'
import useEventListener from './useEventListener'

export default function useClickOutside(
    elementRef: Ref<HTMLElement | void>,
    callback: (e: MouseEvent) => void
) {
    useEventListener(document, 'click', (e: Event) => {
        if (elementRef.value && e.target) {
            if (!elementRef.value.contains(e.target as HTMLElement)) {  // 判断click事件是否在结点之内
                callback(e as MouseEvent)
            }
        }
    })
}
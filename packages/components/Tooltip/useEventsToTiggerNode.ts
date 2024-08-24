// import { each, isElement } from "lodash-es";
// import { onMounted, onUnmounted, watch } from "vue";
// import type { ComputedRef, Ref, WatchStopHandle } from "vue";
// import type { TooltipProps } from "./types";


// // 用于为指定的触发节点绑定或解绑事件处理程序
// export function useEventsToTiggerNode(
//     props: TooltipProps & { virtualTriggering?: boolean },
//     triggerNode: ComputedRef<HTMLElement | undefined>,
//     events: Ref<Record<string, EventListener>>,
//     closeMethod: () => void  // 用于关闭 Tooltip
// ) {
//     let watchEventsStopHandle: WatchStopHandle | void;
//     let watchTriggerNodeStopHandle: WatchStopHandle | void;

//     // 存储事件和其对应的处理函数，以便在解绑事件时能轻松找到对应的处理函数。
//     const _eventHandleMap = new Map();

//     const _bindEventToVirtualTiggerNode = () => {
//         const el = triggerNode.value;
//         isElement(el) &&
//             each(events.value, (fn, event) => {
//                 _eventHandleMap.set(event, fn);
//                 el?.addEventListener(event as keyof HTMLElementEventMap, fn);
//             });
//     };
//     const _unbindEventToVirtualTiggerNode = () => {
//         const el = triggerNode.value;
//         isElement(el) &&
//             each(
//                 ["mouseenter", "click", "contextmenu"],
//                 (key) =>
//                     _eventHandleMap.has(key) &&
//                     el?.removeEventListener(key, _eventHandleMap.get(key))
//             );
//     };

//     onMounted(() => {
//         watchTriggerNodeStopHandle = watch(
//             triggerNode,
//             () => props.virtualTriggering && _bindEventToVirtualTiggerNode(),
//             { immediate: true }
//         );

//         watchEventsStopHandle = watch(
//             events,
//             () => {
//                 if (!props.virtualTriggering) return;
//                 _unbindEventToVirtualTiggerNode();
//                 _bindEventToVirtualTiggerNode();
//                 closeMethod();
//             },
//             { deep: true }
//         );
//     });

//     onUnmounted(() => {
//         watchTriggerNodeStopHandle?.();
//         watchEventsStopHandle?.();
//     });
// }

// export default useEventsToTiggerNode;

import { each, isElement } from "lodash-es";
import { onMounted, onUnmounted, watch } from "vue";
import type { ComputedRef, Ref, WatchStopHandle } from "vue";
import type { TooltipProps } from "./types";

export function useEvenstToTiggerNode(
    props: TooltipProps & { virtualTriggering?: boolean },
    triggerNode: ComputedRef<HTMLElement | undefined>,
    events: Ref<Record<string, EventListener>>,
    closeMethod: () => void
) {
    let watchEventsStopHandle: WatchStopHandle | void;
    let watchTriggerNodeStopHandle: WatchStopHandle | void;

    const _eventHandleMap = new Map();

    const _bindEventToVirtualTiggerNode = () => {
        const el = triggerNode.value;
        isElement(el) &&
            each(events.value, (fn, event) => {
                _eventHandleMap.set(event, fn);
                el?.addEventListener(event as keyof HTMLElementEventMap, fn);
            });
    };
    const _unbindEventToVirtualTiggerNode = () => {
        const el = triggerNode.value;
        isElement(el) &&
            each(
                ["mouseenter", "click", "contextmenu"],
                (key) =>
                    _eventHandleMap.has(key) &&
                    el?.removeEventListener(key, _eventHandleMap.get(key))
            );
    };

    onMounted(() => {
        watchTriggerNodeStopHandle = watch(
            triggerNode,
            () => props.virtualTriggering && _bindEventToVirtualTiggerNode(),
            { immediate: true }
        );

        watchEventsStopHandle = watch(
            events,
            () => {
                if (!props.virtualTriggering) return;
                _unbindEventToVirtualTiggerNode();
                _bindEventToVirtualTiggerNode();
                closeMethod();
            },
            { deep: true }
        );
    });

    onUnmounted(() => {
        watchTriggerNodeStopHandle?.();
        watchEventsStopHandle?.();
    });
}

export default useEvenstToTiggerNode;
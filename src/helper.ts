export const on = (el: EventTarget, event: string, handler: EventListenerOrEventListenerObject) => {
    el?.addEventListener(event, handler)
}

export const off = (el: EventTarget, event: string, handler: EventListenerOrEventListenerObject) => {
    el?.removeEventListener(event, handler)
}

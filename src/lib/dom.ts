export const on = (terget: EventTarget, event: string, handler: EventListenerOrEventListenerObject) => {
    terget.addEventListener(event, handler)
}

export const off = (terget: EventTarget, event: string, handler: EventListenerOrEventListenerObject) => {
    terget.removeEventListener(event, handler)
}

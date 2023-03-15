import type { FunctionComponent } from 'react'

declare global {
    declare type FC<P = AnyObject> = FunctionComponent<P>
}

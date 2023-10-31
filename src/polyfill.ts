import "core-js/features/array/at";
import "core-js/features/object/has-own";

import { enableMapSet, setAutoFreeze } from "immer";

enableMapSet();
setAutoFreeze(true);

import {configureStore} from "@reduxjs/toolkit"
import { HistoryReducer, ThemeReducer } from "./slices"


export const store = configureStore({
    reducer: {
        Theme: ThemeReducer,
        History: HistoryReducer
    }
})
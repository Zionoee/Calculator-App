import { createSlice } from "@reduxjs/toolkit";
type finale = {
    value: info[]
}
type info = {
  data?: string,
  result?: string
  TimeCreated?: string,
  DateCreated?: string
}

export const Theme = createSlice({
    name: "theme",
    initialState: {value: "Dark"},
    reducers: {
        ChangeTeme: (state)=>{
       if(state.value === "Dark"){
        state.value = 'Ligth'
       }
       else{
        state.value = 'Dark'
       }
        },
    }
})
const date = new Date
const year = date.getFullYear()
const month = date.getMonth()
const daate = date.getDate()
const day = date.getDay()
const hours = date.getHours()
const minutes = date.getMinutes()
const initialState : finale = {value:[]}
const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthName = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export const HistoryState = createSlice(
    {
    name: "History",
    initialState,
    reducers : {
 StoreHistory : (state,  action )=>{
    
    state.value = [...state?.value,
         {data:action.payload.calculatedValue, 
            result:action.payload.result,
             TimeCreated: `${hours}:${minutes< 10 ? "0":""}${minutes}`, 
             DateCreated: `${dayName[day]}, ${daate} ${monthName[month]} ${year}`}]
             console.log(state.value)
     localStorage.setItem("calculatorHistory", JSON.stringify(state.value)) 
},
RetrievedHistory : (state, action)=>{
state.value = action.payload
},
ClearHistoryByIndex : (state,action)=>{
state.value = state.value.filter((_,i)=> i !== action.payload )
localStorage.setItem("calculatorHistory", JSON.stringify(state.value))
},
ClearHistory: (state)=>{
    state.value.length = 0
    localStorage.removeItem("calculatorHistory")
}
    }

})

export const HistoryActions = HistoryState.actions
export const HistoryReducer = HistoryState.reducer


export const ThemeActions = Theme.actions
export const ThemeReducer = Theme.reducer
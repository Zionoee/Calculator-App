import {Routes, Route} from "react-router-dom"
import { Calculator } from "../pages/calculator/calculator"
import { History } from "../pages/History/History"

export const MyRoutes = ()=>{

    return(
        <Routes>
            <Route path = "/" element = {<Calculator/>} />
            <Route path ="/history" element = {<History/>}/>
        </Routes>
    )
}
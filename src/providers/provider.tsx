import { store } from "../store/store"
import {Provider} from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

export const MyProviders = ({children}: {children:React.ReactNode})=>{

    return(<Provider store = {store}>
        <Router>
        {children}
        </Router>
    </Provider>)

}
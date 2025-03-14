import { useEffect } from "react"
import { Header } from "./Layout/headear"
import { MyRoutes } from "./routes/routes"
import { useDispatch } from "react-redux"
import { HistoryActions } from "./store/slices"


function App() {
  const {RetrievedHistory} = HistoryActions
  const dispatch = useDispatch()
  useEffect(()=>{
    const tempHistory = localStorage.getItem("calculatorHistory")
    const retrievedHistory = tempHistory !== null ? JSON.parse(tempHistory) : []
     dispatch(RetrievedHistory(retrievedHistory))
      },[])
    
  return(<div className="min-h-screen h-fit">
  <Header/>
  <MyRoutes/>
  </div>)
}

export default App

import {useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { HistoryActions } from "../../store/slices"
import { FaCalculator } from "react-icons/fa"
import { Link } from "react-router-dom"

export const History = ()=>{
    const dispatch = useDispatch()
    const {ClearHistoryByIndex, ClearHistory} = HistoryActions
 const history = useSelector((store:any)=>store.History.value)
 const [currentPage,setCurrentPage] = useState<number>(1)
const numberOfItemsPerPage = 5
const   indexOfFirstItem = numberOfItemsPerPage * currentPage - numberOfItemsPerPage
const  indexOfLastItem = indexOfFirstItem + numberOfItemsPerPage
const items = history.slice(indexOfFirstItem, indexOfLastItem)
 const totalNumberOfPages = Math.ceil(history.length / numberOfItemsPerPage)
console.log(totalNumberOfPages)
 const handleNextPage = ()=>{
 setCurrentPage((prev)=> prev + 1)
 }
 const handlePreviousPage = () =>{
setCurrentPage((prev)=> prev - 1)
 }

    return(<div  className="pt-[12dvh] w-screen min-h-screen h-fit relative bg-gray-300">
       {
        history.length === 0 && <div className=" cursor-pointer absolute text-2xl font-bold text-stone-500 tracking-widest top-[48dvh] left-[2dvw] right-[2dvw] pl-0">
        <p className="  mx-auto w-fit">No History Yet</p>
        <p className=" mx-auto w-fit text-sm  tracking-wide">Calculate to create one</p>
    </div>
       } 
        <div className=" w-screen h-34  min-h-[88dvh] relative">
            <div className="border-b border-b-green-700 h-[12dvh] flex flex-col justify-center items-center">
                <Link to = "/"><button className="transition-all duration-300 hover:scale-110 cursor-pointer text-gray-600 absolute right-5 top-4"><FaCalculator size= {24}/></button></Link>
                <button onClick={()=>{dispatch(ClearHistory())}} className=" mt-8 transition-all duration-300 hover:scale-105 px-20 py-2 lg:px-40 lg:py-3 rounded-full cursor-pointer bg-gradient-to-b from-gray-300 via-gray-500 to-gray-300 text-gray-300 font-semibold ">Clear History</button>
            </div>
            {/* <div className="h-[6dvh] flex justify-center items-center font-semibold  text-stone-500 text-2xl  border-b-2 border-b-green-700"><p>Today</p></div> */}
            {
                items.map((item:any,i:number)=>
                    <div
                    className="relative transition-all duration-300 cursor-pointer h-[12dvh] pl-2 pt-3 hover:bg-gray-200 active:bg-gray-200 border-b-green-700 border-b-[1px] ">
                        <div onClick={()=>{dispatch(ClearHistoryByIndex(i))}} className="transition-all duration-300 hover:scale-110 absolute top-1 right-4 font-bold text-xl  text-red-800">X</div>
                        <div className="font-semibold text-stone-500 text-lg">{item.data}</div>
                        <div className="font-semibold text-stone-500 text-xl flex justify-between">
                            <div className="text-lg">Result</div>
                            <div className="pr-3">{item.result}</div>
                        </div>
                    </div>
                    )
            }
            {
                totalNumberOfPages > 1 && <div className="flex justify-center items-center gap-x-3 h-[10dvh]">
                <button disabled={currentPage === 1} onClick={handlePreviousPage} className={`${currentPage === 1 ? "bg-gray-400" : "bg-gray-500 hover:scale-105"} cursor-pointer transition-all duration-300 py-3 px-6 rounded-full hover:shadow-2xl text-gray-100 font-semibold`}>Prev</button>
                <button disabled = {currentPage === totalNumberOfPages} onClick={handleNextPage} className={`${currentPage === totalNumberOfPages ? "bg-gray-400":"bg-gray-500 hover:scale-105"} cursor-pointer transition-all duration-300 py-[11.5px] px-[22.5px] hover:shadow-2xl rounded-full text-gray-100 font-semibold`}>Next</button>
               </div>
            }
        </div>
        
    </div>)
}
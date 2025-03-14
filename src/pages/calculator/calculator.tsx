import {  useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { calculatorAnimator } from "../../components/animations";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HistoryActions } from "../../store/slices";
export const Calculator = () => {
  const [result, setResult] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<string>("");
  const dispatch = useDispatch()
  const {StoreHistory,} = HistoryActions
  const [on, setOn] = useState<boolean>(true)
  const controlsScreen = useAnimation()
  const controlsCalculatorBody = useAnimation()
  const controlsCalculatorButtons = useAnimation()
  const controlsCalculatorOff = useAnimation()
  // const [prevValue, setPrevValue] = useState<(number | undefined)[]>([]);
  // const [operation, setOperation] = useState<string>("");

  

  const numberClicked = (index: number | string |undefined) => {
   
    if (index === "."){
      setCurrentValue((prev)=> prev + ".")
    }
    else{
      setCurrentValue((prev) => prev + String(index));
    }
  };

  const selectOperation = (event: any) => {
    const Symbol = event.target.textContent.trim();
    switch (Symbol) {
      case "+":
        setCurrentValue((prev) => prev + " " + Symbol + " ");
        break;
      case "-":
        setCurrentValue((prev) => prev + " " + Symbol + " ");
        break;
      case "/":
        setCurrentValue((prev) => prev + " " + Symbol + " ");
        break;
      case "*":
        setCurrentValue((prev) => prev + " " + Symbol + " ");
        break;
      default:
        break;
    }
  };
  const switcher = (init: number, op: string, finale: number) => {
    switch (op) {
      case "+": {
        return init + finale;
      }
        
        break;
      case "-":
        return init - finale;
        break;
      case "/":
        return init / finale;
        break;
      case "*":{
        return init * finale;
      }
        
      default:
        break;
    }
  };
  const Calculate = () => {
    let TempStore: string[] = currentValue.split(" ");
    for (let i = 0; i < TempStore.length; i++){
      if(TempStore[i] === ""){
        TempStore.splice(i,1)
      }
    }

    //  while (TempStore.length > 1) {
      
      let holder: number | undefined = 0;
      for (let i = 0; i < TempStore.length; i++ ) {
        if (TempStore[i] === "/" || TempStore[i] === "*") {
          if (
            ((TempStore[i - 1] === "/" || TempStore[i - 1] === "*" ||
              TempStore[i - 1] === "+" || TempStore[i - 1] === "-") ||
            (TempStore[i + 1]=== "/" || TempStore[i + 1]=== "*" ||
            TempStore[i + 1]=== "+" || TempStore[i + 1]=== "-")) 
          ) {
            return "multiple operator apear together";
          } 
          
          else if (TempStore[i-1] === undefined || TempStore[i+1] === undefined){
              return "operator cannot be first or last"
          }
          
          else {
            holder = switcher(
              Number(TempStore[i - 1]),
              TempStore[i],
              Number(TempStore[i + 1])
            );
            TempStore.splice(i - 1, 3, String(holder));
            i = i-1
        
          }
        }
      }
      for (let i = 0; i < TempStore.length; i++ ){
        console.log(TempStore[i])
        if( TempStore[i] === "+" || TempStore[i]=== "-"){
          console.log("ran at i:", i)
          console.log("TempStore[i-1]",TempStore[i-1])
          console.log("TempStore[i+1]",TempStore[i+1])
          if(TempStore[i-1] === "+" || TempStore[i-1] === "-" || TempStore[i+1] === "+" || TempStore[i+1] === "-"  ){
            console.log("also ran")
            return "multiple operator apear together"
          }
           
          else if (TempStore[i-1] === undefined || TempStore[i+1] === undefined){
            return "operator cannot be first or last"
        }

          else{
            console.log("else ran")
            holder = switcher(Number(TempStore[i-1]), TempStore[i], Number(TempStore[i+1]))
            TempStore.splice(i-1,3,String(holder))
            i = i-1
          }
        }
      }
      dispatch(StoreHistory({calculatedValue: currentValue, result: TempStore[0]}))
     return TempStore[0]
     
   
  };
  const handleClear = ()=>{
    setCurrentValue("")
    setResult("")
  }
const handleDel = ()=>{
  const result = currentValue.slice(0,-1)
  setCurrentValue(result)
}
const handleOnCalculatorButton = ()=>{
  setOn(false)
  controlsScreen.start({
    ...calculatorAnimator.calculatorScreen.animate,
    transition: calculatorAnimator.calculatorScreen.transition
  })
  controlsCalculatorBody.start({
    ...calculatorAnimator.calculatorBody.animate,
    transition: calculatorAnimator.calculatorBody.transition
  })
  controlsCalculatorButtons.start({
  ...calculatorAnimator.calculatorButtons.animate,
  transition: calculatorAnimator.calculatorButtons.transition
  })
}
const handleSwitchOff = ()=>{
  setOn(true)
}
if(on === true){
  controlsCalculatorOff.start({
    ...calculatorAnimator.calculatorOff.animate,
    transition: calculatorAnimator.calculatorOff.transition
  })
}
else{
  controlsCalculatorOff.start({
    opacity: [0,1],
    transition: {
      duration: 1
    }
  })
}

  return (
    <AnimatePresence>
      <motion.div
      className="pt-[12dvh] w-screen min-h-screen h-fit "
    >
    {on && 
      <motion.div
     initial = {calculatorAnimator.calculatorOnButton.initial}
      animate = {calculatorAnimator.calculatorOnButton.animate}
      transition={calculatorAnimator.calculatorOnButton.transition}
     exit={calculatorAnimator.calculatorOnButton.exit}
     onClick = {handleOnCalculatorButton} className=" transition-all duration-300 active:scale-110 px-20 py-1 rounded-full fixed top-[50dvh] left-[13dvw] z-40 bg-gradient-to-b  via-gray-700 text-zinc-50 font-semibold cursor-pointer"> Switch Calculator On</motion.div>
     } 
      <motion.div
      animate = {controlsCalculatorOff}
      className="flex flex-col h-fit">
        <motion.div 
        initial = {calculatorAnimator.calculatorScreen.initial}
        animate = {controlsScreen}
        className="  relative font-mono text-xl sm:text-3xl flex justify-center items-center h-[19dvh] border-1 border-zinc-300 font-semibold text-gray-500">
          <p className="overflow-x-auto whitespace-nowrap scrollbar-hide">
            {currentValue} 
          </p>
          <Link to = '/history'><div className="transition-all duration-300 absolute top-3 right-2 cursor-pointer hover:scale-110"><FaHistory size = {24}/></div></Link>
          <div className=" absolute bottom-[0px] right-3 text-xl sm:text-3xl">{result}</div>
        </motion.div>

        <motion.div 
        initial = {calculatorAnimator.calculatorBody.initial}
        animate= {controlsCalculatorBody}
        className=" bg-gray-200 min-h-[69dvh]  ">
           {/* clear, del , Off buttons container */}
          <motion.div
          initial = {calculatorAnimator.calculatorButtons.initial}
          animate = {controlsCalculatorButtons}
          exit = {calculatorAnimator.calculatorButtons.exit}
          className=" rounded-b-full flex justify-between items-center bg-gray-400 h-21">
            <div>
              <button onClick={handleClear} className="transition-all duration-300 hover:scale-105 hover:bg-red-600 ml-6 py-2 px-4 md:px-7 md:py-3 cursor-pointer rounded-full bg-red-800 text-white font-mono">
                <p>Clear</p>
              </button>
              <button onClick={handleDel} className="md:px-7 md:py-3 transition-all duration-300 hover:scale-105 hover:bg-red-600 ml-2 sm:ml-4 py-2 px-4 cursor-pointer rounded-full bg-red-800 text-white font-mono">
                Del
              </button>
            </div>
            <div>
              <button 
              onClick = {handleSwitchOff}
              className=" transition-all duration-300 hover:scale-105 hover:bg-green-600 mr-6 py-2 px-7.5 md:px-10.5 md:py-3 cursor-pointer rounded-full bg-green-800 text-white font-mono">
                <p>OFF</p>
              </button>
            </div>
          </motion.div>
          <div className="flex  ml-[7dvh] md:ml-[10dvh] lg:ml-[20dvh] xl:ml-[28dvh] mt-[15%] sm:mt-[12%] md:mt-[8%] lg:mt-[5%]">
            {/* opreations and numbers buttons */}
            <motion.div 
            initial = {calculatorAnimator.calculatorButtons.initial}
            animate = {controlsCalculatorButtons}
            exit = {calculatorAnimator.calculatorButtons.exit}
            className="grid gap-x-0 gap-y-3 grid-cols-4 w-[100%] ">
              <button
                onClick={selectOperation}
                className="md:max-w-30 md:h-15 max-w-13 sm:max-w-22 transition-all duration-300 hover:scale-105 cursor-pointer  text-center text-xl text-white bg-gray-600 rounded-lg font-semibold py-2"
              >
                +
              </button>
              <button
                onClick={selectOperation}
                className="md:max-w-30 md:h-15 max-w-13 sm:max-w-22 transition-all duration-300 hover:scale-105 cursor-pointer  text-center text-xl text-white bg-gray-600 rounded-lg font-semibold py-2"
              >
                -
              </button>
              <button
                onClick={selectOperation}
                className="md:max-w-30 md:h-15 max-w-13 sm:max-w-22 transition-all duration-300 hover:scale-105 cursor-pointer  text-center text-xl text-white bg-gray-600 rounded-lg font-semibold py-2.5"
              >
                *
              </button>
              <button
                onClick={selectOperation}
                className="md:max-w-30 md:h-15 max-w-13 sm:max-w-22 transition-all duration-300 hover:scale-105 cursor-pointer  text-center text-xl text-white bg-gray-600 rounded-lg font-semibold py-2"
              >
                /
              </button>
              {Array.from({ length: 10 }, (_, index) => (
                <button
                  onClick={() => numberClicked(index)}
                  className="md:max-w-30 md:h-15 max-w-13 sm:max-w-22 text-lg font-semibold text-white cursor-pointer transition-all duration-300 hover:scale-105  py-2 rounded-lg text-center bg-gray-600"
                  key={index}
                >
                  {index}
                </button>
              )).reverse()}
              <button onClick={()=>{numberClicked(".")}} className="md:max-w-30 md:h-15 max-w-13 sm:max-w-22 transition-all duration-300 hover:scale-105 cursor-pointer  text-center text-xl text-white bg-gray-600 rounded-lg font-semibold py-0.5">
                .
              </button>
              <button
                onClick={()=>{setResult(Calculate())}}
                className="md:max-w-30 md:h-15 max-w-13 sm:max-w-22 transition-all duration-300 hover:scale-105 cursor-pointer  text-center bg-gray-600 rounded-lg py-2 text-white font-semibold"
              >
                =
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
    </AnimatePresence>
  );
};

// scrollbar-hide hides the scrollbar that appears when someone  sets overflow-x-auto and width exceeds container width
// but for it to work you must have installed tailwinf-scrollbar-hide plugin for it to work
// split method understands " "(single space) as seperating string elements into different array
// split understands "  "(double) space as " "(single space) in strings that is to be turned to array
// splice on the other hand understatnds "" to be single space in array
// new things learnt
// splice, split, slice, for loop while loop, 
// border-4 xl:border-green-700 sm:border-amber-300 md:border-b-blue-700 lg:border-red-900
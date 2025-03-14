
export const calculatorAnimator = {
    calculatorScreen : {
        initial:{
            opacity: 0
        },
        animate: {
            opacity: [0,1]
        },
        transition: {
            delay: 0.5,
            duration: 1.5
        },
        exit: {}
    },
    calculatorBody : {
        initial:{
            opacity: 0
        },
        animate: {
            opacity: [0,1]
        },
        transition: {
          delay: 2.1,
          duration: 1.2
        },
        exit: {}
    },
    calculatorButtons : {
       initial: {
        opacity: 1,
        translateY: 10
       },
       animate: {
        translateY: [10, 0],
        opacity: [0,1]
       },
       transition: {
        delay: 3.1,
        duration: 1.3
       },
       exit: {}
    }, 
    calculatorOnButton: {
        initial: {
            opacity:0
        },
        animate: {
            opacity: [0,1]
        },
        transition: {
            delay:0.5,
            duration: 1
        },
        exit: {}
    },

    calculatorOff : {
         initial :{
            opacity: 1
         },
         animate: {
            opacity: [1,0]
         },
         transition: {
            duration: 1
         },

    }
}

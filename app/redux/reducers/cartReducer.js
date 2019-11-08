

import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, ADD_QUANTITY, SUB_QUANTITY } from '../actions/types';
import axios from 'axios';
import property from '../../../config'
import { Switch } from 'native-base';

const initialState = {

    cart: [],
    total: 0,
}
export default function (state = initialState, action) {

    if (action.type === ADD_TO_CART) {
        alert("ADD_TO_CART function")
        let addedItem = action.payload

        const data = state.cart.filter(function (item) {
            return item._id == addedItem._id;
        })

        if (data.length == 1) {
            // addedItem.quantity += 1
            // const remove = state.cart.filter(function (item) {       //  remove ones added item
            //     return item._id !== addedItem._id;
            // })
            alert(' item alrady added')
            return {
                ...state,
                total: state.total,
                cart: state.cart
            }
        }
        if (data.length == 0) {
            addedItem.quantity = 1;
            // alert(addedItem.quantity)
            alert(JSON.stringify(addedItem))
            let newTotal = state.total + addedItem.price

            return {

                ...state,
                cart: [...state.cart, addedItem],
                total: newTotal

            }
        }

    }

    else if (action.type === EMPTY_CART) {
        return {
            ...state,
            cart: [],
            total: 0
        }
    }

    else if (action.type === REMOVE_FROM_CART) {
        alert("REMOVE_FROM_CART function")
        return {
            ...state,
            cart: state.cart.filter((item, i) => i !== action.payload.index),
            total: state.total - action.payload.price * action.payload.quantity
        }

    }

    //INSIDE CART COMPONENT


    else if (action.type === ADD_QUANTITY) {

        alert("ADD_QUANTITY function")

        let addQuantityItem = action.payload
        alert(JSON.stringify(addQuantityItem))
        const data = state.cart.filter(function (item) {
            return item._id == addQuantityItem._id;
        })


        if (data.length !== 0) {
            data.quantity += 1
            // alert('alrasy added' + addedItem.quantity)

            return {
                ...state,
                total: state.total + addQuantityItem.price
            }
        }
        else {
            return {
                ...state,
                cart: [...state.cart],
                total: [...state.total]
            }
        }

    }

    else if (action.type === SUB_QUANTITY) {

        alert("SUB_QUANTITY function")
        let removeItemQuantity = action.payload

        // console.log(removeItemQuantity)

        const data = state.cart.filter(function (item) {
            return item._id == removeItemQuantity._id
        })

        if (data.quantity > 1) {
            data.quantity -= 1

            return {
                ...state,
                total: state.total - data.price
            }
        }
        else {
            const afterRemove = state.cart.filter(function (item) {
                return item._id != data._id;
            })
            return {
                ...state,
                total: state.total - data.price,
                cart: afterRemove
            }
        }

    }
    else {
        return state
    }
}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////             using Switch Case 


// import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, ADD_QUANTITY, SUB_QUANTITY } from '../actions/types';
// import axios from 'axios';
// import property from '../../../config'

// const initialState = {

//     cart: [],
//     total: 0,
// }
// export default function (state = initialState, action) {

//     switch (action.type) {


//         case ADD_TO_CART: {
//             alert("ADD_TO_CART function")
//             let addedItem = action.payload

//             const data = state.cart.filter(function (item) {
//                 return item._id == addedItem._id;
//             })
//             // alert(data.length)

//             ////////////////////////////////////////////////////////////////////        use this part for increment quqntity

//             if (data.length == 1) {
//                 // addedItem.quantity += 1
//                 const remove = state.cart.filter(function (item) {
//                     return item._id !== addedItem._id;
//                 })
//                 alert(' remove added item')
//                 return {
//                     ...state,
//                     total: state.total,
//                     cart: remove
//                 }
//             }
//             if (data.length == 0) {
//                 addedItem.quantity = 5;
//                 // alert(addedItem.quantity)
//                 // alert(JSON.stringify(addedItem))
//                 let newTotal = state.total + addedItem.price

//                 return {

//                     ...state,
//                     cart: [...state.cart, addedItem],
//                     total: newTotal

//                 }
//             }

//         }

//         case EMPTY_CART: return {
//             ...state,
//             cart: [],
//             total: 0
//         }

//         case REMOVE_FROM_CART: {
//             alert("REMOVE_FROM_CART function")
//             return {
//                 ...state,
//                 cart: state.cart.filter((item, i) => i !== action.payload.index),
//                 total: state.total - action.payload.price
//             }

//         } 

//         //INSIDE CART COMPONENT
//         case ADD_QUANTITY: {

//             // let increment = action.payload
//             // const addedItem = state.cart.filter(function (item) {
//             //     return item._id == increment._id;
//             // })

//             // addedItem.quantity += 1
//             // let newTotal = state.total + addedItem.price
//             // return {
//             //     ...state,
//             //     total: newTotal
//             // }

//             /////////////////////////////////////////////////////////////////////

//             alert("ADD_QUANTITY function")

//             let incrementItem = action.payload

//             const data = state.cart.filter(function (item) {
//                 return item._id == incrementItem._id;
//             })
//             // alert(data.length)

//             ////////////////////////////////////////////////////////////////////        use this part for increment quqntity

//             if (data.length !== 0) {
//                 incrementItem.quantity += 1
//                 // alert('alrasy added' + addedItem.quantity)
//                 return {
//                     ...state,
//                     total: state.total + incrementItem.price
//                 }
//             }
//             else{
//                 return{
//                 ...state,
//                 cart: [...state.cart],
//                 total: [...state.total]
//             }
//             }

//         }

//         case SUB_QUANTITY:  {
//             // let increment = action.payload
//             // const addedItem = state.cart.filter(function (item) {
//             //     return item._id == increment._id;
//             // })

//             // if (addedItem.quantity === 1) {
//             //     let new_items = state.cart.filter(item => item._id !== increment._id)
//             //     let newTotal = state.total - addedItem.price
//             //     return {
//             //         ...state,
//             //         cart: new_items,
//             //         total: newTotal
//             //     }
//             // }
//             // else {
//             //     addedItem.quantity -= 1
//             //     let newTotal = state.total - addedItem.price
//             //     return {
//             //         ...state,
//             //         total: newTotal
//             //     }
//             // }

//             ////////////////////////////////////////


//             alert("SUB_QUANTITY function")
//             let decrementItem = action.payload
//             // alert(JSON.stringify(decrementItem))
//             const data = state.cart.filter(function (item) {
//                 return item._id == decrementItem._id;
//             })

//             if (data.quantity !== 1) {
//                 decrementItem.quantity -= 2

//                 return {
//                     ...state,
//                     total: state.total - decrementItem.price
//                 }
//             }
//             else {
//                 const afterRemove = state.cart.filter(function (item) {
//                     return item._id != decrementItem._id;
//                 })
//                 return {
//                     ...state,
//                     total: newTotal,
//                     cart: afterRemove
//                 }
//             }

//             ///////////////////////////////////////

//             // let addedItem = action.payload

//             // const data = state.cart.filter(function (item) {
//             //     return item._id == addedItem._id;
//             // })
//             // // alert(data.length)


//             // if (data.length) {
//             //     addedItem.quantity += 1
//             //     // alert('alrasy added' + addedItem.quantity)
//             //     return {
//             //         ...state,
//             //         total: state.total + addedItem.price
//             //     }
//             // }

//         }
//         default: return state
//     }

// }

// // export default cartReducer















// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// // import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SUB_QUANTITY,ADD_QUANTITY } from '../actions/types';
// // const initialState = {
// //     cart: [],
// //     total: 0,
// // }
// // export default function(state=initialState, action) {
// //     switch(action.type){
// //         case ADD_TO_CART:
// //             return {
// //                 ...state,
// //                 cart: [action.payload, ...state.cart],
// //                 total: state.total + action.payload.cost
// //             }
// //         case EMPTY_CART:
// //             return {
// //                 ...state,
// //                 cart: [],
// //                 total: 0
// //             }
// //         case REMOVE_FROM_CART:
// //             return {
// //                 ...state,
// //                 cart: state.cart.filter((item, i) => i !== action.payload.index),
// //                 total: state.total - action.payload.item.cost
// //             }
// //         default:
// //             return state
// //     }
// // }
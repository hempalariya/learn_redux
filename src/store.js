import { combineReducers, createStore } from "redux"

const initialStateAccount= {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

const initialStateCustomer ={
    fullName: "",
    nationalId: '',
    createdAt: ''
}


function accoutnReducer (state = initialStateAccount, action){
    switch(action.type){
        case "account/deposit":
            return {...state, balance: state.balance + action.payload}
        case "account/withdraw":
            return {...state, balance: state.balance - action.payload}
        case "account/requestLoan":
            return {...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount}
        case "account/payLoan":
            return {...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan}
        default:
            return state
    }
}


function customerReducer (state = initialStateCustomer, action){
    switch(action.type){
        case 'customer/createCustomer':
            return {...state, fullName: action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt}

        case 'customer/updateName':
            return {...state, fullName: action.payload}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    account: accoutnReducer,
    customer: customerReducer
})
const store = createStore(rootReducer)

// store.dispatch({type: "account/deposit", payload: 500})
// console.log(store.getState())
// store.dispatch({type: "account/withdraw", payload: 200})
// console.log(store.getState())
// store.dispatch({type: "account/requestLoan", payload:{
//     amount: 500, purpose: "to buy a laptop"
// }})
// console.log(store.getState())
// store.dispatch({type: "account/payLoan"})
// console.log(store.getState())


//action creators

function deposit(amount){
    return {type: "account/deposit", payload: amount}
}

function withdraw(amount){
    return {type: "account/withdraw", payload: amount}
}

function requestLoan(amount, purpose){
    return {type: "account/requestLoan", payload: {amount: amount, purpose: purpose}}
}

function payLoan(){
    return {type: "account/payLoan"}
}

store.dispatch(deposit(500))
console.log(store.getState())
store.dispatch(withdraw(300))
console.log(store.getState())
store.dispatch(requestLoan(800, 'to buy a laptop'))
console.log(store.getState())
store.dispatch(payLoan())
console.log(store.getState())
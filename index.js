const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

//String Constants
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

//Object having type property
// {
//     type :BUY_CAKE,
//     info :'First redux action'
// }

//Action creater
function buyCake(){
    return {
        type :BUY_CAKE,
        info :'First redux action'
    }
}

function buyIcecream(){
    return{
        type :BUY_ICECREAM,
        info : 'First redux action'
    }
}

//(previousStae,action) =>newState
// const initialState = {
//     numOfCakes :10,
//     numOfIcecreams:20
// }
//separate state
const initialCakeState = {
    numOfCakes :10
}
const initialIceCreamState = {
    numOfIcecreams :10
}

//Reducer function
// const reducer = (state = initialState,action)=>{
//     switch(action.type){
//         case BUY_CAKE :return {
//             ...state, //copy and update
//             numOfCakes :state.numOfCakes -1
//         }
        
//         case BUY_ICECREAM:return{
//             ...state,
//             numOfIcecreams :state.numOfIcecreams -1
//         }
//         default :return state
//     }
// }

const cakeRducer = (state = initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE :return {
            ...state, //copy and update
            numOfCakes :state.numOfCakes -1
        }
        default :return state
    }
}
const iceCreamReducer = (state = initialIceCreamState,action)=>{
    switch(action.type){        
        case BUY_ICECREAM:return{
            ...state,
            numOfIcecreams :state.numOfIcecreams -1
        }
        default :return state
    }
}
//combine reducers
const rootReducer = combineReducers({
    cake : cakeRducer,
    icecream : iceCreamReducer
})

// const store = createStore(reducer)
const store = createStore(rootReducer,applyMiddleware(logger))
console.log('Initial State', store.getState());
const unsubscribe = store.subscribe(()=>{})
// const unsubscribe = store.subscribe(()=>console.log('Updated state',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()

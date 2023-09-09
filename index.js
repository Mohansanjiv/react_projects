const redux = require('redux');
const createStore =redux.createStore;
const bindActionCreators= redux.bindActionCreators;
const combineReducers=redux.combineReducers ;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED='CAKE_RESTOCKED';
const ICECREAM_ORDERED='ICECREAM_ORDERED';
const ICECREAM_RESTOCKED='ICECREAM_RESTOCKED';

function buyCake(){
    return{
        type:CAKE_ORDERED,
        payload:1,
    }
}
function restockeCake(Qty=1){
    return{
        type:CAKE_RESTOCKED,
        payload:Qty,
    }
}
function iceCreamOrder(qty=1){
    return{
        type:ICECREAM_ORDERED,
        payload:qty,
    }
}
function iceCreamRestocke(qty=1){
    return{
        type:ICECREAM_RESTOCKED,
        payload:qty,
    }
}

const intialCakeState ={
    numOfCakes:10,
}
const intialIceCreamState ={
    numOfIceCream:20,
}

const cakeReducer = (state=intialCakeState,action)=>{
    switch(action.type)
    {
      case CAKE_ORDERED:
        return{
            ...state,
            numOfCakes:state.numOfCakes-1,
        }
        case CAKE_RESTOCKED:
            return{
                ...state,
                numOfCakes:state.numOfCakes + action.payload,
            }
        default:
             return state
    }
}
const IceCreamReducer = (state=intialIceCreamState,action)=>{
    switch(action.type)
    {
    case ICECREAM_ORDERED:
        return{
            ...state,
            numOfIceCream:state.numOfIceCream-1,
        }
    case ICECREAM_RESTOCKED:
            return{
                ...state,
                numOfIceCream:state.numOfIceCream + action.payload,
            }
        default:
             return state
    }
}
const rootReducer =combineReducers({
    cake:cakeReducer,
    iceCream:IceCreamReducer
})
const store = createStore(rootReducer);
console.log('intial state', store.getState());
const unsubscribe =  store.subscribe(()=>{
   console.log( 'updated state',store.getState());
})

const Actions =bindActionCreators({buyCake, restockeCake,iceCreamOrder,iceCreamRestocke},store.dispatch)
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(restockeCake(3000));
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());

Actions.buyCake();
Actions.buyCake();
Actions.restockeCake(5);
Actions.iceCreamOrder();
Actions.iceCreamRestocke(15);
unsubscribe();

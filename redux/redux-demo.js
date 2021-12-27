const redux = require("redux")

//==REDUCER FUNCTION============
const counterReducer = (state = { counter: 0 }, action)=>{
    if(action.type==='increment'){
        return{
        counter: state.counter + 1
    }
    }

    if(action.type==='decrement'){
        return{
            counter: state.counter -1
        }
    }

    return state;
    
}

//===REDUX STORE================
const store = redux.createStore(counterReducer)



//===SUBSCRIPTION===============
const counterSubscriber = () => {
    const latestState = store.getState()
    console.log(latestState);
}


store.subscribe(counterSubscriber);

store.dispatch({ type: 'increment' })
store.dispatch({ type: 'decrement' })
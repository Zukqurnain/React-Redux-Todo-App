// if you want to show initial data :)
// const INITIAL_DATA =  [
//     {
//         id: 0,
//         text: 'Walk the Dog',
//     },
//     {
//         id:1,
//         text: 'learn Redux',

//     },
// ]

import { ADD_TODO,DELETE_TODO, GET_TODO, COMPLETE_TODO} from './action';


const INITIAL_DATA = [
    {id : 1 , todo : 'add task 1' , complete : false , delete : false},
    {id : 2 , todo : 'add task 2' , complete : false , delete : false}, 
    {id : 3 , todo : 'add task 3' , complete : false , delete : false},
    {id : 4 , todo : 'add task 4' , complete : false , delete : false},
    {id : 5 , todo : 'add task 5' , complete : false , delete : false},
    {id : 6 , todo : 'add task 6' , complete : false , delete : false}
  ]


const TodoReducer = (state=INITIAL_DATA, action) => {
    switch (action.type){
        case GET_TODO:
        return [
            ...state
        ]
        case ADD_TODO:
            alert('FFFF')
            console.log(state , action);
        return [
            ...state,{
                id: Math.floor(Math.random() * 1000),
                todo: action.todo,
                completed: false,
                delete : false
            }
        ]
        case COMPLETE_TODO:
            let ab = state.map(arr => action.id === arr.id ? {
                id : arr.id,
                todo : arr.todo,
                complete : true,
                delete : false
            } : arr );
            console.log(action , ab)
         return ab
        case DELETE_TODO:
                let abs = state.map(arr => action.id === arr.id ? {
                    id : arr.id,
                    todo : arr.todo,
                    complete : arr.complete,
                    delete : true
                } : arr );
                console.log(action , abs)
        return abs
        default:
        return state;
    }
}

export default TodoReducer;
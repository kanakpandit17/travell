export const addoption = (id,indexposition) =>{
    return (dispatch) => {
        dispatch({
            type: 'add',
            payload: id,
            position:indexposition
        })
    }
}

export const deleteoption = (id,indexposition) =>{
    console.log(indexposition)
    return (dispatch) =>{
        dispatch({
            type: 'delete',
            payload:id,
            position:indexposition
        })
    }
}

export let UserSelecOption=(Qu,In)=>
{
    return{
        type:"Selected",
        payload:{
            Qu,
            In
        }
    }
}

export let Inc=()=>
{
    return{
        type:"Inc"
    }
}
export let Dec=()=>
{
    return{
        type:"Dec"
    }
}
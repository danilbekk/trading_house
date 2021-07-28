const initialState = {
    items: []
}

export  default function reducer(state = initialState, action) {
    switch (action.type) {
        case "status/load/fulfilled": 
        return {
            ...state,
            items: action.payload
        }
        case "status/create/fulfilled": 
        return {
            ...state,
            items: [...state.items, action.payload]
        }

        

        default: 
        return state
    }
}

export const loadStatuses = () => {
    return async dispatch => {
        const responce = await fetch('/statuses')
        const statuses = await responce.json()
        dispatch({
            type: 'status/load/fulfilled', payload: statuses
        })
    }
}

export const addStatus = (data) => {
    return async dispatch => {
        const responce = await fetch('/statuses',{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const status = await responce.json()
        dispatch({
            type: "status/create/fulfilled", payload: status
        })
    }
}
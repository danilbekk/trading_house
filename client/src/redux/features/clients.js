const initialState = {
  items: [],
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'clients/load/fulfilled':
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case 'client/load/pending':
      return {
        ...state,
        loading: true,
      };

    case 'client/create/fulfilled':
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
}

export const loadClients = () => {
  return async (dispatch) => {
    dispatch({
      type: 'client/load/pending',
    });
    const responce = await fetch('/clients');
    const clients = await responce.json();
    dispatch({
      type: 'clients/load/fulfilled',
      payload: clients,
    });
  };
};

export const addedClient = (data) => {
  return async (dispatch) => {
    const responce = await fetch('/clients', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const client = await responce.json();
    dispatch({
      type: 'client/create/fulfilled',
      payload: client,
    });
  };
};

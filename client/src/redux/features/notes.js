const initialState = {
  items: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'notes/load/fulfilled':
      return {
        ...state,
        items: action.payload,
      };

    case 'notes/create/fulfilled':
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'note/edit/fulfilled':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              ...action.payload,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}

export const loadNotes = () => {
  return async (dispatch) => {
    const responce = await fetch('/notes');
    const notes = await responce.json();

    dispatch({
      type: 'notes/load/fulfilled',
      payload: notes,
    });
  };
};

export const AddNote = (id, data) => {
  return async (dispatch) => {
    const responce = await fetch(`/notes/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const note = await responce.json();
    dispatch({
      type: 'notes/create/fulfilled',
      payload: note,
    });
  };
};

export const editNote = (id, data) => {
  return async (dispatch) => {
    const responce = await fetch(`/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const note = await responce.json();
    dispatch({
      type: 'note/edit/fulfilled',
      payload: note,
    });
  };
};

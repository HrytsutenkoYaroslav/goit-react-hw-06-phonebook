import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contacts',
  storage,
};

const initialState = {
  contacts: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      const contactId = action.payload;
      state.contacts = state.contacts.filter((contact) => contact.id !== contactId);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setContacts, addContact, removeContact, setFilter } = contactsSlice.actions;

export const persistedContactsReducer = persistReducer(persistConfig, contactsSlice.reducer);

export default persistedContactsReducer;

import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { v4 as uuidv4 } from 'uuid'; // Импорт функции для генерации уникального идентификатора

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
      const newContact = {
        ...action.payload,
        id: uuidv4(), // Генерация уникального идентификатора
      };
      state.contacts.push(newContact);
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

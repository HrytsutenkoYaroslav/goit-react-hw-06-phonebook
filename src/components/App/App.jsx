import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setContacts } from '../redux/contactsSlice';
import ContactForm from '../ContactForm/ContactForm';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import css from './App.module.css';

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      dispatch(setContacts(JSON.parse(storedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Телефонная книга</h1>
      <ContactForm />

      <h2 className={css.title}>Контакты</h2>
      <Filter />
      <ContactsList />
    </div>
  );
};

export default App;

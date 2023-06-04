import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import ContactForm from "../ContactForm/ContactForm";
import ContactsList from "../ContactsList/ContactsList";
import Filter from "../Filter/Filter";
import { addContact, deleteContact, setFilter } from '../redux/contactsSlice';
import css from "./App.module.css";

const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch(addContact(JSON.parse(storedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const addedContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (addedContact) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact(contact));
    }
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const getVisibleContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />

      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onFilterChange={handleFilterChange} />
      <ContactsList contacts={getVisibleContacts()} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;

import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from '../redux/contactsSlice';
import css from './ContactsList.module.css';
import PropTypes from 'prop-types';

const ContactsList = () => {
  const contacts = useSelector(state => state);
  const dispatch = useDispatch();

  const handleDelete = (contactId) => {
    dispatch(removeContact(contactId));
  };

  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <p className={css.text}>{name} : {number}</p>
          <button className={css.button} type="button" onClick={() => handleDelete(id)}>Delete</button>
</li>
))}
</ul>
);
};

ContactsList.propTypes = {
onDeleteContact: PropTypes.func.isRequired,
contacts: PropTypes.arrayOf(
PropTypes.shape({
id: PropTypes.string.isRequired,
name: PropTypes.string.isRequired,
number: PropTypes.string.isRequired,
})
).isRequired,
};

export default ContactsList;

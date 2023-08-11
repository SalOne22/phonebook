import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addContact } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors';
import { Form, Input, Label } from './ContactForm.styled';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = evt => {
    const { value, name } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setPhone(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const contactName = name.trim();

    if (
      contacts.find(
        contact => contactName.toLowerCase() === contact.name.toLowerCase(),
      )
    ) {
      toast.error(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, phone }));

    setName('');
    setPhone('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          onChange={handleChange}
          value={name}
          pattern="^[A-Za-z\u0080-\uFFFF ']+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          onChange={handleChange}
          value={phone}
          pattern="^(\+?[0-9.\(\)\-\s]*)$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>

      <button type="submit">Add contact</button>
    </Form>
  );
};

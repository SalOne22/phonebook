import * as yup from 'yup';
import { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from './RegisterForm.styled';
import { registerUser } from '../../redux/operations';
import { selectUserError } from '../../redux/selectors';

const nameRegExp = /^[A-Za-z\u0080-\uFFFF ']+$/;

const schema = yup
  .object({
    name: yup
      .string()
      .required('Name is a required field')
      .matches(
        nameRegExp,
        'Name may contain only letters, apostrophe, dash and spaces.',
      ),
    email: yup.string().required().email(),
    password: yup.string().min(7).required(),
  })
  .required();

export const RegisterForm = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const error = useSelector(selectUserError);

  const dispatch = useDispatch();

  const onSubmit = ({ name, email, password }) => {
    name = name.trim();
    email = email.trim();
    password = password.trim();

    return dispatch(registerUser({ name, email, password }));
  };

  useEffect(() => {
    if (error !== null)
      toast({
        title: error,
        status: 'error',
        isClosable: true,
      });
  }, [error, toast]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors.name}>
        <FormLabel>Name</FormLabel>
        <Input type="text" {...register('name')} />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input type="email" {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register('password')} />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <Button mt={6} type="submit" colorScheme="green" isLoading={isSubmitting}>
        Log in
      </Button>
    </Form>
  );
};

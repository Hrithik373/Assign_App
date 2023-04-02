import React, { FC } from 'react';
import  { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface signupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormCard = styled.div`
  width: 400px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const FormHeading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: bold;
  }

  input[type='text'],
  input[type='email'],
  input[type='password'] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 5px;
  color: #f00;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0070f3;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0060d6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;

  a {
    color: #0070f3;
    text-decoration: none;
  }
`;
/*async function signup(data: signupFormValues) {
  try {
    const response = await axios.post('http://localhost:3000/signup', data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });

    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error(error);
  }

  const onSubmit = async (data: signupFormValues) => {
    try {
      const responseData = await signup(data);
      console.log(JSON.stringify(responseData)); // log response data as JSON string
      responseData(responseData);
    } catch (error) {
      console.error(error);
    }
  };
  */
/*const signup: FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<signupFormValues>();
  const [responseData, setResponseData] = useState(null);

  const onSubmit = async (data: signupFormValues) => {
    try {
      const { data: responseData } = await axios.post('http://localhost:3000/signup', data, { 
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
});
      console.log(JSON.stringify(responseData)); // log response data as JSON string
      setResponseData(responseData);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  
  const validate = (field: keyof signupFormValues) => {
    const fieldValue = watch(field);
    const fieldError = errors[field];
    if (fieldError) {
      return fieldError.message;
    }
    switch (field) {
      case 'password':
        if (fieldValue.length < 6) {
          return 'Password must be at least 6 characters long.';
        }
        return null;
      case 'confirmPassword':
        if (fieldValue !== watch('password')) {
          return 'Passwords do not match.';
        }
        return null;
      default:
        return null;
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };*/

  /*
  const signup = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch
    } = useForm();
  
    const onSubmit = (data) => {
      console.log(data);
    };
  */

    const signup = () => {
      const {
        register,
        handleSubmit,
        formState: { errors },
        watch
      } = useForm();

     
      const [responseData, setResponseData] = useState(null);
    
      const onSubmit = (data) => {
        console.log(data);
        fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setResponseData(data);
          })
          .catch((error) => {
            console.error('There was an error!', error);
          });
      };

    return (
      <FormContainer>
        <FormCard>
          <FormHeading>Sign Up</FormHeading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <label htmlFor="firstName">First Name</label>
              <input type="text" {...register('firstName', { required: true })} />
              {errors.firstName && <ErrorMessage>This field is required</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" {...register('lastName', { required: true })} />
              {errors.lastName && <ErrorMessage>This field is required</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
              {errors.email && <ErrorMessage>This field is required</ErrorMessage>}
              {errors.email && errors.email.type === 'pattern' && (
                <ErrorMessage>Please enter a valid email address</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <input type="password" {...register('password', { required: true, minLength: 6 })} />
              {errors.password && errors.password.type === 'required' && (
                <ErrorMessage>This field is required</ErrorMessage>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <ErrorMessage>Password must be at least 6 characters long</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword', { required: true, minLength: 6, validate: (value) => value === watch('password') })}
              />
              {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
                <ErrorMessage>This field is required</ErrorMessage>
              )}
              {errors.confirmPassword && errors.confirmPassword.type === 'minLength' && (
                <ErrorMessage>Password must be at least 6 characters long</ErrorMessage>
              )}
              {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
                <ErrorMessage>Passwords must match</ErrorMessage>
              )}
            </FormGroup>
            <SubmitButton type="submit">Sign Up</SubmitButton>
          </form>
          </FormCard>
        </FormContainer>
      );
  };

export default signup;
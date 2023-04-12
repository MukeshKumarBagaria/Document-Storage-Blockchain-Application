import React, { useState } from 'react';
import './form.css';

const Form = () => {
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleFormType = (type) => {
    setFormType(type);
  };

  const handleLogin = async () => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
try {
  
  const response = await fetch('http://localhost:3001/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });
  const data = await response.json();
  console.log(data);
} catch (error) {
  throw error;
}
  };

  const handleSignup = async () => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);

    const response = await fetch('http://localhost:3001/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === 'login') {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="form-container">
      <h2>{formType === 'login' ? 'Log in' : 'Sign up'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {formType === 'signup' && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <button type="submit">{formType === 'login' ? 'Log in' : 'Sign up'}</button>
      </form>
      <p>
        {formType === 'login'
          ? "Don't have an account?"
          : 'Already have an account?'}
        <span onClick={() => handleFormType(formType === 'login' ? 'signup' : 'login')}>
          {formType === 'login' ? 'Sign up' : 'Log in'}
        </span>
      </p>
    </div>
  );
};
export default Form;
import { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
    const password = (event.target as HTMLFormElement).elements.namedItem('password') as HTMLInputElement;
    console.log('Email:', email.value);
    console.log('Password:', password.value);
  };

  handleSignup = () => {
    window.location.href = "/signup";
  }

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <form style={{ backgroundColor: '#fff', padding: 40, borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }} onSubmit={this.handleSubmit}>
          <h2 style={{ marginBottom: 20 }}>Login</h2>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 5 }}>Email:</label>
          <input type="email" id="email" name="email" style={{ padding: 10, fontSize: 16, width: '100%', borderRadius: 5, border: '1px solid #ccc', marginBottom: 20 }} required />

          <label htmlFor="password" style={{ display: 'block', marginBottom: 5 }}>Password:</label>
          <input type="password" id="password" name="password" style={{ padding: 10, fontSize: 16, width: '100%', borderRadius: 5, border: '1px solid #ccc', marginBottom: 20 }} required />

          <button type="submit" style={{ backgroundColor: '#007aff', color: '#fff', padding: 10, borderRadius: 5, border: 'none', width: '100%', fontSize: 16 }}>Login</button>
          <p style={{ textAlign: 'center', marginTop: 20 }}>
            Don't have an account? <button onClick={this.handleSignup} style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}>Sign up</button>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
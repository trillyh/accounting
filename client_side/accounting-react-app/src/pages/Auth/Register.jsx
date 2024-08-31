function Register() {
  return (
    <>
     <form id="register-form">
      <label htmlFor="register-username">Username</label>
      <input type="text" id="register-username" required />
      
      <label htmlFor="register-email">Email</label>
      <input type="email" id="register-email" required />
      
      <label htmlFor="register-password">Password</label>
      <input type="password" id="register-password" required />
      
      <button type="submit">Register</button>
    </form>
    <p className='notice'>Password will be encrypted with PBKDF2 algorithm with a SHA256 hash</p>       
    </>

  );
}

export default Register;


function Login() {
  return (
    <form id="login-form">
      <label htmlFor="login-username">Username</label>
      <input type="text" id="login-username" required />
      
      <label htmlFor="login-password">Password</label>
      <input type="password" id="login-password" required />
      
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
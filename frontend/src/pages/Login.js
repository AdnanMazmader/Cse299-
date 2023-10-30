import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import '../styles.css'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();

    await login(email, password);
    navigate("/")
  };
  return (
    <div className="container h-100 ">
      {/* <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-4">
          <form className="form-example" onSubmit={handleSubmit} method="post">
            <h1 className="text-center">Login</h1>

            <div className="form-group  my-3">
              <input
                className="form-control "
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="Email Address"
              />
            </div>

            <div className="form-group my-3">
              <input
                className="form-control "
                placeholder="Password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="text-center">
              <button
                disabled={isLoading}
                type="submit"
                className="mt-3 btn btn-success "
              >
                Sign up
              </button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div> */}
      <div class="center">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} method="post">
          <div class="txt_field">
            <input type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required />
            <span></span>
            <label>Email</label>
          </div>
          <div class="txt_field">
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password} required />
            <span></span>
            <label>Password</label>
          </div>
          <div class="pass">Forgot Password?</div>
          <input type="submit" value="Login" />
          <div class="signup_link">
            Not a member? <a href="/signup">Signup</a>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

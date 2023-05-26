import { useState } from "react";
import { loginRequest, LoginRequestInterface } from "utils/api/authentication";
import { DefaultResponseInterface } from "utils/api/default";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("Test");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: LoginRequestInterface = {
      user: {
        email: email,
        password: password,
      },
    };
    const response: DefaultResponseInterface = await loginRequest(user);
    setError(response.message);
  };
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              {error && (
                <ul className="error-messages">
                  <li>{error}</li>
                </ul>
              )}
              <ul className="danger-messages">
                <li>test</li>
              </ul>
              <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
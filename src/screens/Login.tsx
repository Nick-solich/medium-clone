import { useState } from "react";
import { loginRequest, UserInterface } from "utils/api/authentication";
import { DefaultResponseInterface } from "utils/api/default";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: DefaultResponseInterface = await loginRequest({
      user: {
        email: email,
        password: password,
      },
    });
    if (response.ok) {
      const data: UserInterface = JSON.parse(response.message);
      cookies.set("user", data, {
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: true,
        sameSite: "none",
      });
      navigate("/#");
      navigate(0);
    }
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

import { useEffect, useState } from "react";
import { UserInterface } from "utils/api/authentication";
import { useCookies } from "react-cookie";

export default function Navbar(): JSX.Element {
  const [cookies, setCookie] = useCookies(["user"]);
  const [user, setUser] = useState<UserInterface>();

  useEffect(() => {
    if (cookies.user) {
      const user: UserInterface = cookies.user;
      setUser(user);
    }
  }, [cookies]);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/#/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" class when you're on that page" */}
            <a className="nav-link active" href="/#/">
              Home
            </a>
          </li>
          {user && (
            <li className="nav-item">
              <a className="nav-link" href="/#/editor">
                <i className="ion-compose" />
                &nbsp;New Article
              </a>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <a className="nav-link" href="/#/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </a>
            </li>
          )}
          {!user && (
            <li className="nav-item">
              <a className="nav-link" href="/#/login">
                Sign in
              </a>
            </li>
          )}
          {!user && (
            <li className="nav-item">
              <a className="nav-link" href="/#/register">
                Sign up
              </a>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <a className="nav-link" href="/#/logout">
                &nbsp;Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

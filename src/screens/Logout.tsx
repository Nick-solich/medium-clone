import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Logout(): JSX.Element {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    removeCookie("user");
    navigate("/#");
    navigate(0);
  };

  return (
    <>
      <div className="logout-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Do you want to logout?</h1>

              <form onSubmit={handleSubmit}>
                <fieldset>
                  <button className="btn btn-lg btn-outline-danger">Logout</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

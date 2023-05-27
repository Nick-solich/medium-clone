import { MouseEventHandler, useEffect, useState } from "react";
import ArticlePreview from "components/ArticlePreview";
import { ProfileInterface, profileRequest } from "utils/api/profile";
import { DefaultResponseInterface } from "utils/api/default";
import { useLocation } from "react-router-dom";
import { ArticlesInterface, articlesByAuthorRequest } from "utils/api/articles";
import { Cookies } from "react-cookie";
import { UserInterface } from "utils/api/authentication";

export default function Profile(): JSX.Element {
  const [profile, setProfile] = useState<ProfileInterface>();
  const [articles, setArticles] = useState<ArticlesInterface>();
  const location = useLocation();
  const cookies = new Cookies();

  useEffect(() => {
    const user: UserInterface = cookies.get("user");
    if (user) {
      fetchProfile(user.user.token);
    } else {
      fetchProfile();
    }
    fetchArticles();
  }, [location]);

  const fetchProfile = async (token?: string) => {
    const locationProfile = window.location.hash.split("/").pop();
    if (!locationProfile) return;
    let response: DefaultResponseInterface;
    if (token) {
      response = await profileRequest(locationProfile, token);
    } else {
      response = await profileRequest(locationProfile);
    }
    if (!response.ok) {
      window.location.href = "/#";
      window.location.reload();
    }
    setProfile(JSON.parse(response.message));
  };

  const fetchArticles = async () => {
    const locationProfile = window.location.hash.split("/").pop();
    if (!locationProfile) return;
    const response: DefaultResponseInterface = await articlesByAuthorRequest(locationProfile);
    if (response.ok) {
      setArticles(JSON.parse(response.message));
    }
  };

  const handleOnClick = (e: any) => {
    e.preventDefault();
    console.log("test");
    // }
  };
  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" />
                <h4>{profile?.profile.username}</h4>
                <p>{profile?.profile.bio}</p>
                <button className="btn btn-sm btn-outline-secondary action-btn" onClick={handleOnClick}>
                  {profile?.profile.following ? <i className="ion-checkmark" /> : <i className="ion-plus-round" />}
                  &nbsp; {profile?.profile.following ? "Unfollow" : "Follow"} {profile?.profile.username}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      {profile?.profile.username} Articles
                    </a>
                  </li>
                </ul>
              </div>

              {articles?.articles.map(article => (
                <ArticlePreview key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

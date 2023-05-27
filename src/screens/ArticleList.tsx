import ArticleListSidebar from "components/ArticleListSidebar";
import ArticlePreview from "components/ArticlePreview";
import { DefaultResponseInterface } from "utils/api/default";
import { articlesRequest, ArticlesInterface } from "utils/api/articles";
import { useEffect, useState } from "react";

export default function ArticleList(): JSX.Element {
  const [articles, setArticles] = useState<ArticlesInterface>();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const response: DefaultResponseInterface = await articlesRequest();
    if (response.ok) {
      setArticles(JSON.parse(response.message));
    }
  };

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
              {articles?.articles.map((article, idx) => (
                <ArticlePreview key={idx} article={article} />
              ))}
            </div>

            <div className="col-md-3">
              <ArticleListSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

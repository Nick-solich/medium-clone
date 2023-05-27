import { DefaultResponseInterface } from "./default";

export interface ArticleRequestInterface {
  slug: string;
}

export interface ArticlesInterface {
  articles: [
    {
      slug: string;
      title: string;
      description: string;
      body: string;
      tagList: string[];
      createdAt: string;
      updatedAt: string;
      favorited: boolean;
      favoritesCount: number;
      author: {
        username: string;
        bio: string;
        image: string;
        following: boolean;
      };
    }
  ];
  articlesCount: number;
}
export interface ArticleInterface {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };
}

export async function articleRequest(slug: ArticleRequestInterface): Promise<DefaultResponseInterface> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/articles/${slug}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return { ok: true, status: 200, message: JSON.stringify(data) };
    } else if (response.status === 422) {
      return { ok: false, status: 422, message: "Error has occurred" };
    }
    return { ok: false, status: 404, message: "Error has occurred" };
  } catch (error) {
    return { ok: false, status: 500, message: "Fatal Error has occurred" };
  }
}

export async function articlesRequest(): Promise<DefaultResponseInterface> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/articles`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return { ok: true, status: 200, message: JSON.stringify(data) };
    } else if (response.status === 401) {
      return { ok: false, status: 401, message: "Unauthorize" };
    } else if (response.status === 422) {
      return { ok: false, status: 422, message: "Error has occurred" };
    }
    return { ok: false, status: 404, message: "Error has occurred" };
  } catch (error) {
    return { ok: false, status: 500, message: "Fatal Error has occurred" };
  }
}

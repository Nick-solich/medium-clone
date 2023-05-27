export interface ErrorResponseInterface {
  errors: {
    body: string[];
  };
}

export interface DefaultResponseInterface {
  ok: boolean;
  status: number;
  message: string;
}

export interface TagsInterface {
  tags: string[];
}

export async function tagsRequest(): Promise<DefaultResponseInterface> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/tags`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      const data: TagsInterface = await response.json();
      return { ok: true, status: 200, message: JSON.stringify(data) };
    } else if (response.status === 422) {
      return { ok: false, status: 422, message: "Error has occurred" };
    }
    return { ok: false, status: 404, message: "Error has occurred" };
  } catch (error) {
    return { ok: false, status: 500, message: "Fatal Error has occurred" };
  }
}

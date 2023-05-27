import { DefaultResponseInterface } from "./default";

export interface ProfileInterface {
  profile: {
    bio: string;
    following: boolean;
    image: string;
    username: string;
  };
}

export async function profileRequest(username: string): Promise<DefaultResponseInterface> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/profiles/${username}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      const data: ProfileInterface = await response.json();
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

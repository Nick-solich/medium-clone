import { DefaultResponseInterface } from "./default";

export interface LoginRequestInterface {
  user: {
    email: string;
    password: string;
  };
}
export interface UserInterface {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
}
export async function loginRequest(user: LoginRequestInterface): Promise<DefaultResponseInterface> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data: UserInterface = await response.json();
      return { ok: true, status: 200, message: JSON.stringify(data) };
    } else if (response.status === 401) {
      return { ok: false, status: 401, message: "Incorrect Email or Password" };
    } else if (response.status === 422) {
      return { ok: false, status: 422, message: "Error has occurred" };
    }
    return { ok: false, status: 404, message: "Error has occurred" };
  } catch (error) {
    return { ok: false, status: 500, message: "Fatal Error has occurred" };
  }
}

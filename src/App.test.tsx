import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./routes/App";

test("renders conduit link", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/conduit/i)[0];
  expect(linkElement).toBeInTheDocument();
});

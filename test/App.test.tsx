import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import App from "../src/Components/App";
import { MemoryRouter } from "react-router-dom";

test("renders my blabber mouth text", () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = getByText(/My Blabber Mouth/i);
  expect(linkElement).toBeInTheDocument();
});

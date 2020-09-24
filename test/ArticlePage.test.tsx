import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { ArticlePage } from "../src/Pages/ArticlePage";

test("renders Test Name in article page", () => {
  const { getByText } = render(
    <ArticlePage required={true} match={{ params: { name: "Test Name" } }} />
  );

  const linkElement = getByText(/Article - Test Name/i);
  expect(linkElement).toBeInTheDocument();
});

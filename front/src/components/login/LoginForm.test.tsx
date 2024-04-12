import { render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import { MemoryRouter as Router } from "react-router-dom";

describe("LoginForm", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    const form = screen.getByTestId(`login-form`);
    expect(form).toBeInTheDocument();
    const emailInput = screen.getByTestId(`emailInput`);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId(`passwordInput`);
    expect(passwordInput).toBeInTheDocument();
  });
});

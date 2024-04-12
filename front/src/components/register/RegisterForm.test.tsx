import { render, screen } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";
import { MemoryRouter as Router } from "react-router-dom";

describe("RegisterForm", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <RegisterForm />
      </Router>
    );

    const form = screen.getByTestId(`register-form`);
    expect(form).toBeInTheDocument();
    const emailInput = screen.getByTestId(`emailInput`);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId(`passwordInput`);
    expect(passwordInput).toBeInTheDocument();
    const fullNameInput = screen.getByTestId(`fullNameInput`);
    expect(fullNameInput).toBeInTheDocument();
  });
});

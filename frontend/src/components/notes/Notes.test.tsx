import { render, screen } from "@testing-library/react";
import { Notes } from "./Notes";
import { MemoryRouter as Router } from "react-router-dom";
describe("Notes Component", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <Notes />
      </Router>
    );

    const notesComponent = screen.getByTestId(`notes-component`);
    expect(notesComponent).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { Notes } from "./Notes";
describe("Notes Component", () => {
  it("renders correctly", () => {
    render(<Notes />);

    const notesComponent = screen.getByTestId(`notes-component`);
    expect(notesComponent).toBeInTheDocument();
  });
});

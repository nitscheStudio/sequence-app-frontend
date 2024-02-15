import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, userEvent } from "../utils/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import UploadSample from "../pages/UploadSample";
import { MockDataContextProvider } from "../context/MockContexts/MockInstrumentsGenreContext";

// Mock values
const mockGenres = [{ id: 1, name: "Ambient" }];
const mockInstruments = [{ id: 1, name: "Guitar" }];

describe("UploadSample Component - File Input Validations", () => {
  beforeEach(() => {
    userEvent.setup();
    render(
      <Router>
        <MockDataContextProvider>
          <UploadSample />
        </MockDataContextProvider>
      </Router>
    );
  });

  it("validates that error messages appear for the file input when the file is empty", async () => {
    // Fill out the form fields
    await userEvent.type(screen.getByLabelText(/Sample-Title:/i), "Test Title");
    await userEvent.type(screen.getByRole("spinbutton"), "120");
    await userEvent.selectOptions(screen.getByLabelText(/Key:/i), "C");
    await userEvent.selectOptions(screen.getByLabelText(/Scale:/i), "major");
    await userEvent.selectOptions(
      screen.getByLabelText(/Genre:/i),
      mockGenres[0].id.toString()
    );
    await userEvent.selectOptions(
      screen.getByLabelText(/Instrument:/i),
      mockInstruments[0].id.toString()
    );

    // Attempt to go to the next step
    await userEvent.click(screen.getByRole("button", { name: /Next Step/ }));

    // Check for the file selection error message
    expect(
      await screen.findByText(/Please select a file to upload./i)
    ).toBeInTheDocument();
  });
});

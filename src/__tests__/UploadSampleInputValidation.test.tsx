import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, userEvent } from "../utils/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import UploadSample from "../pages/UploadSample"; // Adjust the import path as necessary

describe("UploadSample Component - Input Field Validations", () => {
  beforeEach(() => {
    userEvent.setup();
    render(
      <Router>
        <UploadSample />
      </Router>
    );
  });

  it("validates that error messages appear for all required fields when the form is submitted empty", async () => {
    // Simulate submitting the form without filling out any fields
    await userEvent.click(screen.getByRole("button", { name: /Next Step/ }));

    // Retrieve all required 'input' fields (but type: number)
    const requiredInputFields = screen.getAllByRole("textbox");

    // Retrieve all required 'select' fields
    const requiredSelectFields = screen.getAllByRole("combobox");

    // Reetrieve input field type number
    const requiredNumberFields = screen.getAllByRole("spinbutton");

    const totalRequiredFields =
      requiredInputFields.length +
      requiredSelectFields.length +
      requiredNumberFields.length;

    const errorMessages = screen.getAllByText(/This field is required/i);

    // Check if number of error messages matches the number of required fields
    expect(errorMessages.length).toBe(totalRequiredFields);
  });

  it("validates custom validation for the 'BPM' field is below the minimum", async () => {
    // Find the number input field and simulate entering an invalid value within the forbidden range
    const numberInput = screen.getByRole("spinbutton");
    await userEvent.type(numberInput, "0");

    // Submit the form after entering the invalid number
    await userEvent.click(screen.getByRole("button", { name: /Next Step/ }));

    // Check for the custom validation error message related to the number field
    expect(screen.getByText(/Minimum value is 40/i)).toBeInTheDocument();
  });

  it("validates custom validation for the 'BPM' field when the value exceeds the maximum", async () => {
    // Find the number input field again
    const numberInput = screen.getByRole("spinbutton");

    // Clear the input field before typing to ensure it's empty
    await userEvent.clear(numberInput);
    // Simulate entering a value above the maximum
    await userEvent.type(numberInput, "250"); // Assuming 250 exceeds the maximum allowed value

    // Submit the form after entering the invalid number
    await userEvent.click(screen.getByRole("button", { name: /Next Step/ }));

    // Check for the custom validation error message for values above the maximum
    expect(screen.getByText(/Maximum value is 240/i)).toBeInTheDocument();
  });

  it("validates custom validation for sample-title when the input is less than 8 characters", async () => {
    const inputField = screen.getByRole("textbox", { name: /title/i });

    await userEvent.type(inputField, "short");

    await userEvent.click(screen.getByRole("button", { name: /Next Step/ }));

    expect(
      screen.getByText(/The Title must be at least 8 characters long/i)
    ).toBeInTheDocument();
  });
});

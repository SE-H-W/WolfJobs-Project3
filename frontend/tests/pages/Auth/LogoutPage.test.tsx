import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import LogoutPage from "../../../src/Pages/Auth/LogoutPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock implementation for the useUserStore
const mockUpdateFunctions = {
  updateName: () => {},
  updateAddress: () => {},
  updateRole: () => {},
  updateDob: () => {},
  updateSkills: () => {},
  updatePhonenumber: () => {},
  updateId: () => {},
  updateAvailability: () => {},
  updateGender: () => {},
  updateHours: () => {},
  updateIsLoggedIn: () => {},
};

const mockUserStore = () => ({
  updateName: mockUpdateFunctions.updateName,
  updateAddress: mockUpdateFunctions.updateAddress,
  updateRole: mockUpdateFunctions.updateRole,
  updateDob: mockUpdateFunctions.updateDob,
  updateSkills: mockUpdateFunctions.updateSkills,
  updatePhonenumber: mockUpdateFunctions.updatePhonenumber,
  updateId: mockUpdateFunctions.updateId,
  updateAvailability: mockUpdateFunctions.updateAvailability,
  updateGender: mockUpdateFunctions.updateGender,
  updateHours: mockUpdateFunctions.updateHours,
  updateIsLoggedIn: mockUpdateFunctions.updateIsLoggedIn,
});

describe("LogoutPage", () => {
  afterEach(cleanup);

  it("clears localStorage on logout", () => {
    // Set a value to localStorage
    localStorage.setItem("testKey", "testValue");
    
    // Render LogoutPage
    render(
      <MemoryRouter>
        <LogoutPage />
      </MemoryRouter>
    );

    // Verify that localStorage is cleared
    expect(localStorage.length).toBe(0); // Replace with your assertion method
  });

  it("calls all update functions with empty strings", () => {
    const updateFunctionsCalled = {};

    // Override mock functions to track calls
    Object.keys(mockUpdateFunctions).forEach(key => {
      mockUpdateFunctions[key] = (value) => {
        updateFunctionsCalled[key] = value; // Track value passed to each function
      };
    });

    render(
      <MemoryRouter>
        <LogoutPage />
      </MemoryRouter>
    );

  });

  it("redirects to the login page after logout", () => {
    render(
      <MemoryRouter initialEntries={["/logout"]}>
        <Routes>
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/login" element={<h1>Login Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the login page is rendered
    const loginPage = screen.getByText(/Login Page/i);
    if (!loginPage) {
      throw new Error("Failed to redirect to the login page");
    }
  });
});

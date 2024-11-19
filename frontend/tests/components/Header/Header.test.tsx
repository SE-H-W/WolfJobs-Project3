import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "../../../src/components/Header/Header";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { useUserStore } from "../../../src/store/UserStore";
import sinon from "sinon";

// Default mock user state values for missing properties
const defaultUserState = {
  name: "",
  email: "",
  password: "",
  address: "",
  dob: "",
  skills: "",
  phonenumber: "",
  id: "",
  availability: "",
  gender: "",
  hours: "",
  affiliation: "",
  resume: "",
  resumeId: "",
  unityId: "",
  studentId: "",
  isLoggedIn: false,
  role: ""
};

// Setting up mocks for user store with partial data
const setupUserStoreMock = (partialState) => {
  sinon.stub(useUserStore, "getState").returns({ ...defaultUserState, ...partialState });
};

// Helper function to render Header with routing
const renderWithRouter = (ui) => {
  return render(
    <MemoryRouter>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Header Component", () => {
  afterEach(() => {
    sinon.restore();
  });

  // Original Tests
  it("renders the logo", () => {
    renderWithRouter(<Header />);
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument(); // Use Jest's built-in matcher
    expect(logo).toHaveAttribute("src", "/images/wolfjobs-logo.png"); // Check src attribute
  });

  it("does not display 'My Listings' if user is not logged in", () => {
    setupUserStoreMock({ isLoggedIn: false });

    renderWithRouter(<Header />);

    const listingsItem = screen.queryByText("My Listings");
    expect(listingsItem).not.toBeInTheDocument(); // Use Jest's matcher for absence
  });

  // Snapshot Tests
  it("renders the Header component correctly when logged out", () => {
    setupUserStoreMock({ isLoggedIn: false });

    const { asFragment } = renderWithRouter(<Header />);
    expect(asFragment()).toMatchSnapshot(); // Snapshot test
  });

  it("renders the Header component correctly when logged in as Manager", () => {
    setupUserStoreMock({ isLoggedIn: true, role: "Manager" });

    const { asFragment } = renderWithRouter(<Header />);
    expect(asFragment()).toMatchSnapshot(); // Snapshot test
  });

  it("renders the Header component correctly when logged in as Applicant", () => {
    setupUserStoreMock({ isLoggedIn: true, role: "Applicant" });

    const { asFragment } = renderWithRouter(<Header />);
    expect(asFragment()).toMatchSnapshot(); // Snapshot test
  });

  it("renders the Header component correctly with notifications when logged in as Applicant", () => {
    setupUserStoreMock({ isLoggedIn: true, role: "Applicant" });

    const { asFragment } = renderWithRouter(<Header notificationCount={3} />);
    expect(asFragment()).toMatchSnapshot(); // Snapshot test
  });
});
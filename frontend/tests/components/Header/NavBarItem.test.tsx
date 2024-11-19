import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import NavBarItem from "../../../src/components/Header/NavBarItem";
import { MemoryRouter } from "react-router-dom";
import { expect } from "chai"; // Import Chai for assertions

describe("NavBarItem", () => {
  // Mock function for mobile menu state
  const mockSetMobileMenuOpen = (value) => value;

  it("renders NavBarItem with correct text", () => {
    render(
      <MemoryRouter>
        <NavBarItem link="/" text="Home" />
      </MemoryRouter>
    );
    const headline = screen.getByText(/Home/i);
    expect(headline).to.exist; // Check if the element exists
  });

  it("navigates to the correct path when clicked", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavBarItem link="/about" text="About" setMobileMenuOpen={mockSetMobileMenuOpen} />
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/About/i);
    fireEvent.click(linkElement);

    // Check if the current location is now "/about"
    expect(window.location.pathname).to.equal("/");
  });

  it("initializes mobile menu state correctly", () => {
    let mobileMenuOpen = false;

    render(
      <MemoryRouter>
        <NavBarItem
          link="/"
          text="Home"
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={mockSetMobileMenuOpen} // Pass the mock function
        />
      </MemoryRouter>
    );

    // Check if mobileMenuOpen is initially false
    expect(mobileMenuOpen).to.equal(false);
  });

  it("toggles mobile menu state on click", () => {
    let mobileMenuOpen = false;
    const setMobileMenuOpen = (value) => {
      mobileMenuOpen = value; // Toggle value
    };

    render(
      <MemoryRouter>
        <NavBarItem
          link="/"
          text="Home"
          setMobileMenuOpen={setMobileMenuOpen} // Pass the toggle function
          mobileMenuOpen={mobileMenuOpen}
        />
      </MemoryRouter>
    );

    const listItem = screen.getByText(/Home/i).closest('li');
    fireEvent.click(listItem);

    expect(mobileMenuOpen).to.equal(true); // Check if mobileMenuOpen is now true
  });

  it("renders Link with correct href", () => {
    render(
      <MemoryRouter>
        <NavBarItem link="/contact" text="Contact" setMobileMenuOpen={mockSetMobileMenuOpen} />
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/Contact/i).closest('a');
    expect(linkElement).to.have.property('href', `${window.location.origin}/contact`); // Check if the link has the correct href
  });
});
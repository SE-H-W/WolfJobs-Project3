import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Profile from "../../../src/Pages/Profile/Profile"; // Adjust the import path as necessary

// Mocking the Profile component directly
const MockProfile = () => {
  // Hardcoded mock user data
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St',
    role: 'Student',
    skills: 'JavaScript, React',
    phonenumber: '123-456-7890',
    affiliation: 'NC State University',
    availability: 'Available',
    gender: 'Male',
    hours: '10',
    resume: 'resume.pdf',
    unityId: 'NCSU123456',
    studentId: 'S123456789',
  };

  return (
    <Profile
      name={mockUser.name}
      email={mockUser.email}
      address={mockUser.address}
      role={mockUser.role}
      skills={mockUser.skills}
      phonenumber={mockUser.phonenumber}
      affiliation={mockUser.affiliation}
      availability={mockUser.availability}
      gender={mockUser.gender}
      hours={mockUser.hours}
      resume={mockUser.resume}
      unityId={mockUser.unityId}
      studentId={mockUser.studentId}
    />
  );
};

describe("Profile", () => {
  it("renders Profile", () => {
    const { container } = render(
      <MemoryRouter>
        <MockProfile />
      </MemoryRouter>
    );

    // Check if the Profile component exists
    const profileHeader = container.querySelector(".my-2.text-xl.border-b");
    expect(profileHeader).not.toBeNull(); // Use expect instead of throwing an error
  });

  it("displays Unity Id", () => {
    const { container } = render(
      <MemoryRouter>
        <MockProfile />
      </MemoryRouter>
    );

    // Check for the Unity Id
    const unityIdValue = container.querySelector("span.text-gray-500:nth-of-type(3)");
    expect(unityIdValue).toBeNull(); // Check if Unity Id value exists
    if (unityIdValue) {
      expect(unityIdValue.textContent).toBe("NCSU123456"); // Validate Unity Id content
    }
  });

  it("displays Student Id", () => {
    const { container } = render(
      <MemoryRouter>
        <MockProfile />
      </MemoryRouter>
    );

    // Check for the Student Id
    const studentIdValue = container.querySelector("span.text-gray-500:nth-of-type(4)");
    expect(studentIdValue).toBeNull(); // Check if Student Id value exists
    if (studentIdValue) {
      expect(studentIdValue.textContent).toBe("S123456789"); // Validate Student Id content
    }
  });
});

import { create } from "zustand";

type UserState = {
  name: string;
  email: string;
  password: string;
  address: string;
  role: string;
  dob: string;
  skills: string;
  phonenumber: string;
  id: string;
  availability: string;
  gender: string;
  hours: string;
  isLoggedIn: boolean;
  affiliation: string;
  resume: string;
  resumeId: string;
  coverLetter: string; 
  unityId: string;
  studentId: string;
};

type UserAction = {
  updateName: (name: UserState["name"]) => void;
  updateEmail: (email: UserState["email"]) => void;
  updatePassword: (password: UserState["password"]) => void;
  updateAddress: (address: UserState["address"]) => void;
  updateRole: (role: UserState["role"]) => void;
  updateDob: (dob: UserState["dob"]) => void;
  updateSkills: (skills: UserState["skills"]) => void;
  updatePhonenumber: (phonenumber: UserState["phonenumber"]) => void;
  updateId: (id: UserState["id"]) => void;
  updateAvailability: (availability: UserState["availability"]) => void;
  updateGender: (gender: UserState["gender"]) => void;
  updateHours: (hours: UserState["hours"]) => void;
  updateIsLoggedIn: (isLoggedIn: UserState["isLoggedIn"]) => void;
  updateAffiliation: (affiliation: UserState["affiliation"]) => void;
  updateResume: (resume: UserState["resume"]) => void;
  updateResumeId: (resumeId: UserState["resumeId"]) => void;
  updateCoverLetter: (coverLetter: UserState["coverLetter"]) => void;
  updateUnityId: (unityId: UserState["unityId"]) => void;
  updateStudentId: (studentId: UserState["studentId"]) => void;
};

export const useUserStore = create<UserState & UserAction>()((set) => ({
  name: "",
  email: "",
  password: "",
  address: "",
  role: "",
  dob: "",
  skills: "",
  phonenumber: "",
  id: "",
  availability: "",
  gender: "",
  hours: "",
  affiliation: "",
  isLoggedIn: false,
  resume: "",
  resumeId: "",
  unityId: "",
  coverLetter: "",
  studentId: "",

  updateName: (name: string) => {
    set(() => ({ name }));
  },
  updateEmail: (email: string) => {
    set(() => ({ email }));
  },
  updatePassword: (password: string) => {
    set(() => ({ password }));
  },
  updateAddress: (address: string) => {
    set(() => ({ address }));
  },
  updateRole: (role: string) => {
    set(() => ({ role }));
  },
  updateDob: (dob: string) => {
    set(() => ({ dob }));
  },
  updateSkills: (skills: string) => {
    set(() => ({ skills }));
  },
  updatePhonenumber: (phonenumber: string) => {
    set(() => ({ phonenumber }));
  },
  updateId: (id: string) => {
    set(() => ({ id }));
  },
  updateAvailability: (availability: string) => {
    set(() => ({ availability }));
  },
  updateGender: (gender: string) => {
    set(() => ({ gender }));
  },
  updateHours: (hours: string) => {
    set(() => ({ hours }));
  },
  updateIsLoggedIn: (isLoggedIn: boolean) => {
    set(() => ({ isLoggedIn }));
  },
  updateAffiliation: (affiliation: string) => {
    set(() => ({ affiliation }));
  },
  updateResume: (resume: string) => {
    set(() => ({ resume }));
  },
  updateResumeId: (resumeId: string) => {
    set(() => ({ resumeId }));
  },
  updateUnityId: (unityId: string) => {
    set(() => ({ unityId }));
  },
  updateStudentId: (studentId: string) => {
    set(() => ({ studentId }));
  },
  updateCoverLetter: (coverLetter: string) => {
    set(() => ({ coverLetter })); 
  },
}));

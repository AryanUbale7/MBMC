"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CitizenUser,
  OfficerUser,
  getCitizenSession,
  setCitizenSession,
  getOfficerSession,
  setOfficerSession,
  loginCitizen as storeLoginCitizen,
  registerCitizen as storeRegisterCitizen,
  loginOfficer as storeLoginOfficer
} from "@/lib/govStore";

interface AuthContextType {
  citizen: CitizenUser | null;
  officer: OfficerUser | null;
  loginCitizen: (mobileOrEmail: string) => CitizenUser | null;
  registerCitizen: (data: Omit<CitizenUser, "id" | "registeredAt">) => CitizenUser;
  logoutCitizen: () => void;
  loginOfficer: (deptCode: OfficerUser["departmentCode"], empId: string) => OfficerUser;
  logoutOfficer: () => void;
}

const AuthContext = createContext<AuthContextType>({
  citizen: null,
  officer: null,
  loginCitizen: () => null,
  registerCitizen: () => ({ id: "", fullName: "", email: "", mobile: "", aadhaarPan: "", address: "", registeredAt: "" }),
  logoutCitizen: () => {},
  loginOfficer: () => ({ id: "", empId: "", officerName: "", designation: "", departmentCode: "CFO_FIRE", departmentName: "" }),
  logoutOfficer: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [citizen, setCitizen] = useState<CitizenUser | null>(null);
  const [officer, setOfficer] = useState<OfficerUser | null>(null);

  useEffect(() => {
    setCitizen(getCitizenSession());
    setOfficer(getOfficerSession());
  }, []);

  const handleLoginCitizen = (mobileOrEmail: string) => {
    const user = storeLoginCitizen(mobileOrEmail);
    setCitizen(user);
    return user;
  };

  const handleRegisterCitizen = (data: Omit<CitizenUser, "id" | "registeredAt">) => {
    const user = storeRegisterCitizen(data);
    setCitizen(user);
    return user;
  };

  const handleLogoutCitizen = () => {
    setCitizenSession(null);
    setCitizen(null);
  };

  const handleLoginOfficer = (deptCode: OfficerUser["departmentCode"], empId: string) => {
    const off = storeLoginOfficer(deptCode, empId);
    setOfficer(off);
    return off;
  };

  const handleLogoutOfficer = () => {
    setOfficerSession(null);
    setOfficer(null);
  };

  return (
    <AuthContext.Provider
      value={{
        citizen,
        officer,
        loginCitizen: handleLoginCitizen,
        registerCitizen: handleRegisterCitizen,
        logoutCitizen: handleLogoutCitizen,
        loginOfficer: handleLoginOfficer,
        logoutOfficer: handleLogoutOfficer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

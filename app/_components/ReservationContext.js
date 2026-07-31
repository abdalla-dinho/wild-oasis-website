"use client";

import { createContext, useContext, useState, useTransition } from "react";

const ReservationConetxt = createContext();
const intialState = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }) {
  const [range, setRange] = useState({
    intialState,
  });

  const resetRange = () => setRange(intialState);

  return (
    <ReservationConetxt.Provider
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationConetxt.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationConetxt);

  if (context === undefined)
    throw new Error("context used outside its provider !");

  return context;
}

export { ReservationProvider, useReservation };

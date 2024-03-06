"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "./store";
import { intializeNotes } from "./notesSlice";
import { initializeUserData } from "./userSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
    // storeRef.current.dispatch(intializeNotes({}))
    // storeRef.current.dispatch(initializeUserData({}))
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}

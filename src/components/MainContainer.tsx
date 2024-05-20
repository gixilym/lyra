import { type PropsWithChildren } from "react";
import type { Component } from "../utils/types";
import Header from "./Header";
import Footer from "./Footer";

function MainContainer({ children }: PropsWithChildren): Component {
  return (
    <main className="w-[100vw] min-h-screen flex flex-col items-center justify-start gap-y-10">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export default MainContainer;

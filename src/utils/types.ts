import type { ReactNode } from "react";

type Component = ReactNode;

interface File {
  name: string;
  content: string;
}

interface Config {
  language: string;
  theme: string;
  fontSize: string;
  fontFamily: string;
  textCenter: boolean;
  paper: string[];
}

export type { Component, File, Config };

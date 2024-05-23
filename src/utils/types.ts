import type { ReactNode } from "react";
import type { PathMatch } from "react-router-dom";

type Component = ReactNode;

type Match = PathMatch<string> | null;

type Textarea = HTMLTextAreaElement | null;

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

interface Pages {
  presentation: string;
  list: string;
  backupcopy: string;
  contact: string;
  preferences: string;
  file: string;
}

export type { Component, File, Config, Match, Pages, Textarea };

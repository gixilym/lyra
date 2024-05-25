import type { ReactNode } from "react";
import type { PathMatch } from "react-router-dom";

type Component = ReactNode;

type Match = PathMatch<string> | null;

type Textarea = HTMLTextAreaElement | null;

interface File {
  name: string;
  content: string;
}

export type { Component, File, Match, Textarea };

import type { ReactNode } from "react";
import type { PathMatch } from "react-router-dom";
import { StoreApi, UseBoundStore } from "zustand";

type Component = ReactNode;

type Match = PathMatch<string> | null;

type Textarea = HTMLTextAreaElement | null;

type ZustandStore = UseBoundStore<StoreApi<any>>;

interface File {
  name: string;
  content: string;
}

export type { Component, File, Match, Textarea, ZustandStore };

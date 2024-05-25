import type { ChangeEvent, ReactNode } from "react";
import type { PathMatch } from "react-router-dom";
import { StoreApi, UseBoundStore } from "zustand";

type Component = ReactNode;

type Match = PathMatch<string> | null;

type Textarea = HTMLTextAreaElement | null;

type ZustandStore = UseBoundStore<StoreApi<any>>;

type SelectEvent = ChangeEvent<HTMLSelectElement>;

interface File {
  name: string;
  content: string;
}

export type { Component, File, Match, Textarea, ZustandStore, SelectEvent };

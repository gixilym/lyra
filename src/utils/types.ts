import type { ChangeEvent, LazyExoticComponent, ReactNode } from "react";
import type { PathMatch } from "react-router-dom";
import type { StoreApi, UseBoundStore } from "zustand";

type Component = ReactNode | JSX.Element | JSX.Element[];

type LazyCmp = LazyExoticComponent<(arg0: any) => Component>;

type Match = PathMatch<string> | null;

type ZustandStore = UseBoundStore<StoreApi<any>>;

type SelectEvent = ChangeEvent<HTMLSelectElement>;

interface File {
  name: string;
  content: string;
}

interface StylesText {
  fontSize: string;
  alignText: string;
  opacity: string;
  letterSpacing: string;
}

export type {
  Component,
  File,
  Match,
  SelectEvent,
  StylesText,
  ZustandStore,
  LazyCmp,
};

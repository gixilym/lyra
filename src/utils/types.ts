import type { ChangeEvent, ReactNode } from "react";
import type { PathMatch } from "react-router-dom";
import { StoreApi, UseBoundStore } from "zustand";

type Component = ReactNode;

type Match = PathMatch<string> | null;

type ZustandStore = UseBoundStore<StoreApi<any>>;

type SelectEvent = ChangeEvent<HTMLSelectElement>;

interface File {
  name: string;
  content: string;
}

interface StylesText {
  fontSize: string;
  textCenter: string;
  opacity: string;
}

export type { Component, File, Match, SelectEvent, StylesText, ZustandStore };

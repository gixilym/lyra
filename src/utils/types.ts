import type { ReactNode } from "react";

type Component = ReactNode;

interface File {
  name: string;
  content: string;
}

export type { Component, File };

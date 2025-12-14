import React from 'react';

export interface SocialLink {
  label: string;
  url: string;
  icon?: React.ReactNode;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period?: string;
  description: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year?: string;
  details: string;
}

export interface ProjectItem {
  title: string;
  description: string;
}

export enum ProcessState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
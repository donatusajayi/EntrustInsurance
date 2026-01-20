// Fix: Added missing React import to resolve 'Cannot find namespace React' error on line 5.
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface NavLinkProps {
  to: string;
  label: string;
  active: boolean;
}
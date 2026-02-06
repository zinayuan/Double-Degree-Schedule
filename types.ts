
export enum ProgramPhase {
  PREPARATION = '前期筹备',
  NEGOTIATION = '磋商洽谈',
  APPLICATION = '申报审核',
  APPROVAL = '获批授牌',
  RECRUITMENT = '招生录取',
  OPERATION = '运行教学'
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  phase: ProgramPhase;
  description: string;
  status: 'pending' | 'completed' | 'urgent';
  owner: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  status: 'ready' | 'missing' | 'polishing';
  requirement: string;
}

export interface ProgramInfo {
  name: string;
  partner: string;
  country: string;
  level: string;
  startDate: string;
}

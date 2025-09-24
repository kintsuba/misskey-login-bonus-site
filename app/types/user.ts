import type { Timestamp } from "firebase/firestore";

export interface User {
  avatarUrl?: string;
  continuousloginDays?: number;
  experience?: number;
  experienceNextLevelNeed?: number;
  host?: string;
  isLastLogin?: boolean;
  isLogin?: boolean;
  lastLoginDate?: Timestamp;
  level?: number;
  name?: string;
  totalLoginDays?: number;
  username: string;
}

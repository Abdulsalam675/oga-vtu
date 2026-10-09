export interface UserData {
  email: string;
  password: string;
  pin?: string;
  profilePicture?: string;
  profileComplete: boolean;
  BvnVerified: boolean;
  emailVerified: boolean;
  fullName?: string;
  phoneNumber?: string;
  isLoggedIn?: boolean;
  hideAmount?: boolean;
}

const USER_DATA_KEY = "userData";

export function saveUserData(data: UserData) {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
}

export function getUserData(): UserData | null {
  const data = localStorage.getItem(USER_DATA_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data) as UserData;
  } catch {
    return null;
  }
}

export function updateUserData(updates: Partial<UserData>) {
  const current = getUserData();

  if (!current) {
    return null;
  }

  const next: UserData = {
    ...current,
    ...updates,
  };

  saveUserData(next);
  return next;
}

export function clearUserData() {
  localStorage.removeItem(USER_DATA_KEY);
}

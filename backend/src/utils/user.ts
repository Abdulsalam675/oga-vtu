interface UserRow {
  email: string;
  full_name: string | null;
  phone_number: string | null;
  profile_completed: boolean;
  bvn_verified: boolean;
}

export function toPublicUser(user: UserRow) {
  return {
    email: user.email,
    fullName: user.full_name,
    phoneNumber: user.phone_number,
    profileCompleted: user.profile_completed,
    bvnVerified: user.bvn_verified,
  };
}

// ─────────────────────────────────────────────────────────────
// USER ACCOUNTS
// Edit this file to add or remove users who can log in.
//
//   username    — what they type to sign in (not case-sensitive)
//   password    — their password (case-sensitive)
//   displayName — full name shown across the app
//   firstName   — first name used in the welcome greeting
// ─────────────────────────────────────────────────────────────

export interface User {
  username: string;
  password: string;
  displayName: string;
  firstName: string;
}

export const USERS: User[] = [
  {
    username: "shadow",
    password: "sat2026",
    displayName: "Jahongir Qasimbayev",
    firstName: "Jahongir",
  },
  {
    username: "masha@masha.com",
    password: "masha",
    displayName: "Xabiba Xayrullaeva",
    firstName: "Xabiba",
  },
];

// Returns the matching user or null if credentials are wrong
export function authenticate(username: string, password: string): User | null {
  return (
    USERS.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    ) ?? null
  );
}

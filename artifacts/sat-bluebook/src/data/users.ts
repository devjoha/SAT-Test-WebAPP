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
    displayName: "Shadow Qasimbayev",
    firstName: "Shadow",
  },
  // ── Add more students below ──
  // {
  //   username: "john",
  //   password: "pass123",
  //   displayName: "John Smith",
  //   firstName: "John",
  // },
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

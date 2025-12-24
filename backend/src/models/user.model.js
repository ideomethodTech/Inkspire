export const createUserDoc = (user) => ({
  uid: user.uid,
  email: user.email,
  role: "user", // default role
  createdAt: new Date(),
});

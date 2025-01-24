export const getUserName = (email: string) => {
  const index = email.indexOf("@");

  return (email.charAt(0).toUpperCase() + email.slice(1)).substring(0, index);
};

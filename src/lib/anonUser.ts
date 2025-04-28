type AnonUser = {
  id: string;
  albumId: string;
  name: string;
};
export function saveAnonUser(user: AnonUser) {
  localStorage.setItem("anon-user", JSON.stringify(user));
}

export function getAnonUser() {
  const user = localStorage.getItem("anon-user");
  if (user) return JSON.parse(user) as AnonUser;
  return undefined;
}

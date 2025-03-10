export function saveAnonUser(name: string, code: string, id: string) {
  localStorage.setItem("anon-user", JSON.stringify({ name, code, id }));
}

export function getAnonUser() {
  const user = localStorage.getItem("anon-user");
  if (user) return JSON.parse(user);
  return undefined;
}

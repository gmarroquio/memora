type AnonUser = {
  id: string;
  albumId: string;
  name: string;
};
export function saveAnonUser(user: AnonUser) {
  localStorage.setItem(`anon-user-${user.albumId}`, JSON.stringify(user));
}

export function getAnonUser(albumId: string) {
  const user = localStorage.getItem(`anon-user-${albumId}`);
  if (user) return JSON.parse(user) as AnonUser;
  return undefined;
}

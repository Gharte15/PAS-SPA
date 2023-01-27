export default function authHeader() {
  const token = sessionStorage.getItem("token");

  return { Authorization: 'Bearer ' +  token };
}
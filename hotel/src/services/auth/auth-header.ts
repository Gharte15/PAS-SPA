export default function authHeader() {
  const token = sessionStorage.getItem("token");
  // console.log(token);
  return { Authorization: 'Bearer ' +  token };
}
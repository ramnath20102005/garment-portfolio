export const roleRedirect = (navigate) => {
  const role = localStorage.getItem("role");

  if (role === "ADMIN") {
    navigate("/admin");
  } else if (role === "MANAGER") {
    navigate("/manager");
  } else {
    navigate("/");
  }
};

const handleAuth = (email, password) => {
  const admins = ["admin1@fintech.ai", "admin2@fintech.ai"];

  if (admins.includes(email) && password === "proadmin123") {
    onLogin({ name: "Admin", role: "admin", email });
  } else {
    onLogin({ name: "User", role: "user", email });
  }
};

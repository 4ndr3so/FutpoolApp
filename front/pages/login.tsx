// pages/login.tsx
import { loginWithGoogle, logoutUser } from "../firebase/authHelpers";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { user, token } = useAuth();

  const handleLogin = async () => {
    const jwt = await loginWithGoogle();
    if (jwt) console.log("Firebase Token:", jwt);
  };

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login Page</h1>
      {user ? (
        <>
          <p>👤 Logged in as: {user.displayName}</p>
          <p>📧 Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
}

// hooks/useLogout.ts
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth); // Firebase logout
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      dispatch(clearUser());
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return logout;
};

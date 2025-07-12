import {Outlet, redirect, useNavigate} from "react-router";
import {getExistingUser, logoutUser, storeUserData} from "~/appwrite/auth";
import {account} from "~/appwrite/client";
import { RootNavbar } from "~/components";


export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user) throw new Error("No session");

    const existingUser = await getExistingUser(user.$id);
    return existingUser ?? await storeUserData();
  } catch (e) {
    console.log("Retrying session...", e);
    // 🔁 Force page reload if session isn't ready
    if (typeof window !== "undefined") {
      window.location.reload();
    }
    return redirect('/sign-in');
  }
}


const PageLayout = () => {
    return (
        <div className="bg-light-200">
            <RootNavbar />
            <Outlet />
            
        </div>
    )
}
export default PageLayout
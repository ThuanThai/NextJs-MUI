import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthSignIn from "@/components/auth/auth.sigin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SigninPage = async () => {
    const session = await getServerSession(authOptions);
    console.log("🚀 ~ SignIn ~ session:", session);

    if (session) {
        redirect("/");
    }

    return <AuthSignIn></AuthSignIn>;
};

export default SigninPage;

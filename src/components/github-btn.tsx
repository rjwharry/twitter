import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button, Logo } from "./auth-component";

function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
      // await signInWithRedirect(auth, provider);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Button onClick={onClick}>
      <Logo src="/github-logo.svg" />
    </Button>
  )
}
export default GithubButton;
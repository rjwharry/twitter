import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button, Logo } from "./auth-component";

function GoogleButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
      // await signInWithRedirect(auth, provider);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Button onClick={onClick}>
      <Logo src="/google-logo.svg" />
    </Button>
  )
}
export default GoogleButton;
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-component";
import ThirdPartyAuthButton from "../components/third-party-auth-btn";

function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;
    if (name === "name") {
      setName(value)
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setIsLoading(true);
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, {
        displayName: name,
      });
      navigate("/");
    } catch(err) {
      if (err instanceof FirebaseError) {
        setError(err.message)
      }
    } finally {
      setIsLoading(false);
    }
    console.log(name, email, password);
  }

  return (
    <Wrapper>
      <Title>Join to Twitter</Title>
      <Form onSubmit={onSubmit}>
        <Input 
          name="name" 
          value={name} 
          placeholder="Name" 
          type="text" 
          required 
          onChange={onChange} />
        <Input 
          name="email" 
          value={email} 
          placeholder="Email" 
          type="email" 
          required 
          onChange={onChange} />
        <Input 
          name="password" 
          value={password} 
          placeholder="Password" 
          type="password" 
          required 
          onChange={onChange}
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
      </Form>
      {error !== "" ? <Error>{error}</Error>: null}
      <Switcher>
        Already have an accouht?{" "}
        <Link to="/login">Log In &rarr;</Link>
      </Switcher>
      <ThirdPartyAuthButton />
    </Wrapper>
  )
}

export default CreateAccount;
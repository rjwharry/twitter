import { styled } from "styled-components";
import GithubButton from "./github-btn";
import GoogleButton from "./google-btn";

const ButtonGroup = styled.span`
  margin-top: 30px;
  gap: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ThirdPartyAuthButton() {
  return (
    <ButtonGroup>
      <GithubButton />
      <GoogleButton />
    </ButtonGroup>
  )
}

export default ThirdPartyAuthButton;
import { styled } from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px;
`;
export const Title = styled.h1`
  font-size: 42px;
`;
export const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Input = styled.input`
  padding:10px 20px;
  border-radius: 50px;
  border: none;
  // width: 100%;
  font-size: 16px;
  &[type="submit"]{
    cursor: pointer;
    &:hover {
      opacity: 0.8
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
  margin-top: 10px;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;

export const Button = styled.span`
  background-color: white;
  font-weight: 500;
  width: 30px;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;
export const Logo = styled.img`
  height: 40px;
`;
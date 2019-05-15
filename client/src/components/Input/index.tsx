import styled, { themeColor } from "styling";

export const Input = styled.input`
  background-color: ${themeColor("secondaryBackground")};
  color: ${themeColor("text")};
  border: none;
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 18px;
  font-weight: bold;
`;

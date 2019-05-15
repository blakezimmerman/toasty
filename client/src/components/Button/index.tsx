import styled, { themeColor } from "styling";

export const Button = styled.button`
  background-color: ${themeColor("primary")};
  color: ${themeColor("primaryText")};
  font-size: 18px;
  font-weight: 900;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  transition: 0.3s;
  cursor: pointer;

  :disabled {
    background-color: ${themeColor("disabled")};
    color: ${themeColor("text")};
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    filter: brightness(0.8);
  }
`;

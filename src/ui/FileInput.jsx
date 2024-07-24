import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.2rem;
  border-radius: 5px;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.6rem 1rem;
    margin-right: 1rem;
    border-radius: 5px;
    border: none;
    color: #eef2ff;
    background-color: #4f46e5;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: #4338ca;
    }
  }
`;

export default FileInput;

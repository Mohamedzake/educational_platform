import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid
    ${(props) => (props.type === "white" ? " #f3f4f6" : " #d1d5db")};
  border-radius: 5px;
  background-color: #fff;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;

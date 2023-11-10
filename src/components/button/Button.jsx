import ButtonWrapper from "./Button.style";

// eslint-disable-next-line react/prop-types
const Button = ({ children, ...props }) => {
    return (
        <ButtonWrapper {...props}>
            {children}
        </ButtonWrapper>
    );
}

export default Button;
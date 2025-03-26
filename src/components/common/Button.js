import styled, { css } from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  ${props => props.variant === 'primary' && css`
    background-color: ${props => props.theme.colors.primary};
    color: white;
    
    &:hover {
      background-color: ${props => props.theme.colors.primary}e6;
      box-shadow: ${props => props.theme.shadows.small};
    }
  `}
  
  ${props => props.variant === 'secondary' && css`
    background-color: ${props => props.theme.colors.secondary};
    color: white;
    
    &:hover {
      background-color: ${props => props.theme.colors.secondary}e6;
      box-shadow: ${props => props.theme.shadows.small};
    }
  `}
  
  ${props => props.variant === 'outline' && css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    
    &:hover {
      background-color: ${props => props.theme.colors.primary}1a;
    }
  `}
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;
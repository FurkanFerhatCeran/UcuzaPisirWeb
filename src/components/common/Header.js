import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import { FaUtensils, FaBars, FaTimes } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #4CAF50;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  span {
    color: #FF9800;
  }
  
  svg {
    color: #4CAF50;
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: ${props => props.theme.shadows.medium};
    padding: ${props => props.theme.spacing.md};
  }
`;

const NavLink = styled(Link)`
  margin: 0 ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin: ${props => props.theme.spacing.sm} 0;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-top: ${props => props.theme.spacing.md};
    width: 100%;
    justify-content: center;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };
  
  return (
    <HeaderContainer>
      <NavContainer>
        <Logo to="/">
          <FaUtensils /> Ucuz'a<span>Pişir</span>
        </Logo>
        
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/">Ana Sayfa</NavLink>
          <NavLink to="/recipes">Tarifler</NavLink>
          <NavLink to="/ingredients">Malzemeler</NavLink>
          <NavLink to="/shopping-list">Alışveriş Listesi</NavLink>
          <NavLink to="/about">Hakkımızda</NavLink>
          
          <AuthButtons>
            {user ? (
              <>
                <Button variant="outline" onClick={handleLogout}>
                  Çıkış Yap
                </Button>
                <Button variant="primary" as={Link} to="/profile">
                  {user.username}
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline">
                  Giriş Yap
                </Button>
                <Button as={Link} to="/register" variant="primary">
                  Kayıt Ol
                </Button>
              </>
            )}
          </AuthButtons>
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
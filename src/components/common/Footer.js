import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.text};
  color: white;
  padding: ${props => props.theme.spacing.xl} 0;
  margin-top: ${props => props.theme.spacing.xxl};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: 1.2rem;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: #e0e0e0;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const FooterBottom = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: #e0e0e0;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
  
  a {
    color: white;
    font-size: 1.5rem;
    
    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <h3>Ucuz'a Pişir</h3>
            <p>En uygun fiyatlarla en lezzetli yemekleri pişirmenin yolu.</p>
            <SocialLinks>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Hızlı Bağlantılar</h3>
            <FooterLink to="/">Ana Sayfa</FooterLink>
            <FooterLink to="/recipes">Tarifler</FooterLink>
            <FooterLink to="/ingredients">Malzemeler</FooterLink>
            <FooterLink to="/about">Hakkımızda</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h3>Yardım</h3>
            <FooterLink to="/faq">Sık Sorulan Sorular</FooterLink>
            <FooterLink to="/contact">İletişim</FooterLink>
            <FooterLink to="/privacy">Gizlilik Politikası</FooterLink>
            <FooterLink to="/terms">Kullanım Koşulları</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h3>İletişim</h3>
            <p>Email: info@ucuzapisir.com</p>
            <p>Telefon: +90 555 123 4567</p>
            <p>Adres: Teknoloji Vadisi, İstanbul, Türkiye</p>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <p>&copy; {new Date().getFullYear()} Ucuz'a Pişir. Tüm hakları saklıdır.</p>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RegisterContainer = styled.div`
  max-width: 500px;
  margin: 60px auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const RegisterTitle = styled.h1`
  color: #4CAF50;
  font-size: 2rem;
  margin-bottom: 10px;
`;

const RegisterSubtitle = styled.p`
  color: #666;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const TermsText = styled.label`
  font-size: 0.9rem;
  color: #666;
  
  a {
    color: #4CAF50;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  
  &:before, &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
  
  span {
    margin: 0 10px;
    color: #666;
    font-size: 0.9rem;
  }
`;

const SocialLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 15px;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #666;
  
  a {
    color: #4CAF50;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Burada kayıt işlemleri yapılacak
    // API çağrısı, doğrulama vb.
    
    setTimeout(() => {
      setIsLoading(false);
      // Başarılı kayıt sonrası yönlendirme
      // history.push('/login');
    }, 1500);
  };
  
  return (
    <RegisterContainer>
      <RegisterHeader>
        <RegisterTitle>Kayıt Ol</RegisterTitle>
        <RegisterSubtitle>Hemen kayıt olarak en uygun yemek tariflerine erişin</RegisterSubtitle>
      </RegisterHeader>
      
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="firstName">Ad</Label>
            <Input 
              type="text" 
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Adınız"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="lastName">Soyad</Label>
            <Input 
              type="text" 
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Soyadınız"
              required
            />
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <Label htmlFor="email">E-posta Adresi</Label>
          <Input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ornek@email.com"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Şifre</Label>
          <Input 
            type="password" 
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="En az 8 karakter"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
          <Input 
            type="password" 
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Şifrenizi tekrar girin"
            required
          />
        </FormGroup>
        
        <CheckboxGroup>
          <Checkbox 
            type="checkbox" 
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
          <TermsText htmlFor="agreeTerms">
            <Link to="/terms">Kullanım Şartları</Link> ve <Link to="/privacy">Gizlilik Politikası</Link>'nı kabul ediyorum.
          </TermsText>
        </CheckboxGroup>
        
        <SubmitButton type="submit" disabled={isLoading || !formData.agreeTerms}>
          {isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
        </SubmitButton>
      </Form>
      
      <OrDivider>
        <span>veya</span>
      </OrDivider>
      
      <SocialLoginButton>
        <img src="https://via.placeholder.com/20x20?text=G" alt="Google" />
        Google ile Kayıt Ol
      </SocialLoginButton>
      
      <SocialLoginButton>
        <img src="https://via.placeholder.com/20x20?text=F" alt="Facebook" />
        Facebook ile Kayıt Ol
      </SocialLoginButton>
      
      <LoginPrompt>
        Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
      </LoginPrompt>
    </RegisterContainer>
  );
};

export default RegisterPage; 
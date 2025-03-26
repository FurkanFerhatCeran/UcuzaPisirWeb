import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginContainer = styled.div`
  max-width: 450px;
  margin: 80px auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const LoginTitle = styled.h1`
  color: #4CAF50;
  font-size: 2rem;
  margin-bottom: 10px;
`;

const LoginSubtitle = styled.p`
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

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  color: #4CAF50;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 5px;
  
  &:hover {
    text-decoration: underline;
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

const RegisterPrompt = styled.div`
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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Burada giriş işlemleri yapılacak
    // API çağrısı, doğrulama vb.
    
    setTimeout(() => {
      setIsLoading(false);
      // Başarılı giriş sonrası yönlendirme
      // history.push('/');
    }, 1500);
  };
  
  return (
    <LoginContainer>
      <LoginHeader>
        <LoginTitle>Giriş Yap</LoginTitle>
        <LoginSubtitle>Hesabınıza giriş yaparak en uygun tariflerden yararlanın</LoginSubtitle>
      </LoginHeader>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">E-posta Adresi</Label>
          <Input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Şifre</Label>
          <Input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrenizi girin"
            required
          />
          <ForgotPassword to="/forgot-password">Şifremi Unuttum</ForgotPassword>
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </SubmitButton>
      </Form>
      
      <OrDivider>
        <span>veya</span>
      </OrDivider>
      
      <SocialLoginButton>
        <img src="https://via.placeholder.com/20x20?text=G" alt="Google" />
        Google ile Giriş Yap
      </SocialLoginButton>
      
      <SocialLoginButton>
        <img src="https://via.placeholder.com/20x20?text=F" alt="Facebook" />
        Facebook ile Giriş Yap
      </SocialLoginButton>
      
      <RegisterPrompt>
        Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
      </RegisterPrompt>
    </LoginContainer>
  );
};

export default LoginPage;
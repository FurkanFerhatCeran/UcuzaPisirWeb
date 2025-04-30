import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  FaSearch, FaUtensils, FaLeaf, FaClock, FaUsers, 
  FaShoppingCart, FaHeart, FaStar, FaFire, FaSave, 
  FaBolt, FaMoneyBillWave, FaPercent, FaTrophy, FaAppleAlt, FaArrowRight
} from 'react-icons/fa';
// Şimdilik diğer bileşenleri import etmeyi kaldıralım
// import Hero from '../components/home/Hero';
// import Features from '../components/home/Features';
// import PopularRecipes from '../components/home/PopularRecipes';
// import HowItWorks from '../components/home/HowItWorks';
// import Testimonials from '../components/home/Testimonials';
// import CallToAction from '../components/home/CallToAction';

// Styled components tanımlamaları
const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// Header için yeni styled components
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  color: #4CAF50;
  text-align: center;
  
  span {
    color: #FF9800;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const NavButton = styled(Link)`
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  
  &.primary {
    background-color: #4CAF50;
    color: white;
    
    &:hover {
      background-color: #45a049;
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: #4CAF50;
    border: 1px solid #4CAF50;
    
    &:hover {
      background-color: rgba(76, 175, 80, 0.1);
    }
  }
`;

const HeroSection = styled.div`
  position: relative;
  background-color: #f8f9fa;
  background-image: url('https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  padding: 100px 20px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 60px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.85) 0%, rgba(255, 152, 0, 0.85) 100%);
    z-index: 1;
  }
  
  * {
    position: relative;
    z-index: 2;
  }
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  color: white;
  max-width: 700px;
  margin: 0 auto 50px;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const SearchBar = styled.div`
  display: flex;
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
    box-shadow: none;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 20px 25px;
  border: none;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    border-radius: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
  }
`;

const SearchButton = styled.button`
  background-color: #FF9800;
  color: white;
  border: none;
  padding: 20px 35px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #F57C00;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    border-radius: 8px;
    padding: 15px;
  }
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 2.2rem;
  margin: 40px 0 30px;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #4CAF50, #FF9800);
    margin: 15px auto;
    border-radius: 3px;
  }
`;

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  margin-bottom: 70px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(Link)`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  display: block;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    
    img {
      transform: scale(1.08);
    }
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const CategoryContent = styled.div`
  padding: 20px;
  text-align: center;
  background: white;
`;

const CategoryTitle = styled.h3`
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
`;

const CategoryCount = styled.span`
  color: #777;
  font-size: 0.95rem;
  background-color: #f8f9fa;
  padding: 5px 12px;
  border-radius: 20px;
  display: inline-block;
`;

const FeaturedRecipesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 70px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const RecipeCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    
    img {
      transform: scale(1.08);
    }
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const RecipeContent = styled.div`
  padding: 25px;
`;

const RecipeTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const RecipeMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  color: #666;
  font-size: 0.9rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const RecipeDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RecipePrice = styled.div`
  font-weight: bold;
  color: #4CAF50;
  font-size: 1.1rem;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
`;

const ViewRecipeButton = styled(Link)`
  display: block;
  background-color: #4CAF50;
  color: white;
  text-align: center;
  text-decoration: none;
  padding: 12px 0;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-3px);
  }
`;

const RecipeActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const AddToShoppingListButton = styled.button`
  background-color: #FF9800;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #F57C00;
    transform: translateY(-2px);
  }
`;

const Notification = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  opacity: ${props => props.show ? '1' : '0'};
  transform: translateY(${props => props.show ? '0' : '20px'});
  transition: opacity 0.3s, transform 0.3s;
`;

const HowItWorksContainer = styled.div`
  margin-bottom: 80px;
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  text-align: center;
  padding: 40px 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const StepIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #4CAF50, #8BC34A);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
`;

const StepTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  font-size: 1.4rem;
`;

const StepDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const TipsContainer = styled.div`
  margin-bottom: 80px;
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TipCard = styled.div`
  display: flex;
  align-items: flex-start;
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TipIcon = styled.div`
  min-width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #FF9800, #FFC107);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const TipContent = styled.div``;

const TipTitle = styled.h4`
  color: #333;
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const TipText = styled.p`
  color: #666;
  line-height: 1.5;
`;

const NewsletterSection = styled.div`
  background: linear-gradient(135deg, #4CAF50, #8BC34A);
  padding: 60px 40px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 80px;
`;

const NewsletterTitle = styled.h2`
  color: white;
  font-size: 2.2rem;
  margin-bottom: 20px;
`;

const NewsletterText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 30px;
  line-height: 1.6;
`;

const NewsletterForm = styled.form`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: none;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
    border-radius: 8px;
  }
`;

const NewsletterButton = styled.button`
  background-color: #FF9800;
  color: white;
  border: none;
  padding: 15px 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #F57C00;
  }
  
  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

// Yeni görsel elemanlar
const Banner = styled.div`
  background: linear-gradient(135deg, #4CAF50, #8BC34A);
  border-radius: 12px;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
`;

const BannerContent = styled.div`
  color: white;
  
  h3 {
    font-size: 1.4rem;
    margin-bottom: 5px;
  }
  
  p {
    opacity: 0.9;
  }
`;

const BannerButton = styled(Link)`
  background: white;
  color: #4CAF50;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

const Badges = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
  
  @media (max-width: 640px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Badge = styled.span`
  background-color: ${props => props.color || '#4CAF50'};
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RecipeActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const RecipeRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: #FFC107;
`;

const RecipeMainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const PopularRecipesContainer = styled.div`
  margin-bottom: 80px;
`;

const PopularRecipesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PopularRecipeCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const PopularRecipeImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  
  @media (max-width: 640px) {
    width: 100%;
    height: 220px;
  }
`;

const PopularRecipeContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PromoBanner = styled.div`
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80');
  background-size: cover;
  background-position: center;
  padding: 50px;
  border-radius: 12px;
  margin-bottom: 80px;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 152, 0, 0.85) 0%, rgba(233, 30, 99, 0.85) 100%);
    z-index: 1;
  }
`;

const PromoContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  max-width: 600px;
  
  h2 {
    font-size: 2.2rem;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 25px;
    opacity: 0.9;
  }
`;

const PromoButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: #E91E63;
  padding: 12px 25px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ShoppingCategoriesSection = styled.section`
  padding: 40px 0;
  background-color: #f9f9f9;
`;

const ShoppingCategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const ShoppingCategoryCard = styled(Link)`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ShoppingCategoryImage = styled.div`
  height: 200px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%);
  }
`;

const ShoppingCategoryTitle = styled.h3`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 1.8rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const ShoppingCategoryContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ShoppingCategoryDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  flex: 1;
`;

const ShoppingCategoryButton = styled.span`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4CAF50;
  font-weight: 600;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

// HomePage bileşeni
const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [trendRecipes, setTrendRecipes] = useState([]);
  
  // Trend tarifleri hazırla
  useEffect(() => {
    // Simüle API çağrısı
    const trends = [
      {
        id: 1,
        title: 'Tavuk Sote',
        image: 'https://cdn.pixabay.com/photo/2015/03/26/09/39/fried-chicken-690039_1280.jpg',
        time: '25 dk',
        servings: '4 kişilik',
        description: 'Hızlı ve lezzetli bir akşam yemeği. Tavada sotelenmiş tavuk, sebze ve baharatlarla enfes bir lezzet.',
        price: '₺75-90',
        rating: 4.7,
        likes: 142,
        badges: ['hızlı', 'ekonomik']
      },
      {
        id: 2,
        title: 'Mercimek Köftesi',
        image: 'https://cdn.pixabay.com/photo/2021/01/16/17/52/food-5923092_1280.jpg',
        time: '40 dk',
        servings: '6-8 kişilik',
        description: 'Klasik Türk mutfağının vazgeçilmez bir mezesi. Kırmızı mercimek, bulgur ve taze yeşilliklerle hazırlanır.',
        price: '₺40-50',
        rating: 4.8,
        likes: 189,
        badges: ['vejetaryen', 'ekonomik']
      },
      {
        id: 3,
        title: 'Ev Yapımı Mantı',
        image: 'https://cdn.pixabay.com/photo/2021/03/02/17/06/ravioli-6063128_1280.jpg',
        time: '90 dk',
        servings: '6-8 kişilik',
        description: 'Geleneksel lezzet mantı, bol yoğurtlu ve domatesli sosla servis edilir.',
        price: '₺80-110',
        rating: 4.9,
        likes: 205,
        badges: ['geleneksel', 'doyurucu']
      }
    ];
    
    setTrendRecipes(trends);
  }, []);
  
  // Kategoriler
  const categories = [
    {
      id: 'ana-yemekler',
      title: 'Ana Yemekler',
      count: 42,
      image: 'https://cdn.pixabay.com/photo/2014/04/22/02/56/pasta-329521_1280.jpg'
    },
    {
      id: 'corbalar',
      title: 'Çorbalar',
      count: 18,
      image: 'https://cdn.pixabay.com/photo/2018/08/31/19/13/pumpkin-soup-3645375_1280.jpg'
    },
    {
      id: 'tatlilar',
      title: 'Tatlılar',
      count: 24,
      image: 'https://cdn.pixabay.com/photo/2016/03/27/22/38/cake-1284548_1280.jpg'
    },
    {
      id: 'kahvaltilik',
      title: 'Kahvaltılık',
      count: 16,
      image: 'https://cdn.pixabay.com/photo/2016/11/29/11/15/breakfast-1869132_1280.jpg'
    },
    {
      id: 'atistirmaliklar',
      title: 'Atıştırmalıklar',
      count: 20,
      image: 'https://cdn.pixabay.com/photo/2021/02/08/12/40/platter-5994701_1280.jpg'
    },
    {
      id: 'icecekler',
      title: 'İçecekler',
      count: 14,
      image: 'https://cdn.pixabay.com/photo/2016/10/22/20/34/smoothie-1761548_1280.jpg'
    },
    {
      id: 'vejetaryen',
      title: 'Vejetaryen',
      count: 30,
      image: 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg'
    }
  ];
  
  // Öne çıkan tarifler
  const featuredRecipes = [
    {
      id: '1',
      title: 'Ev Yapımı Lazanya',
      image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      time: '45 dk',
      servings: '4-6 kişilik',
      description: 'Lezzetli ve doyurucu ev yapımı lazanya. İtalyan mutfağının bu klasik lezzeti herkesi memnun edecek.',
      price: '₺120'
    },
    {
      id: '5',
      title: 'Mercimek Çorbası',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      time: '25 dk',
      servings: '4 kişilik',
      description: 'Türk mutfağının vazgeçilmez çorbası. Besleyici ve ekonomik bir seçenek.',
      price: '₺30'
    },
    {
      id: '7',
      title: 'Çikolatalı Brownie',
      image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      time: '35 dk',
      servings: '8 dilim',
      description: 'Dışı çıtır içi yumuşacık, bol çikolatalı brownie. Tatlı krizlerinin kurtarıcısı.',
      price: '₺70'
    }
  ];
  
  // Püf noktaları
  const cookingTips = [
    {
      icon: '💡',
      title: 'Bütçe Dostu Alışveriş',
      text: 'Mevsiminde sebze ve meyve alın. Toplu alışveriş yapın ve dondurucuyu kullanın. Market markalı ürünleri deneyin.'
    },
    {
      icon: '⏱️',
      title: 'Zaman Tasarrufu',
      text: 'Haftalık yemek planı yapın. Büyük miktarlarda pişirin ve dondurun. Bir pişirme seansında birkaç tarif hazırlayın.'
    },
    {
      icon: '🌱',
      title: 'İsraf Önleme',
      text: 'Yemeklerin kalanlarını yeni tariflerde değerlendirin. Sebzelerin saplarını ve yapraklarını atışvermek yerine başka tariflerde kullanın.'
    },
    {
      icon: '🔪',
      title: 'Malzeme Değişimi',
      text: 'Pahalı malzemeleri daha uygun fiyatlı alternatifleriyle değiştirin. Örneğin pahalı etler yerine daha ekonomik parçaları kullanın.'
    }
  ];
  
  // Örnek alışveriş kategorileri
  const shoppingCategories = [
    {
      id: 'atistirmalik',
      title: 'Atıştırmalık',
      description: 'Lezzetli cipsler, çikolatalar ve atıştırmalıklar ile kendinizi şımartın. Her damak zevkine uygun seçeneklerle dolu.',
      image: 'https://cdn.pixabay.com/photo/2016/11/29/04/31/chips-1867459_1280.jpg'
    },
    {
      id: 'icecekler',
      title: 'İçecekler',
      description: 'Serinletici gazlı içeceklerden meyve sularına kadar geniş içecek çeşitlerimizle susuzluğunuzu giderin.',
      image: 'https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg'
    },
    {
      id: 'sutUrunleri',
      title: 'Süt Ürünleri',
      description: 'Taze süt, peynir, yoğurt ve diğer süt ürünleri ile sağlıklı beslenmeyi destekleyin.',
      image: 'https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_1280.jpg'
    }
  ];
  
  // Malzemeleri alışveriş listesine ekle
  const addToShoppingList = (recipeId, title) => {
    setActiveRecipe(title);
    
    // Örnek malzeme listesi
    const ingredientsByRecipe = {
      1: [
        '500g tavuk göğsü',
        '2 adet soğan',
        '3 diş sarımsak',
        '2 adet domates',
        '2 yemek kaşığı domates salçası',
        'Tuz, karabiber, kekik',
        'Zeytinyağı'
      ],
      2: [
        '400g kıyma',
        '2 adet patates',
        '1 adet soğan',
        '1/2 demet maydanoz',
        'Tuz, karabiber',
        '1 yemek kaşığı tereyağı'
      ],
      3: [
        '250g un',
        '3 adet yumurta',
        '1 su bardağı süt',
        '50g tereyağı',
        '2 yemek kaşığı şeker',
        '1 paket kabartma tozu'
      ]
    };
    
    const ingredients = ingredientsByRecipe[recipeId] || [];
    
    // LocalStorage'dan mevcut alışveriş listesini çek
    const existingList = localStorage.getItem('shoppingList');
    let shoppingList = existingList ? JSON.parse(existingList) : [];
    
    // Kategorilere malzemeleri map et
    const categorizedIngredients = ingredients.map(ingredient => {
      // Basit kategori tespiti
      let category = 'other';
      const lowerIngredient = ingredient.toLowerCase();
      
      if (lowerIngredient.includes('süt') || lowerIngredient.includes('peynir') || 
          lowerIngredient.includes('yoğurt') || lowerIngredient.includes('yumurta')) {
        category = 'dairy';
      } else if (lowerIngredient.includes('et') || lowerIngredient.includes('tavuk') || lowerIngredient.includes('kıyma')) {
        category = 'meat';
      } else if (lowerIngredient.includes('ekmek') || lowerIngredient.includes('un')) {
        category = 'bakery';
      } else if (lowerIngredient.includes('tuz') || lowerIngredient.includes('karabiber') || lowerIngredient.includes('kekik')) {
        category = 'spices';
      } else if (lowerIngredient.includes('domates') || lowerIngredient.includes('soğan') || 
                 lowerIngredient.includes('patates') || lowerIngredient.includes('maydanoz')) {
        category = 'fruits';
      }
      
      // Miktar ve birim ayırımı için basit bir regex
      const qtyMatch = ingredient.match(/^(\d+\/?\d*|\d*\.?\d+)?\s*(?:adet|kg|g|ml|litre|paket|su bardağı|çay bardağı)?/i);
      let quantity = '1';
      let unit = 'piece';
      
      if (qtyMatch && qtyMatch[1]) {
        quantity = qtyMatch[1].trim();
        
        if (ingredient.includes('kg')) unit = 'kg';
        else if (ingredient.includes('g') && !ingredient.includes('kg')) unit = 'g';
        else if (ingredient.includes('litre')) unit = 'l';
        else if (ingredient.includes('ml')) unit = 'ml';
        else if (ingredient.includes('paket')) unit = 'packet';
        else if (ingredient.includes('yemek kaşığı')) unit = 'spoon';
        else if (ingredient.includes('çay kaşığı')) unit = 'teaspoon';
        else if (ingredient.includes('su bardağı')) unit = 'cup';
      }
      
      // Malzeme adını temizle
      let name = ingredient.replace(/^(\d+\/?\d*|\d*\.?\d+)?\s*(?:adet|kg|g|ml|litre|paket|kutu|su bardağı)?\s*/i, '').trim();
      
      return {
        id: Date.now() + Math.random(),
        name,
        quantity,
        unit,
        category,
        checked: false
      };
    });
    
    // Her bir malzeme için kontrol et ve ekle
    categorizedIngredients.forEach(newItem => {
      const existingItemIndex = shoppingList.findIndex(item => 
        item.name.toLowerCase() === newItem.name.toLowerCase() && 
        item.unit === newItem.unit
      );
      
      if (existingItemIndex >= 0) {
        // Var olan malzemenin miktarını güncelle
        const existingItem = shoppingList[existingItemIndex];
        const newQuantity = parseFloat(existingItem.quantity) + parseFloat(newItem.quantity);
        shoppingList[existingItemIndex] = { 
          ...existingItem, 
          quantity: newQuantity.toString() 
        };
      } else {
        // Yeni malzeme ekle
        shoppingList.push(newItem);
      }
    });
    
    // LocalStorage'a kaydet
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    
    // Bildirim göster
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  return (
    <HomeContainer>
      <Header>
        <Logo>Ucuza<span>Pişir</span></Logo>
      </Header>
      
      <HeroSection>
        <HeroTitle>Ekonomik ve Lezzetli Tarifler</HeroTitle>
        <HeroSubtitle>Bütçe dostu, pratik ve lezzetli tarifleri keşfedin. Ucuza Pişir ile mutfakta tasarruf edin ve lezzetten ödün vermeyin.</HeroSubtitle>
        <SearchBar>
          <SearchInput type="text" placeholder="Tarif veya malzeme arayın..." />
          <SearchButton><FaSearch style={{marginRight: '8px'}} /> Tariflerde Ara</SearchButton>
        </SearchBar>
      </HeroSection>
      
      <Banner>
        <BannerContent>
          <h3><FaMoneyBillWave style={{marginRight: '8px'}} /> Bütçe Dostu Tarifler</h3>
          <p>Güncel market fiyatlarına göre en ekonomik tarifleri keşfedin.</p>
        </BannerContent>
        <BannerButton to="/recipes">Tariflere Göz Atın</BannerButton>
      </Banner>
      
      <SectionTitle>Tarif Kategorileri</SectionTitle>
      <CategoriesContainer>
        {categories.map((category) => (
          <CategoryCard key={category.id} to={`/category/${category.id}`}>
            <CategoryImage src={category.image} alt={category.title} />
            <CategoryContent>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryCount>{category.count} tarif</CategoryCount>
            </CategoryContent>
          </CategoryCard>
        ))}
      </CategoriesContainer>
      
      <SectionTitle>Popüler Tarifler</SectionTitle>
      <PopularRecipesContainer>
        <PopularRecipesGrid>
          {trendRecipes.map(recipe => (
            <PopularRecipeCard key={recipe.id}>
              <PopularRecipeImage src={recipe.image} alt={recipe.title} />
              <PopularRecipeContent>
                <RecipeMainInfo>
                  <RecipeTitle>{recipe.title}</RecipeTitle>
                  <RecipeRating>
                    {Array(5).fill().map((_, i) => (
                      <FaStar key={i} color={i < Math.floor(recipe.rating) ? '#FFC107' : '#e0e0e0'} />
                    ))}
                    <span style={{color: '#333', marginLeft: '5px', fontSize: '0.9rem'}}>{recipe.rating}</span>
                  </RecipeRating>
                </RecipeMainInfo>
                
                <Badges>
                  <Badge color="#FF9800"><FaFire /> Trend</Badge>
                  {recipe.badges.map((badge, i) => (
                    <Badge key={i} color={badge === 'ekonomik' ? '#4CAF50' : 
                                         badge === 'protein' ? '#2196F3' : 
                                         badge === 'geleneksel' ? '#9C27B0' : 
                                         badge === 'doyurucu' ? '#E91E63' : '#607D8B'}>
                      {badge === 'ekonomik' ? <FaMoneyBillWave /> : 
                       badge === 'protein' ? <FaUtensils /> : 
                       badge === 'geleneksel' ? <FaTrophy /> : 
                       badge === 'doyurucu' ? <FaAppleAlt /> : <FaBolt />}
                      {badge}
                    </Badge>
                  ))}
                </Badges>
                
                <RecipeMeta>
                  <span><FaClock /> {recipe.time}</span>
                  <span><FaUsers /> {recipe.servings}</span>
                </RecipeMeta>
                
                <RecipeDescription>{recipe.description}</RecipeDescription>
                <RecipePrice><FaMoneyBillWave /> {recipe.price}</RecipePrice>
                
                <RecipeActions>
                  <ViewRecipeButton to={`/recipes/${recipe.id}`}>
                    <FaUtensils style={{marginRight: '5px'}} /> Tarifi Görüntüle
                  </ViewRecipeButton>
                  <span style={{color: '#E91E63', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <FaHeart /> {recipe.likes}
                  </span>
                </RecipeActions>
              </PopularRecipeContent>
            </PopularRecipeCard>
          ))}
        </PopularRecipesGrid>
      </PopularRecipesContainer>
      
      <SectionTitle>Öne Çıkan Tarifler</SectionTitle>
      <FeaturedRecipesContainer>
        <RecipeCard>
          <RecipeImage src="https://images.unsplash.com/photo-1633436375795-12b3b339512f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Tavuk Sote" />
          <RecipeContent>
            <RecipeTitle>Tavuk Sote</RecipeTitle>
            <RecipeMeta>
              <span><FaClock /> 35 dakika</span>
              <span><FaUsers /> 4 kişilik</span>
            </RecipeMeta>
            <Badges>
              <Badge><FaMoneyBillWave /> ekonomik</Badge>
              <Badge color="#2196F3"><FaUtensils /> protein</Badge>
            </Badges>
            <RecipeDescription>
              Sebzeli ve baharatlı, hızlı pişen ekonomik tavuk sote tarifi.
            </RecipeDescription>
            <RecipePrice><FaMoneyBillWave /> ₺90-120</RecipePrice>
            <RecipeActionButtons>
              <ViewRecipeButton to={`/recipes/1`}>
                <FaUtensils /> Tarifi Görüntüle
              </ViewRecipeButton>
              <AddToShoppingListButton onClick={() => addToShoppingList(1, 'Tavuk Sote')}>
                <FaShoppingCart />
              </AddToShoppingListButton>
            </RecipeActionButtons>
          </RecipeContent>
        </RecipeCard>
        
        <RecipeCard>
          <RecipeImage src="https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Patatesli Köfte" />
          <RecipeContent>
            <RecipeTitle>Patatesli Köfte</RecipeTitle>
            <RecipeMeta>
              <span><FaClock /> 45 dakika</span>
              <span><FaUsers /> 6 kişilik</span>
            </RecipeMeta>
            <Badges>
              <Badge><FaMoneyBillWave /> ekonomik</Badge>
              <Badge color="#9C27B0"><FaTrophy /> geleneksel</Badge>
            </Badges>
            <RecipeDescription>
              Dışı çıtır içi yumuşacık, lezzetli patatesli köfte tarifi.
            </RecipeDescription>
            <RecipePrice><FaMoneyBillWave /> ₺70-100</RecipePrice>
            <RecipeActionButtons>
              <ViewRecipeButton to={`/recipes/2`}>
                <FaUtensils /> Tarifi Görüntüle
              </ViewRecipeButton>
              <AddToShoppingListButton onClick={() => addToShoppingList(2, 'Patatesli Köfte')}>
                <FaShoppingCart />
              </AddToShoppingListButton>
            </RecipeActionButtons>
          </RecipeContent>
        </RecipeCard>
        
        <RecipeCard>
          <RecipeImage src="https://images.unsplash.com/photo-1555813456-94a3dd418cd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Krep" />
          <RecipeContent>
            <RecipeTitle>Krep</RecipeTitle>
            <RecipeMeta>
              <span><FaClock /> 25 dakika</span>
              <span><FaUsers /> 3 kişilik</span>
            </RecipeMeta>
            <Badges>
              <Badge><FaMoneyBillWave /> ekonomik</Badge>
              <Badge color="#FF5722"><FaBolt /> pratik</Badge>
            </Badges>
            <RecipeDescription>
              Kahvaltıda ya da tatlı olarak servis edebileceğiniz pratik krep tarifi.
            </RecipeDescription>
            <RecipePrice><FaMoneyBillWave /> ₺40-60</RecipePrice>
            <RecipeActionButtons>
              <ViewRecipeButton to={`/recipes/3`}>
                <FaUtensils /> Tarifi Görüntüle
              </ViewRecipeButton>
              <AddToShoppingListButton onClick={() => addToShoppingList(3, 'Krep')}>
                <FaShoppingCart />
              </AddToShoppingListButton>
            </RecipeActionButtons>
          </RecipeContent>
        </RecipeCard>
      </FeaturedRecipesContainer>
      
      <PromoBanner>
        <PromoContent>
          <h2>%30 Daha Ekonomik Tarifler</h2>
          <p>Aynı lezzeti daha az bütçeyle elde edin. İndirimli malzemeler ve uygun fiyatlı alternatiflerle ekonomik tarifler hazırlamanın püf noktalarını öğrenin.</p>
          <PromoButton to="/recipes">Ekonomik Tariflere Göz Atın</PromoButton>
        </PromoContent>
      </PromoBanner>
      
      <SectionTitle>Nasıl Çalışır?</SectionTitle>
      <HowItWorksContainer>
        <StepsContainer>
          <StepCard>
            <StepIcon>1</StepIcon>
            <StepTitle>Tarif Seçin</StepTitle>
            <StepDescription>
              Yüzlerce ekonomik tarif arasından bütçenize ve damak zevkinize uygun olanı seçin.
            </StepDescription>
          </StepCard>
          <StepCard>
            <StepIcon>2</StepIcon>
            <StepTitle>Malzeme Listesi Oluşturun</StepTitle>
            <StepDescription>
              Tarifte kullanılan malzemeleri alışveriş listenize ekleyin, tahmini maliyeti görün.
            </StepDescription>
          </StepCard>
          <StepCard>
            <StepIcon>3</StepIcon>
            <StepTitle>Lezzetle Pişirin</StepTitle>
            <StepDescription>
              Adım adım talimatlarla lezzetli yemekler pişirin, tasarruf edin ve afiyetle yiyin.
            </StepDescription>
          </StepCard>
        </StepsContainer>
      </HowItWorksContainer>
      
      <SectionTitle>Ekonomik Pişirme Püf Noktaları</SectionTitle>
      <TipsContainer>
        <TipsGrid>
          {cookingTips.map((tip, index) => (
            <TipCard key={index}>
              <TipIcon>{tip.icon}</TipIcon>
              <TipContent>
                <TipTitle>{tip.title}</TipTitle>
                <TipText>{tip.text}</TipText>
              </TipContent>
            </TipCard>
          ))}
        </TipsGrid>
      </TipsContainer>
      
      <NewsletterSection>
        <NewsletterTitle>Ekonomik Tarifler İçin Abone Olun</NewsletterTitle>
        <NewsletterText>
          Haftalık yeni tarifler, mevsimlik indirimli malzemeler ve para tasarrufu ipuçları için bültenimize abone olun.
        </NewsletterText>
        <NewsletterForm>
          <NewsletterInput type="email" placeholder="E-posta adresinizi girin" />
          <NewsletterButton><FaSave style={{marginRight: '8px'}} /> Abone Ol</NewsletterButton>
        </NewsletterForm>
      </NewsletterSection>
      
      <Notification show={showNotification}>
        <FaShoppingCart style={{marginRight: '8px'}} /> {activeRecipe} için malzemeler alışveriş listesine eklendi! ✓
      </Notification>
      
      {/* Alışveriş Kategorileri Bölümü */}
      <ShoppingCategoriesSection>
        <div className="container">
          <SectionTitle>Ekonomik Alışveriş</SectionTitle>
          <ShoppingCategoriesGrid>
            {shoppingCategories.map(category => (
              <ShoppingCategoryCard key={category.id} to={`/shopping/${category.id}`}>
                <ShoppingCategoryImage image={category.image}>
                  <ShoppingCategoryTitle>{category.title}</ShoppingCategoryTitle>
                </ShoppingCategoryImage>
                <ShoppingCategoryContent>
                  <ShoppingCategoryDescription>{category.description}</ShoppingCategoryDescription>
                  <ShoppingCategoryButton>
                    Alışverişe Başla <FaArrowRight />
                  </ShoppingCategoryButton>
                </ShoppingCategoryContent>
              </ShoppingCategoryCard>
            ))}
          </ShoppingCategoriesGrid>
        </div>
      </ShoppingCategoriesSection>
    </HomeContainer>
  );
};

export default HomePage;
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';

const RecipesSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.background};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.md};
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 0;
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const RecipeCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.medium} ${props => props.theme.borderRadius.medium} 0 0;
  margin: -${props => props.theme.spacing.lg} -${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
`;

const RecipeTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const RecipeMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.lightText};
  font-size: 0.9rem;
`;

const RecipeDescription = styled.p`
  flex-grow: 1;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const RecipePrice = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PopularRecipes = () => {
  // Örnek tarif verileri
  const recipes = [
    {
      id: 1,
      title: 'Ev Yapımı Lazanya',
      time: '45 dk',
      difficulty: 'Orta',
      image: '/images/lasagna.jpg',
      description: 'Lezzetli ve doyurucu ev yapımı lazanya tarifi. Bol peynirli ve soslu.',
      price: '₺120'
    },
    {
      id: 2,
      title: 'Köfte Patates',
      time: '30 dk',
      difficulty: 'Kolay',
      image: '/images/meatballs.jpg',
      description: 'Klasik Türk mutfağından köfte patates. Yanında yoğurtla servis edilir.',
      price: '₺85'
    },
    {
      id: 3,
      title: 'Sebzeli Makarna',
      time: '20 dk',
      difficulty: 'Kolay',
      image: '/images/pasta.jpg',
      description: 'Rengarenk sebzelerle hazırlanan sağlıklı ve lezzetli makarna tarifi.',
      price: '₺60'
    }
  ];

  return (
    <RecipesSection>
      <div className="container">
        <SectionHeader>
          <SectionTitle>Popüler Tarifler</SectionTitle>
          <Button as={Link} to="/recipes" variant="outline">
            Tüm Tarifleri Gör
          </Button>
        </SectionHeader>
        
        <RecipesGrid>
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id}>
              <RecipeImage src={recipe.image} alt={recipe.title} />
              <RecipeTitle>{recipe.title}</RecipeTitle>
              
              <RecipeMeta>
                <span>⏱️ {recipe.time}</span>
                <span>🔥 {recipe.difficulty}</span>
              </RecipeMeta>
              
              <RecipeDescription>{recipe.description}</RecipeDescription>
              <RecipePrice>Tahmini Maliyet: {recipe.price}</RecipePrice>
              
              <Button as={Link} to={`/recipes/${recipe.id}`} variant="primary" fullWidth>
                Tarifi Gör
              </Button>
            </RecipeCard>
          ))}
        </RecipesGrid>
      </div>
    </RecipesSection>
  );
};

export default PopularRecipes;
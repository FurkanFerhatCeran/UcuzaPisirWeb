import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const PageTitle = styled.h1`
  color: #4CAF50;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #4CAF50, #FF9800);
    margin: 10px auto 0;
    border-radius: 3px;
  }
`;

const PageDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
`;

const SearchAndFilterSection = styled.div`
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 14px 20px;
  border: 1px solid #ddd;
  border-radius: 8px 0 0 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }
`;

const SearchButton = styled.button`
  background-color: #FF9800;
  color: white;
  border: none;
  padding: 14px 25px;
  border-radius: 0 8px 8px 0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #F57C00;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 8px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const RecipeCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    
    img {
      transform: scale(1.05);
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
  padding: 20px;
`;

const RecipeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const RecipeTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  color: #333;
`;

const RecipeDifficulty = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  
  &.easy {
    background-color: #8BC34A;
    color: white;
  }
  
  &.medium {
    background-color: #FFC107;
    color: white;
  }
  
  &.hard {
    background-color: #FF5722;
    color: white;
  }
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
  margin-bottom: 15px;
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
  
  &:hover {
    background-color: #45a049;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 10px;
`;

const PageButton = styled.button`
  background-color: ${props => props.active ? '#4CAF50' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: ${props => props.active ? 'none' : '1px solid #ddd'};
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#f5f5f5'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const NoRecipesFound = styled.div`
  text-align: center;
  padding: 50px 0;
  color: #666;
  
  h3 {
    color: #333;
    margin-bottom: 15px;
  }
  
  p {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const RecipesPage = () => {
  // Örnek tarif verileri
  const exampleRecipes = [
    {
      id: 1,
      title: 'Ev Yapımı Lazanya',
      image: 'https://cdn.pixabay.com/photo/2017/02/15/15/17/meal-2069021_1280.jpg',
      difficulty: 'medium',
      time: '45 dk',
      servings: '4-6 kişilik',
      description: 'Lezzetli ve doyurucu ev yapımı lazanya. İtalyan mutfağının bu klasik lezzeti herkesi memnun edecek.',
      price: '₺120',
      categories: ['Ana Yemek', 'İtalyan'],
      author: 'Ayşe Yılmaz'
    },
    {
      id: 2,
      title: 'Köfte Patates',
      image: 'https://cdn.pixabay.com/photo/2019/11/09/17/02/burger-4614022_1280.jpg',
      difficulty: 'easy',
      time: '30 dk',
      servings: '4 kişilik',
      description: 'Yer sofraların vazgeçilmezi, pratik ve lezzetli bir tarif. Çocukların en sevdiği yemeklerden biri.',
      price: '₺85',
      categories: ['Ana Yemek', 'Türk Mutfağı'],
      author: 'Mehmet Demir'
    },
    {
      id: 3,
      title: 'Sebzeli Makarna',
      image: 'https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_1280.jpg',
      difficulty: 'easy',
      time: '20 dk',
      servings: '2 kişilik',
      description: 'Sağlıklı ve hafif bir makarna alternatifi. Taze sebzelerle hazırlanmış, lezzetli bir öğün.',
      price: '₺60',
      categories: ['Ana Yemek', 'Vejetaryen'],
      author: 'Zeynep Kaya'
    },
    {
      id: 4,
      title: 'Tandır Kebabı',
      image: 'https://cdn.pixabay.com/photo/2020/09/06/14/07/meat-5549332_1280.jpg',
      difficulty: 'hard',
      time: '3 saat',
      servings: '6-8 kişilik',
      description: 'Geleneksel tandır fırınında pişirilmiş, yumuşacık ve sulu et. Özel günlerin vazgeçilmez lezzeti.',
      price: '₺220',
      categories: ['Ana Yemek', 'Türk Mutfağı'],
      author: 'Ali Şahin'
    },
    {
      id: 5,
      title: 'Çikolatalı Brownie',
      image: 'https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg',
      difficulty: 'medium',
      time: '35 dk',
      servings: '8 dilim',
      description: 'Dışı çıtır içi yumuşacık, bol çikolatalı brownie. Tatlı krizlerinin kurtarıcısı.',
      price: '₺70',
      categories: ['Tatlı', 'Dünya Mutfağı'],
      author: 'Selin Yıldız'
    },
    {
      id: 6,
      title: 'Mercimek Çorbası',
      image: 'https://cdn.pixabay.com/photo/2017/03/16/20/40/lentil-soup-2150173_1280.jpg',
      difficulty: 'easy',
      time: '25 dk',
      servings: '4 kişilik',
      description: 'Türk mutfağının vazgeçilmez çorbası. Besleyici ve ekonomik bir seçenek.',
      price: '₺30',
      categories: ['Çorba', 'Türk Mutfağı'],
      author: 'Fatma Yılmaz'
    },
    {
      id: 7,
      title: 'Karışık Meyveli Yoğurt',
      image: 'https://cdn.pixabay.com/photo/2015/05/26/17/45/yogurt-780044_1280.jpg',
      difficulty: 'easy',
      time: '10 dk',
      servings: '2 kişilik',
      description: 'Taze meyveler ve yoğurtla hazırlanan sağlıklı ve ferahlatıcı bir ara öğün.',
      price: '₺40',
      categories: ['Tatlı', 'Vejetaryen'],
      author: 'Deniz Kaya'
    },
    {
      id: 8,
      title: 'Domates Çorbası',
      image: 'https://cdn.pixabay.com/photo/2016/03/05/19/58/tomato-soup-1238246_1280.jpg',
      difficulty: 'easy',
      time: '25 dk',
      servings: '4 kişilik',
      description: 'Hafif, sağlıklı ve ekonomik domates çorbası. Hem çocuklar hem yetişkinler için harika bir seçenek.',
      price: '₺25',
      categories: ['Çorba', 'Vejetaryen'],
      author: 'Elif Şahin'
    },
    {
      id: 9,
      title: 'Kumpir',
      image: 'https://cdn.pixabay.com/photo/2019/03/22/19/04/potatoes-4073582_1280.jpg',
      difficulty: 'easy',
      time: '35 dk',
      servings: '2 kişilik',
      description: 'Fırında pişen bol tereyağlı patates ve üzerine eklenen çeşit çeşit malzemelerle lezzetli kumpir.',
      price: '₺60',
      categories: ['Ana Yemek', 'Vejetaryen'],
      author: 'Zeynep Kaya'
    }
  ];
  
  // Kategori ve zorluk seviyeleri
  const categories = ['Tümü', 'Ana Yemek', 'Çorba', 'Tatlı', 'Vejetaryen', 'Türk Mutfağı', 'Dünya Mutfağı', 'İtalyan'];
  const difficulties = ['Tümü', 'Kolay', 'Orta', 'Zor'];
  
  // State yönetimi
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tümü');
  const [priceRange, setPriceRange] = useState('Tümü');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState(exampleRecipes);
  
  // Fiyat aralıkları
  const priceRanges = [
    'Tümü',
    '₺0 - ₺50',
    '₺50 - ₺100',
    '₺100 - ₺150',
    '₺150+'
  ];
  
  // Arama ve filtreleme
  const handleSearch = () => {
    let filtered = exampleRecipes;
    
    // Arama terimine göre filtreleme
    if (searchTerm) {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Kategoriye göre filtreleme
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(recipe => 
        recipe.categories.includes(selectedCategory)
      );
    }
    
    // Zorluk derecesine göre filtreleme
    if (selectedDifficulty !== 'Tümü') {
      const difficultyMap = {
        'Kolay': 'easy',
        'Orta': 'medium',
        'Zor': 'hard'
      };
      filtered = filtered.filter(recipe => 
        recipe.difficulty === difficultyMap[selectedDifficulty]
      );
    }
    
    // Fiyat aralığına göre filtreleme
    if (priceRange !== 'Tümü') {
      if (priceRange === '₺0 - ₺50') {
        filtered = filtered.filter(recipe => {
          const price = parseFloat(recipe.price.replace('₺', ''));
          return price >= 0 && price <= 50;
        });
      } else if (priceRange === '₺50 - ₺100') {
        filtered = filtered.filter(recipe => {
          const price = parseFloat(recipe.price.replace('₺', ''));
          return price > 50 && price <= 100;
        });
      } else if (priceRange === '₺100 - ₺150') {
        filtered = filtered.filter(recipe => {
          const price = parseFloat(recipe.price.replace('₺', ''));
          return price > 100 && price <= 150;
        });
      } else if (priceRange === '₺150+') {
        filtered = filtered.filter(recipe => {
          const price = parseFloat(recipe.price.replace('₺', ''));
          return price > 150;
        });
      }
    }
    
    setRecipes(filtered);
    setCurrentPage(1);
  };
  
  // Zorluk seviyesine göre CSS sınıfı
  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'easy';
      case 'medium':
        return 'medium';
      case 'hard':
        return 'hard';
      default:
        return '';
    }
  };
  
  // Zorluk seviyesinin Türkçe karşılığı
  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'Kolay';
      case 'medium':
        return 'Orta';
      case 'hard':
        return 'Zor';
      default:
        return '';
    }
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Tarifler</PageTitle>
        <PageDescription>
          En lezzetli ve ekonomik yemekleri pişirmek için aradığınız bütün tarifler burada!
          Yapay zeka destekli sistemimiz, tariflerinizi en uygun maliyetle hazırlamanızı sağlar.
        </PageDescription>
      </PageHeader>
      
      <SearchAndFilterSection>
        <SearchBar>
          <SearchInput 
            type="text"
            placeholder="Tarif ara... (örn: Lazanya, Köfte, Çorba)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Ara</SearchButton>
        </SearchBar>
        
        <FilterSection>
          <FilterGroup>
            <FilterLabel htmlFor="category">Kategori</FilterLabel>
            <FilterSelect 
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="difficulty">Zorluk</FilterLabel>
            <FilterSelect 
              id="difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map((difficulty, index) => (
                <option key={index} value={difficulty}>{difficulty}</option>
              ))}
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="price">Fiyat Aralığı</FilterLabel>
            <FilterSelect 
              id="price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              {priceRanges.map((range, index) => (
                <option key={index} value={range}>{range}</option>
              ))}
            </FilterSelect>
          </FilterGroup>
        </FilterSection>
      </SearchAndFilterSection>
      
      {recipes.length > 0 ? (
        <>
          <RecipesGrid>
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id}>
                <RecipeImage src={recipe.image} alt={recipe.title} />
                <RecipeContent>
                  <RecipeHeader>
                    <RecipeTitle>{recipe.title}</RecipeTitle>
                    <RecipeDifficulty className={getDifficultyClass(recipe.difficulty)}>
                      {getDifficultyText(recipe.difficulty)}
                    </RecipeDifficulty>
                  </RecipeHeader>
                  
                  <RecipeMeta>
                    <span>⏱️ {recipe.time}</span>
                    <span>👥 {recipe.servings}</span>
                  </RecipeMeta>
                  
                  <RecipeDescription>{recipe.description}</RecipeDescription>
                  
                  <RecipePrice>Tahmini Maliyet: {recipe.price}</RecipePrice>
                  
                  <ViewRecipeButton to={`/recipes/${recipe.id}`}>
                    Tarifi Görüntüle
                  </ViewRecipeButton>
                </RecipeContent>
              </RecipeCard>
            ))}
          </RecipesGrid>
          
          <Pagination>
            <PageButton 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &laquo; Önceki
            </PageButton>
            
            {[1, 2, 3].map(page => (
              <PageButton 
                key={page}
                active={currentPage === page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PageButton>
            ))}
            
            <PageButton 
              disabled={currentPage === 3}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Sonraki &raquo;
            </PageButton>
          </Pagination>
        </>
      ) : (
        <NoRecipesFound>
          <h3>Tarif Bulunamadı</h3>
          <p>Arama kriterlerinize uygun tarif bulunamadı. Lütfen farklı anahtar kelimeler veya filtreler deneyin.</p>
        </NoRecipesFound>
      )}
    </PageContainer>
  );
};

export default RecipesPage; 
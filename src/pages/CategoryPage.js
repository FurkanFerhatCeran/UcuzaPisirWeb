import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  margin-bottom: 35px;
  text-align: center;
  position: relative;
`;

const CategoryImage = styled.div`
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%);
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CategoryTitle = styled.h1`
  color: #333;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #4CAF50, #FF9800);
    margin: 15px auto 0;
    border-radius: 3px;
  }
`;

const CategoryDescription = styled.p`
  color: #666;
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 30px;
  line-height: 1.6;
`;

const FilterSection = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: #333;
`;

const FilterSelect = styled.select`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const SortSelect = styled(FilterSelect)``;

const RecipesCount = styled.div`
  font-size: 1.1rem;
  color: #666;
  
  span {
    font-weight: 600;
    color: #4CAF50;
  }
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
  
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
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
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
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-3px);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
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

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ShoppingListButton = styled.button`
  flex: 1;
  background-color: #FF9800;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background-color: #F57C00;
    transform: translateY(-3px);
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

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const recipesPerPage = 9;
  
  // Kategori verileri
  const categories = {
    'ana-yemekler': {
      id: 'ana-yemekler',
      title: 'Ana Yemekler',
      image: 'https://cdn.pixabay.com/photo/2014/04/22/02/56/pasta-329521_1280.jpg',
      description: 'Günlük beslenmenizin temelini oluşturan, ekonomik ve doyurucu ana yemek tarifleri.'
    },
    'corbalar': {
      id: 'corbalar',
      title: 'Çorbalar',
      image: 'https://cdn.pixabay.com/photo/2018/08/31/19/13/pumpkin-soup-3645375_1280.jpg',
      description: 'Kışın içinizi ısıtacak, yazın ferahlatacak, ekonomik ve besleyici çorba tarifleri.'
    },
    'tatlilar': {
      id: 'tatlilar',
      title: 'Tatlılar',
      image: 'https://cdn.pixabay.com/photo/2016/03/27/22/38/cake-1284548_1280.jpg',
      description: 'Uygun fiyatlı malzemelerle hazırlayabileceğiniz, misafirlerinizi etkileyecek tatlı tarifleri.'
    },
    'salatalar': {
      id: 'salatalar',
      title: 'Salatalar',
      image: 'https://cdn.pixabay.com/photo/2016/08/18/18/40/salad-1603608_1280.jpg',
      description: 'Sağlıklı ve hafif beslenmenin vazgeçilmezi, ekonomik ve lezzetli salata tarifleri.'
    },
    'kahvaltilik': {
      id: 'kahvaltilik',
      title: 'Kahvaltılık',
      image: 'https://cdn.pixabay.com/photo/2016/11/29/11/15/breakfast-1869132_1280.jpg',
      description: 'Güne enerjik başlamanızı sağlayacak, ekonomik ve doyurucu kahvaltılık tarifleri.'
    },
    'atistirmaliklar': {
      id: 'atistirmaliklar',
      title: 'Atıştırmalıklar',
      image: 'https://cdn.pixabay.com/photo/2021/02/08/12/40/platter-5994701_1280.jpg',
      description: 'Film izlerken, misafir ağırlarken veya çay saatlerinde keyifle tüketebileceğiniz ekonomik atıştırmalık tarifleri.'
    },
    'icecekler': {
      id: 'icecekler',
      title: 'İçecekler',
      image: 'https://cdn.pixabay.com/photo/2016/10/22/20/34/smoothie-1761548_1280.jpg',
      description: 'Serinleten, ferahlatan ve içinizi ısıtan içecek tarifleri. Ev yapımı ekonomik ve sağlıklı içecekler.'
    },
    'dunya-mutfagi': {
      id: 'dunya-mutfagi',
      title: 'Dünya Mutfağı',
      image: 'https://cdn.pixabay.com/photo/2017/09/01/00/16/pizza-2702467_1280.jpg',
      description: 'İtalyan, Meksika, Çin, Hint ve daha pek çok dünya mutfağından ekonomik ve lezzetli tarifler.'
    }
  };

  // Seçilen kategori
  const selectedCategory = categories[categoryId];
  
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
      categories: ['ana-yemekler', 'dunya-mutfagi'],
      author: 'Ayşe Yılmaz',
      date: '2023-03-15'
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
      categories: ['ana-yemekler'],
      author: 'Mehmet Demir',
      date: '2023-03-10'
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
      categories: ['ana-yemekler', 'vejetaryen'],
      author: 'Zeynep Kaya',
      date: '2023-03-05'
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
      categories: ['ana-yemekler'],
      author: 'Ali Şahin',
      date: '2023-03-01'
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
      categories: ['tatlilar'],
      author: 'Selin Yıldız',
      date: '2023-02-28'
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
      categories: ['corbalar'],
      author: 'Fatma Yılmaz',
      date: '2023-02-25'
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
      categories: ['tatlilar', 'atistirmaliklar'],
      author: 'Deniz Kaya',
      date: '2023-03-22'
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
      categories: ['corbalar'],
      author: 'Elif Şahin',
      date: '2023-03-21'
    },
    {
      id: 9,
      title: 'Izgara Köfte',
      image: 'https://cdn.pixabay.com/photo/2016/03/05/20/03/meat-1245779_1280.jpg',
      difficulty: 'medium',
      time: '40 dk',
      servings: '4 kişilik',
      description: 'Baharat ve lezzetle dolu, yumuşacık ızgara köfte. Pilav veya patates püresi ile servis edilebilir.',
      price: '₺95',
      categories: ['ana-yemekler'],
      author: 'Mustafa Aydın',
      date: '2023-03-14'
    },
    {
      id: 10,
      title: 'Kumpir',
      image: 'https://cdn.pixabay.com/photo/2019/03/22/19/04/potatoes-4073582_1280.jpg',
      difficulty: 'easy',
      time: '35 dk',
      servings: '2 kişilik',
      description: 'Fırında pişen bol tereyağlı patates ve üzerine eklenen çeşit çeşit malzemelerle lezzetli kumpir.',
      price: '₺60',
      categories: ['ana-yemekler', 'atistirmaliklar'],
      author: 'Zeynep Kaya',
      date: '2023-02-20'
    },
    {
      id: 11,
      title: 'Meyveli Cheesecake',
      image: 'https://cdn.pixabay.com/photo/2016/11/29/11/38/cake-1869227_1280.jpg',
      difficulty: 'medium',
      time: '1 saat 20 dk',
      servings: '10-12 dilim',
      description: 'Taze meyvelerle süslenmiş, kremsi ve hafif cheesecake. Çayın ve kahvenin mükemmel eşlikçisi.',
      price: '₺95',
      categories: ['tatlilar'],
      author: 'Selin Yıldız',
      date: '2023-02-15'
    },
    {
      id: 12,
      title: 'Kısır',
      image: 'https://cdn.pixabay.com/photo/2020/01/16/14/59/food-4770756_1280.jpg',
      difficulty: 'easy',
      time: '25 dk',
      servings: '6-8 kişilik',
      description: 'Bol yeşillikli, nar ekşili, limonlu ve baharatlı geleneksel bulgur salatası.',
      price: '₺40',
      categories: ['atistirmaliklar', 'salatalar'],
      author: 'Ayşe Yılmaz',
      date: '2023-02-10'
    },
    {
      id: 13,
      title: 'Türk Kahvesi',
      image: 'https://cdn.pixabay.com/photo/2016/03/27/18/40/coffee-1283672_1280.jpg',
      difficulty: 'easy',
      time: '10 dk',
      servings: '2 kişilik',
      description: 'Geleneksel pişirme yöntemiyle, köpüklü ve aromali Türk kahvesi yapımı.',
      price: '₺20',
      categories: ['icecekler'],
      author: 'Mehmet Demir',
      date: '2023-02-05'
    },
    {
      id: 14,
      title: 'Menemen',
      image: 'https://cdn.pixabay.com/photo/2019/08/21/08/26/breakfast-4420759_1280.jpg',
      difficulty: 'easy',
      time: '20 dk',
      servings: '2 kişilik',
      description: 'Domates, biber ve yumurta ile hazırlanan, kahvaltıların vazgeçilmezi pratik menemen.',
      price: '₺30',
      categories: ['kahvaltilik'],
      author: 'Fatma Yılmaz',
      date: '2023-02-01'
    },
    {
      id: 15,
      title: 'Acılı Ezme',
      image: 'https://cdn.pixabay.com/photo/2017/09/10/14/23/salsa-2735842_1280.jpg',
      difficulty: 'easy',
      time: '15 dk',
      servings: '4-6 kişilik',
      description: 'Domates, biber, soğan ve baharatlarla hazırlanan geleneksel Türk mezesi.',
      price: '₺25',
      categories: ['atistirmaliklar'],
      author: 'Ali Şahin',
      date: '2023-01-28'
    },
    {
      id: 16,
      title: 'Soğuk Gazpacho Çorbası',
      image: 'https://cdn.pixabay.com/photo/2017/10/13/19/00/soup-2848313_1280.jpg',
      difficulty: 'medium',
      time: '30 dk + soğutma',
      servings: '4 kişilik',
      description: 'İspanyol mutfağından, domates bazlı, soğuk servis edilen ferahlatıcı yaz çorbası.',
      price: '₺45',
      categories: ['corbalar', 'dunya-mutfagi'],
      author: 'Zeynep Kaya',
      date: '2023-01-25'
    },
    {
      id: 17,
      title: 'Ev Yapımı Limonata',
      image: 'https://cdn.pixabay.com/photo/2017/07/05/15/41/cocktail-2474560_1280.jpg',
      difficulty: 'easy',
      time: '15 dk',
      servings: '6-8 bardak',
      description: 'Taze sıkılmış limon, nane yaprakları ve bal ile hazırlanan ferahlatıcı içecek.',
      price: '₺35',
      categories: ['icecekler'],
      author: 'Selin Yıldız',
      date: '2023-01-20'
    },
    {
      id: 18,
      title: 'Patates Kızartması',
      image: 'https://cdn.pixabay.com/photo/2016/11/21/16/02/french-fries-1846083_1280.jpg',
      difficulty: 'easy',
      time: '25 dk',
      servings: '4 kişilik',
      description: 'Dışı çıtır, içi yumuşak patates kızartması. Hamburger veya köfte yanında harika bir garnitür.',
      price: '₺25',
      categories: ['atistirmaliklar'],
      author: 'Mehmet Demir',
      date: '2023-03-17'
    },
    {
      id: 19,
      title: 'Peynirli Börek',
      image: 'https://cdn.pixabay.com/photo/2017/05/29/03/35/pie-2352460_1280.jpg',
      difficulty: 'medium',
      time: '45 dk',
      servings: '8 dilim',
      description: 'Kıyır kıyır yufkası ve bol peynirli içiyle nefis ev yapımı börek. Kahvaltıların vazgeçilmezi.',
      price: '₺50',
      categories: ['kahvaltilik'],
      author: 'Fatma Yılmaz',
      date: '2023-03-16'
    },
    {
      id: 20,
      title: 'Kremalı Mantar Çorbası',
      image: 'https://cdn.pixabay.com/photo/2018/01/08/01/11/soup-3068343_1280.jpg',
      difficulty: 'medium',
      time: '30 dk',
      servings: '4 kişilik',
      description: 'Kremsi dokusu ve zengin mantar aromasıyla damaklarda iz bırakan nefis bir çorba.',
      price: '₺45',
      categories: ['corbalar'],
      author: 'Selin Yıldız',
      date: '2023-03-18'
    }
  ];
  
  useEffect(() => {
    // Burada API'den kategoriye göre tarifleri çekebilirsiniz
    setLoading(true);
    
    // Şimdilik örnek verilerle çalışıyoruz
    setTimeout(() => {
      const filteredRecipes = exampleRecipes.filter(recipe => 
        recipe.categories.includes(categoryId)
      );
      
      setRecipes(filteredRecipes);
      setLoading(false);
    }, 500);
  }, [categoryId]);
  
  // Zorluk filtrelemesi
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };
  
  // Sıralama
  const handleSortChange = (e) => {
    setSort(e.target.value);
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
  
  // Filtreleme ve sıralama uygulama
  let filteredRecipes = [...recipes];
  
  // Zorluk filtrelemesi
  if (filter !== 'all') {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === filter);
  }
  
  // Sıralama
  switch (sort) {
    case 'newest':
      filteredRecipes.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'oldest':
      filteredRecipes.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'price-low':
      filteredRecipes.sort((a, b) => parseFloat(a.price.replace('₺', '')) - parseFloat(b.price.replace('₺', '')));
      break;
    case 'price-high':
      filteredRecipes.sort((a, b) => parseFloat(b.price.replace('₺', '')) - parseFloat(a.price.replace('₺', '')));
      break;
    default:
      break;
  }
  
  // Sayfalama
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  
  // Sayfa değiştirme
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Seçilen tarifin malzemelerini alışveriş listesine ekle
  const addToShoppingList = (recipeId) => {
    // Seçilen tarifi bul
    const selectedRecipe = exampleRecipes.find(r => r.id === recipeId);
    if (!selectedRecipe) return;
    
    setActiveRecipe(selectedRecipe.title);
    
    // Örnek malzeme listesi - gerçek uygulamada API'den alınacak
    const ingredients = [
      '500g kıyma',
      '2 adet soğan',
      '3 diş sarımsak',
      '2 adet domates',
      '2 yemek kaşığı domates salçası',
      'Tuz, karabiber, kekik',
      'Zeytinyağı'
    ];
    
    // LocalStorage'dan mevcut alışveriş listesini çek
    const existingList = localStorage.getItem('shoppingList');
    let shoppingList = existingList ? JSON.parse(existingList) : [];
    
    // Kategorilere malzemeleri map et
    const categorizedIngredients = ingredients.map(ingredient => {
      // Basit kategori tespiti
      let category = 'other';
      const lowerIngredient = ingredient.toLowerCase();
      
      if (lowerIngredient.includes('süt') || lowerIngredient.includes('peynir') || lowerIngredient.includes('yoğurt')) {
        category = 'dairy';
      } else if (lowerIngredient.includes('et') || lowerIngredient.includes('tavuk') || lowerIngredient.includes('kıyma')) {
        category = 'meat';
      } else if (lowerIngredient.includes('ekmek') || lowerIngredient.includes('un')) {
        category = 'bakery';
      } else if (lowerIngredient.includes('tuz') || lowerIngredient.includes('karabiber') || lowerIngredient.includes('kekik')) {
        category = 'spices';
      } else if (lowerIngredient.includes('domates') || lowerIngredient.includes('soğan') || lowerIngredient.includes('salatalık') || 
               lowerIngredient.includes('biber') || lowerIngredient.includes('patates')) {
        category = 'fruits';
      }
      
      // Miktar ve birim ayırımı için basit bir regex
      const qtyMatch = ingredient.match(/^(\d+\/?\d*|\d*\.?\d+)?\s*(?:adet|kg|g|ml|litre|paket|kutu)?/i);
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
      let name = ingredient.replace(/^(\d+\/?\d*|\d*\.?\d+)?\s*(?:adet|kg|g|ml|litre|paket|kutu)?\s*/i, '').trim();
      
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
  
  if (!selectedCategory) {
    return (
      <PageContainer>
        <NoRecipesFound>
          <h3>Kategori Bulunamadı</h3>
          <p>Aradığınız kategori mevcut değil. Lütfen geçerli bir kategori seçin.</p>
        </NoRecipesFound>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <PageHeader>
        <CategoryImage>
          <img src={selectedCategory.image} alt={selectedCategory.title} />
        </CategoryImage>
        <CategoryTitle>{selectedCategory.title}</CategoryTitle>
        <CategoryDescription>{selectedCategory.description}</CategoryDescription>
      </PageHeader>
      
      <FilterSection>
        <RecipesCount>
          <span>{filteredRecipes.length}</span> tarif bulundu
        </RecipesCount>
        
        <FilterGroup>
          <FilterLabel htmlFor="difficulty">Zorluk:</FilterLabel>
          <FilterSelect 
            id="difficulty"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">Tümü</option>
            <option value="easy">Kolay</option>
            <option value="medium">Orta</option>
            <option value="hard">Zor</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="sort">Sırala:</FilterLabel>
          <SortSelect 
            id="sort"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="price-low">Fiyat: Düşükten Yükseğe</option>
            <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
          </SortSelect>
        </FilterGroup>
      </FilterSection>
      
      {loading ? (
        <div>Yükleniyor...</div>
      ) : currentRecipes.length > 0 ? (
        <>
          <RecipesGrid>
            {currentRecipes.map(recipe => (
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
                  
                  <ActionButtons>
                    <ViewRecipeButton to={`/recipes/${recipe.id}`}>
                      Tarifi Görüntüle
                    </ViewRecipeButton>
                    <ShoppingListButton onClick={() => addToShoppingList(recipe.id)}>
                      🛒
                    </ShoppingListButton>
                  </ActionButtons>
                </RecipeContent>
              </RecipeCard>
            ))}
          </RecipesGrid>
          
          {totalPages > 1 && (
            <Pagination>
              <PageButton 
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                &laquo; Önceki
              </PageButton>
              
              {[...Array(totalPages).keys()].map(number => (
                <PageButton 
                  key={number + 1}
                  active={currentPage === number + 1}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </PageButton>
              ))}
              
              <PageButton 
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
              >
                Sonraki &raquo;
              </PageButton>
            </Pagination>
          )}
        </>
      ) : (
        <NoRecipesFound>
          <h3>Tarif Bulunamadı</h3>
          <p>Seçtiğiniz filtrelere uygun tarif bulunamadı. Lütfen farklı filtreler deneyin.</p>
        </NoRecipesFound>
      )}
      
      <Notification show={showNotification}>
        {activeRecipe} için malzemeler alışveriş listesine eklendi! ✓
      </Notification>
    </PageContainer>
  );
};

export default CategoryPage; 
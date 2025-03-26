import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const RecipeHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  
  @media (min-width: 992px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const RecipeImageContainer = styled.div`
  flex: 1;
  margin-bottom: 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  position: relative;
  
  &:hover img {
    transform: scale(1.05);
  }
  
  @media (min-width: 992px) {
    margin-bottom: 0;
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  border-radius: 12px;
  height: 450px;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const RecipeInfo = styled.div`
  flex: 1;
`;

const RecipeTitle = styled.h1`
  color: #333;
  margin-bottom: 15px;
  position: relative;
  font-size: 2.5rem;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #4CAF50, #FF9800);
    margin: 15px 0;
    border-radius: 3px;
  }
`;

const RecipeDescription = styled.p`
  color: #555;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const RecipeMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
`;

const MetaItem = styled.div`
  background-color: #f8f8f8;
  padding: 12px 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #555;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const RecipeDifficulty = styled.div`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 25px;
  
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

const RecipePrice = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #4CAF50;
  margin-bottom: 25px;
  padding: 15px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const RecipeAuthor = styled.div`
  font-style: italic;
  color: #777;
  margin-bottom: 25px;
`;

const CategoryTag = styled(Link)`
  display: inline-block;
  background-color: #f0f0f0;
  color: #555;
  padding: 8px 15px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
  
  &:hover {
    background-color: #4CAF50;
    color: white;
  }
`;

const RecipeTabs = styled.div`
  margin-bottom: 40px;
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 25px;
`;

const TabButton = styled.button`
  padding: 15px 30px;
  background-color: ${props => props.active ? '#4CAF50' : 'transparent'};
  color: ${props => props.active ? 'white' : '#555'};
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#f0f0f0'};
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

const IngredientsSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background: #4CAF50;
    margin-top: 10px;
  }
`;

const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &:before {
    content: "•";
    color: #4CAF50;
    font-weight: bold;
    margin-right: 10px;
    font-size: 1.2rem;
  }
`;

const InstructionsSection = styled.div``;

const StepsList = styled.ol`
  padding-left: 20px;
  counter-reset: steps;
`;

const StepItem = styled.li`
  margin-bottom: 25px;
  position: relative;
  padding-left: 40px;
  counter-increment: steps;
  
  &:before {
    content: counter(steps);
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: #4CAF50;
    color: white;
    border-radius: 50%;
    font-weight: bold;
  }
`;

const NutritionSection = styled.div``;

const NutritionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 12px;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #f8f8f8;
`;

const RelatedRecipes = styled.div`
  margin-top: 60px;
`;

const RelatedTitle = styled.h2`
  color: #333;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #4CAF50, #FF9800);
    margin-top: 15px;
  }
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
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

const RecipeCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const RecipeCardContent = styled.div`
  padding: 20px;
`;

const RecipeCardTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #333;
`;

const ViewRecipeButton = styled(Link)`
  display: block;
  background-color: #4CAF50;
  color: white;
  text-align: center;
  text-decoration: none;
  padding: 10px 0;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-3px);
  }
`;

const AddToShoppingListButton = styled.button`
  background-color: #FF9800;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #F57C00;
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 1.2rem;
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

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    // Simüle API çağrısı
    setLoading(true);
    
    setTimeout(() => {
      // Örnek tarif verileri
      const exampleRecipes = [
        {
          id: 1,
          title: 'Ev Yapımı Lazanya',
          image: 'https://cdn.pixabay.com/photo/2017/02/15/10/39/salad-2068220_1280.jpg',
          difficulty: 'medium',
          time: '45 dk',
          servings: '4-6 kişilik',
          description: 'Lezzetli ve doyurucu ev yapımı lazanya. İtalyan mutfağının bu klasik lezzeti herkesi memnun edecek.',
          price: '₺120',
          categories: [
            { id: 'ana-yemekler', name: 'Ana Yemek' },
            { id: 'dunya-mutfagi', name: 'Dünya Mutfağı' }
          ],
          author: 'Ayşe Yılmaz',
          date: '2023-03-15',
          ingredients: [
            '12 yaprak lazanya',
            '500g kıyma',
            '2 adet soğan (ince doğranmış)',
            '3 diş sarımsak (ezilmiş)',
            '2 adet domates (püre haline getirilmiş)',
            '2 yemek kaşığı domates salçası',
            '1 tatlı kaşığı kekik',
            '1 tatlı kaşığı fesleğen',
            'Tuz ve karabiber',
            '500g riccotta peyniri',
            '200g rendelenmiş mozzarella peyniri',
            '100g rendelenmiş parmesan peyniri',
            '2 adet yumurta',
            '2 yemek kaşığı zeytinyağı'
          ],
          instructions: [
            'Derin bir tavada zeytinyağını ısıtın. Soğan ve sarımsağı ekleyip yumuşayana kadar kavurun.',
            'Kıymayı ekleyin ve rengi değişene kadar pişirin.',
            'Domates püresi, domates salçası ve baharatları ekleyin. Yaklaşık 15-20 dakika kısık ateşte pişirin.',
            'Başka bir kapta ricotta peyniri, yumurta ve baharatları karıştırın.',
            'Fırın kabının tabanına biraz et sosu yayın. Üzerine lazanya yapraklarını dizin.',
            'Sırayla et sosu, peynir karışımı ve lazanya yapraklarını dizmeye devam edin.',
            'En üste kalan et sosunu yayın ve rendelenmiş mozzarella ile parmesan peynirini serpin.',
            'Önceden ısıtılmış 180°C fırında, üzeri kızarana kadar yaklaşık 30-35 dakika pişirin.',
            'Fırından çıkarıp 10 dakika dinlendirdikten sonra dilimleyip servis yapın.'
          ],
          nutrition: [
            { name: 'Kalori', value: '420 kcal' },
            { name: 'Protein', value: '28g' },
            { name: 'Karbonhidrat', value: '30g' },
            { name: 'Yağ', value: '22g' },
            { name: 'Lif', value: '3g' },
            { name: 'Sodyum', value: '950mg' }
          ]
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
          categories: [
            { id: 'ana-yemekler', name: 'Ana Yemek' },
            { id: 'turk-mutfagi', name: 'Türk Mutfağı' }
          ],
          author: 'Mehmet Demir',
          date: '2023-03-10',
          ingredients: [
            '500g dana kıyma',
            '1 adet orta boy soğan (rendelenmiş)',
            '2 diş sarımsak (ezilmiş)',
            '1/2 demet maydanoz (ince kıyılmış)',
            '1 adet yumurta',
            '4 yemek kaşığı galeta unu',
            '1 tatlı kaşığı kimyon',
            '1 tatlı kaşığı pul biber',
            'Tuz ve karabiber',
            '6 adet orta boy patates',
            '3 yemek kaşığı zeytinyağı',
            '1 tatlı kaşığı kekik'
          ],
          instructions: [
            'Kıyma, rendelenmiş soğan, sarımsak, maydanoz, yumurta, galeta unu ve baharatları derin bir kapta iyice karıştırın.',
            'Karışımdan ceviz büyüklüğünde parçalar alıp elinizle yuvarlayarak köfteleri hazırlayın.',
            'Köfteleri ayrı bir tabağa alın ve buzdolabında 15 dakika dinlendirin.',
            'Bu sırada patatesleri soyun, yıkayın ve dört eşit parçaya bölün.',
            'Tencereye su koyup kaynatın, patatesleri 10 dakika haşlayın. Tam pişirmeden çıkarın.',
            'Geniş bir fırın tepsisine zeytinyağı gezdirin, haşlanmış patatesleri dizin.',
            'Patatesler üzerine tuz, karabiber ve kekik serpin.',
            'Köfteleri patateslerin arasına yerleştirin.',
            'Önceden ısıtılmış 200°C fırında, patatesler ve köfteler kızarana kadar 20-25 dakika pişirin.',
            'Sıcak servis yapın.'
          ],
          nutrition: [
            { name: 'Kalori', value: '385 kcal' },
            { name: 'Protein', value: '22g' },
            { name: 'Karbonhidrat', value: '35g' },
            { name: 'Yağ', value: '18g' },
            { name: 'Lif', value: '4g' },
            { name: 'Sodyum', value: '780mg' }
          ]
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
          categories: [
            { id: 'ana-yemekler', name: 'Ana Yemek' },
            { id: 'vejetaryen', name: 'Vejetaryen' }
          ],
          author: 'Zeynep Kaya',
          date: '2023-03-05',
          ingredients: [
            '200g kelebek makarna',
            '1 adet kabak (küp doğranmış)',
            '1 adet kırmızı biber (küp doğranmış)',
            '1 adet havuç (rendelenmiş)',
            '1 adet soğan (ince doğranmış)',
            '2 diş sarımsak (ezilmiş)',
            '3 yemek kaşığı zeytinyağı',
            '1 çay kaşığı kekik',
            '1 çay kaşığı kırmızı pul biber',
            'Tuz ve karabiber',
            '2 yemek kaşığı rendelenmiş parmesan peyniri',
            'Yarım demet taze fesleğen (yaprakları)'
          ],
          instructions: [
            'Makarnayı ambalajındaki talimatlara göre dente kıvamına kadar haşlayın.',
            'Geniş bir tavada zeytinyağını ısıtın. Soğan ve sarımsağı ekleyip yumuşayana kadar kavurun.',
            'Havuç, biber ve kabağı ekleyin. Sebzeler yumuşayana kadar orta ateşte 5-6 dakika pişirin.',
            'Haşlanmış makarnayı süzün ve bir bardak haşlama suyunu ayırın.',
            'Makarnayı sebzeli karışıma ekleyin. Baharatları ve ayırdığınız haşlama suyunun yarısını da ekleyip karıştırın.',
            'Makarna susuz kalırsa kalan haşlama suyunu da ekleyin.',
            'Ocaktan almadan önce fesleğen yapraklarını ekleyin ve bir kez karıştırın.',
            'Servis tabağına alın, üzerine rendelenmiş parmesan peyniri serpin ve sıcak olarak servis yapın.'
          ],
          nutrition: [
            { name: 'Kalori', value: '350 kcal' },
            { name: 'Protein', value: '10g' },
            { name: 'Karbonhidrat', value: '45g' },
            { name: 'Yağ', value: '14g' },
            { name: 'Lif', value: '5g' },
            { name: 'Sodyum', value: '480mg' }
          ]
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
          categories: [
            { id: 'ana-yemekler', name: 'Ana Yemek' },
            { id: 'turk-mutfagi', name: 'Türk Mutfağı' }
          ],
          author: 'Ali Şahin',
          date: '2023-03-01',
          ingredients: [
            '2 kg kuzu budu',
            '5 diş sarımsak (ezilmiş)',
            '2 adet soğan (dilimlenimiş)',
            '3 yemek kaşığı domates salçası',
            '2 yemek kaşığı biber salçası',
            '2 yemek kaşığı zeytinyağı',
            '1 tatlı kaşığı kimyon',
            '1 tatlı kaşığı karabiber',
            '1 tatlı kaşığı pul biber',
            '1 yemek kaşığı kekik',
            '1 adet defne yaprağı',
            'Tuz',
            '2 su bardağı et suyu'
          ],
          instructions: [
            'Eti oda sıcaklığında 30 dakika bekletin.',
            'Geniş bir kasede sarımsak, soğan, salçalar, zeytinyağı ve baharatları karıştırarak marine sosunu hazırlayın.',
            'Eti marine sosuna bulayın, her yerine iyice yedirin ve buzdolabında en az 4 saat, tercihen bir gece bekletin.',
            'Önceden ısıtılmış 160°C fırına vermeden önce eti oda sıcaklığına getirmek için 30 dakika bekletin.',
            'Derin bir fırın kabına soğanları yerleştirin, üzerine marine edilmiş eti koyun.',
            'Et suyunu kabın kenarından dökün, kabı folyo ile sıkıca kapatın.',
            'Fırında yaklaşık 2,5 saat pişirin. Arada kontrol edip gerekirse üzerine et suyu ekleyin.',
            'Son 30 dakikada folyoyu çıkarıp etin üzerinin kızarmasını sağlayın.',
            'Fırından çıkardıktan sonra 15 dakika dinlendirin.',
            'Dilimleyip yanında pilav veya yoğurtla servis yapın.'
          ],
          nutrition: [
            { name: 'Kalori', value: '420 kcal' },
            { name: 'Protein', value: '45g' },
            { name: 'Karbonhidrat', value: '6g' },
            { name: 'Yağ', value: '23g' },
            { name: 'Lif', value: '1g' },
            { name: 'Sodyum', value: '580mg' }
          ]
        },
        {
          id: 5,
          title: 'Çikolatalı Brownie',
          image: 'https://cdn.pixabay.com/photo/2019/09/25/04/12/brownies-4502275_1280.jpg',
          difficulty: 'medium',
          time: '35 dk',
          servings: '8 dilim',
          description: 'Dışı çıtır içi yumuşacık, bol çikolatalı brownie. Tatlı krizlerinin kurtarıcısı.',
          price: '₺70',
          categories: [
            { id: 'tatlilar', name: 'Tatlı' },
            { id: 'dunya-mutfagi', name: 'Dünya Mutfağı' }
          ],
          author: 'Selin Yıldız',
          date: '2023-02-28',
          ingredients: [
            '200g bitter çikolata',
            '150g tereyağı',
            '3 adet yumurta',
            '200g toz şeker',
            '1 paket vanilya',
            'Bir tutam tuz',
            '110g un',
            '30g kakao',
            '100g ceviz (isteğe bağlı)'
          ],
          instructions: [
            'Fırını 180 derece ısıtmaya başlayın ve 20x20 cm kare bir fırın kabını yağlayın.',
            'Çikolatayı küçük parçalara bölün ve tereyağı ile beraber benmari usulü eritin.',
            'Eriyen çikolata karışımının ılımasını bekleyin.',
            'Başka bir kapta yumurta ve şekeri krema kıvamına gelene kadar çırpın.',
            'Vanilya ve tuzu ekleyip karıştırın.',
            'Çikolatalı karışımı yavaşça ekleyin ve karıştırın.',
            'Unu ve kakaoyu eleyin ve spatula yardımıyla karışıma yavaşça katlayın.',
            'İsterseniz cevizleri ekleyin ve karıştırın.',
            'Karışımı hazırladığınız fırın kabına dökün ve üstünü düzleştirin.',
            'Önceden ısıtılmış fırında 25-30 dakika pişirin. Kürdan testi yaptığınızda tam pişmediğini göstermelidir, brownie nemli kalmalı.',
            'Fırından çıkarıp oda sıcaklığında tamamen soğutun, sonra dilimleyip servis yapın.'
          ],
          nutrition: [
            { name: 'Kalori', value: '380 kcal' },
            { name: 'Protein', value: '5g' },
            { name: 'Karbonhidrat', value: '38g' },
            { name: 'Yağ', value: '24g' },
            { name: 'Lif', value: '3g' },
            { name: 'Sodyum', value: '180mg' }
          ]
        }
      ];
      
      const selectedRecipe = exampleRecipes.find(r => r.id === parseInt(recipeId));
      
      if (selectedRecipe) {
        setRecipe(selectedRecipe);
        
        // İlgili tarifleri seç (aynı kategorilerdeki tariflerden)
        const related = exampleRecipes
          .filter(r => 
            r.id !== parseInt(recipeId) && 
            r.categories.some(c => 
              selectedRecipe.categories.some(sc => sc.id === c.id)
            )
          )
          .slice(0, 3);
        
        setRelatedRecipes(related);
      }
      
      setLoading(false);
    }, 500);
  }, [recipeId]);
  
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
  
  // Malzemeleri alışveriş listesine ekle
  const addIngredientsToShoppingList = () => {
    if (!recipe || !recipe.ingredients) return;
    
    // LocalStorage'dan mevcut alışveriş listesini çek
    const existingList = localStorage.getItem('shoppingList');
    let shoppingList = existingList ? JSON.parse(existingList) : [];
    
    // Kategorilere malzemeleri map et
    const categorizedIngredients = recipe.ingredients.map(ingredient => {
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
  
  if (loading) {
    return <PageContainer>Yükleniyor...</PageContainer>;
  }
  
  if (!recipe) {
    return (
      <PageContainer>
        <h2>Tarif Bulunamadı</h2>
        <p>Aradığınız tarif mevcut değil veya kaldırılmış olabilir.</p>
        <Link to="/recipes">Tariflere Dön</Link>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <RecipeHeader>
        <RecipeImageContainer>
          <RecipeImage src={recipe.image} alt={recipe.title} />
        </RecipeImageContainer>
        
        <RecipeInfo>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <RecipeDifficulty className={getDifficultyClass(recipe.difficulty)}>
            {getDifficultyText(recipe.difficulty)}
          </RecipeDifficulty>
          <RecipeDescription>{recipe.description}</RecipeDescription>
          
          <RecipeMeta>
            <MetaItem>⏱️ Hazırlama: {recipe.time}</MetaItem>
            <MetaItem>👥 Porsiyon: {recipe.servings}</MetaItem>
          </RecipeMeta>
          
          <RecipePrice>Tahmini Maliyet: {recipe.price}</RecipePrice>
          
          <RecipeAuthor>Tarif: {recipe.author} | {new Date(recipe.date).toLocaleDateString()}</RecipeAuthor>
          
          <div>
            {recipe.categories.map(category => (
              <CategoryTag key={category.id} to={`/category/${category.id}`}>
                {category.name}
              </CategoryTag>
            ))}
          </div>
        </RecipeInfo>
      </RecipeHeader>
      
      <RecipeTabs>
        <TabsHeader>
          <TabButton 
            active={activeTab === 'ingredients'} 
            onClick={() => setActiveTab('ingredients')}
          >
            Malzemeler
          </TabButton>
          <TabButton 
            active={activeTab === 'instructions'} 
            onClick={() => setActiveTab('instructions')}
          >
            Yapılışı
          </TabButton>
          <TabButton 
            active={activeTab === 'nutrition'} 
            onClick={() => setActiveTab('nutrition')}
          >
            Besin Değerleri
          </TabButton>
        </TabsHeader>
        
        <TabContent active={activeTab === 'ingredients'}>
          <IngredientsSection>
            <SectionTitle>Malzeme Listesi</SectionTitle>
            <AddToShoppingListButton onClick={addIngredientsToShoppingList}>
              🛒 Alışveriş Listesine Ekle
            </AddToShoppingListButton>
            <IngredientsList>
              {recipe.ingredients.map((ingredient, index) => (
                <IngredientItem key={index}>{ingredient}</IngredientItem>
              ))}
            </IngredientsList>
          </IngredientsSection>
        </TabContent>
        
        <TabContent active={activeTab === 'instructions'}>
          <InstructionsSection>
            <SectionTitle>Yapılış Adımları</SectionTitle>
            <StepsList>
              {recipe.instructions.map((step, index) => (
                <StepItem key={index}>{step}</StepItem>
              ))}
            </StepsList>
          </InstructionsSection>
        </TabContent>
        
        <TabContent active={activeTab === 'nutrition'}>
          <NutritionSection>
            <SectionTitle>Besin Değerleri</SectionTitle>
            <NutritionTable>
              <thead>
                <TableRow>
                  <TableHeader>Besin Değeri</TableHeader>
                  <TableHeader>Miktar (porsiyon başına)</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {recipe.nutrition.map((nutrient, index) => (
                  <TableRow key={index}>
                    <TableCell>{nutrient.name}</TableCell>
                    <TableCell>{nutrient.value}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </NutritionTable>
          </NutritionSection>
        </TabContent>
      </RecipeTabs>
      
      {relatedRecipes.length > 0 && (
        <RelatedRecipes>
          <RelatedTitle>Benzer Tarifler</RelatedTitle>
          <RecipesGrid>
            {relatedRecipes.map(relatedRecipe => (
              <RecipeCard key={relatedRecipe.id}>
                <RecipeCardImage src={relatedRecipe.image} alt={relatedRecipe.title} />
                <RecipeCardContent>
                  <RecipeCardTitle>{relatedRecipe.title}</RecipeCardTitle>
                  <ViewRecipeButton to={`/recipes/${relatedRecipe.id}`}>
                    Tarifi Görüntüle
                  </ViewRecipeButton>
                </RecipeCardContent>
              </RecipeCard>
            ))}
          </RecipesGrid>
        </RelatedRecipes>
      )}
      
      <Notification show={showNotification}>
        Malzemeler alışveriş listesine eklendi! ✓
      </Notification>
    </PageContainer>
  );
};

export default RecipeDetailPage; 
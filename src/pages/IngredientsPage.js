import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaShoppingBag, FaMoneyBillWave, FaCalendarAlt, FaStore, FaTag, FaShoppingCart, FaSort, FaFilter } from 'react-icons/fa';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  color: #4CAF50;
  margin-bottom: 15px;
  font-size: 2.4rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    display: block;
    width: 100px;
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

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const AddIngredientForm = styled.form`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 20px;
  height: fit-content;
`;

const FormTitle = styled.h2`
  color: #333;
  margin-bottom: 25px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const IngredientsList = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const ListTitle = styled.h2`
  color: #333;
  margin-bottom: 25px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IngredientGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 25px;
`;

const IngredientCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-5px);
  }
`;

const IngredientImage = styled.div`
  height: 160px;
  background-image: url(${props => props.image || props.categoryImage});
  background-size: cover;
  background-position: center;
  position: relative;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
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

const IngredientContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const IngredientHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 10px;
`;

const IngredientName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.2rem;
`;

const IngredientCategory = styled.span`
  background-color: #4CAF50;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
`;

const IngredientDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #666;
  flex: 1;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
`;

const IngredientPrice = styled.div`
  font-weight: 600;
  color: #FF9800;
  margin-top: 15px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IngredientActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &.edit {
    background-color: #2196F3;
    color: white;
    
    &:hover {
      background-color: #0b7dda;
      transform: translateY(-2px);
    }
  }
  
  &.delete {
    background-color: #f44336;
    color: white;
    
    &:hover {
      background-color: #d32f2f;
      transform: translateY(-2px);
    }
  }
`;

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 25px;
  background-color: #4CAF50;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  opacity: ${props => props.show ? '1' : '0'};
  transform: translateY(${props => props.show ? '0' : '20px'});
  transition: all 0.3s ease;
`;

const SearchAndFilters = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchBar = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-right: 45px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    color: #4CAF50;
  }
`;

const FilterContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 25px;
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SortContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#4CAF50' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#4CAF50' : '#e0e0e0'};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#e9ecef'};
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #777;
  
  svg {
    font-size: 3rem;
    color: #ddd;
    margin-bottom: 20px;
  }
  
  h3 {
    margin-bottom: 15px;
    color: #555;
    font-size: 1.4rem;
  }
  
  p {
    margin-bottom: 25px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ButtonSuccess = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }
`;

const FilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterTab = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#4CAF50' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#666'};
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? '#43a047' : '#e0e0e0'};
  }
`;

const SortDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    color: #666;
  }
`;

const getCategoryImage = (category) => {
  switch (category) {
    case 'Meyve & Sebze':
      return 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg';
    case 'Et & Tavuk':
      return 'https://cdn.pixabay.com/photo/2016/03/05/19/02/abstract-1238247_1280.jpg';
    case 'Süt & Süt Ürünleri':
      return 'https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_1280.jpg';
    case 'Baharat':
      return 'https://cdn.pixabay.com/photo/2015/03/26/09/39/spices-690044_1280.jpg';
    case 'Bakliyat':
      return 'https://cdn.pixabay.com/photo/2016/02/17/19/14/legumes-1205657_1280.jpg';
    case 'Unlu Mamüller':
      return 'https://cdn.pixabay.com/photo/2016/06/17/19/10/wheat-1463674_1280.jpg';
    case 'Yağ & Sos':
      return 'https://cdn.pixabay.com/photo/2015/10/02/15/59/olive-oil-968657_1280.jpg';
    case 'Atıştırmalık':
      return 'https://cdn.pixabay.com/photo/2021/02/08/12/40/platter-5994701_1280.jpg';
    case 'İçecek':
      return 'https://cdn.pixabay.com/photo/2016/10/22/20/34/smoothie-1761548_1280.jpg';
    default:
      return 'https://cdn.pixabay.com/photo/2017/03/13/13/39/pancakes-2139844_1280.jpg';
  }
};

const getMarketLogo = (market) => {
  switch (market) {
    case 'A101':
      return 'https://cdn.pixabay.com/photo/2017/01/13/01/22/market-1976087_1280.jpg';
    case 'BİM':
      return 'https://cdn.pixabay.com/photo/2016/12/22/14/38/market-1925659_1280.jpg';
    case 'Migros':
      return 'https://cdn.pixabay.com/photo/2018/05/07/23/01/vegetables-3381655_1280.jpg';
    case 'Carrefour':
      return 'https://cdn.pixabay.com/photo/2015/09/21/14/24/supermarket-949913_1280.jpg';
    case 'ŞOK':
      return 'https://cdn.pixabay.com/photo/2015/12/07/10/44/shopping-1080838_1280.jpg';
    case 'Macro Center':
      return 'https://cdn.pixabay.com/photo/2012/02/28/00/55/market-18802_1280.jpg';
    default:
      return 'https://cdn.pixabay.com/photo/2016/01/27/22/10/shopping-1165437_1280.jpg';
  }
};

const IngredientsPage = () => {
  // Örnek kategori verileri
  const categories = [
    'Meyve & Sebze',
    'Et & Tavuk',
    'Süt & Süt Ürünleri',
    'Bakliyat',
    'Yağ & Sos',
    'Baharat',
    'Unlu Mamüller',
    'Diğer'
  ];
  
  // Örnek market verileri
  const markets = [
    'A101',
    'BİM',
    'Migros',
    'Carrefour',
    'ŞOK',
    'Macro Center',
    'Diğer'
  ];
  
  // Daha fazla örnek malzeme ekleyelim
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      name: 'Domates',
      category: 'Meyve & Sebze',
      price: 12.99,
      unit: 'kg',
      market: 'A101',
      date: '2023-04-15',
      image: 'https://cdn.pixabay.com/photo/2011/03/16/16/01/tomatoes-5356_1280.jpg'
    },
    {
      id: 2,
      name: 'Tavuk Göğsü',
      category: 'Et & Tavuk',
      price: 89.90,
      unit: 'kg',
      market: 'Migros',
      date: '2023-04-14',
      image: 'https://cdn.pixabay.com/photo/2016/07/31/17/51/chicken-1559548_1280.jpg'
    },
    {
      id: 3,
      name: 'Süt',
      category: 'Süt & Süt Ürünleri',
      price: 19.75,
      unit: 'lt',
      market: 'BİM',
      date: '2023-04-13',
      image: 'https://cdn.pixabay.com/photo/2018/01/18/20/36/milk-3091050_1280.jpg'
    },
    {
      id: 4,
      name: 'Zeytinyağı',
      category: 'Yağ & Sos',
      price: 249.90,
      unit: 'lt',
      market: 'Carrefour',
      date: '2023-04-10',
      image: 'https://cdn.pixabay.com/photo/2016/05/24/13/29/olive-oil-1412361_1280.jpg'
    },
    {
      id: 5,
      name: 'Kırmızı Mercimek',
      category: 'Bakliyat',
      price: 36.50,
      unit: 'kg',
      market: 'ŞOK',
      date: '2023-04-12',
      image: 'https://cdn.pixabay.com/photo/2020/06/10/15/29/lentils-5283095_1280.jpg'
    },
    {
      id: 6,
      name: 'Un',
      category: 'Unlu Mamüller',
      price: 42.75,
      unit: 'kg',
      market: 'A101',
      date: '2023-04-11',
      image: 'https://cdn.pixabay.com/photo/2022/01/17/19/22/flour-6945744_1280.jpg'
    },
    {
      id: 7,
      name: 'Karabiber',
      category: 'Baharat',
      price: 15.90,
      unit: 'adet',
      market: 'Migros',
      date: '2023-04-09',
      image: 'https://cdn.pixabay.com/photo/2020/08/13/20/03/pepper-5486470_1280.jpg'
    },
    {
      id: 8,
      name: 'Pirinç',
      category: 'Bakliyat',
      price: 45.50,
      unit: 'kg',
      market: 'BİM',
      date: '2023-04-08',
      image: 'https://cdn.pixabay.com/photo/2014/10/22/16/38/ingredients-498199_1280.jpg'
    }
  ]);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: 'kg',
    market: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  
  // Input değişikliklerini izleme
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Form gönderme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId !== null) {
      // Güncelleme modu
      setIngredients(ingredients.map(ing => 
        ing.id === editingId ? { ...formData, id: editingId } : ing
      ));
      setEditingId(null);
    } else {
      // Yeni malzeme ekleme modu
      setIngredients([
        ...ingredients,
        {
          ...formData,
          id: Date.now()
        }
      ]);
    }
    
    // Form temizleme
    setFormData({
      name: '',
      category: '',
      price: '',
      unit: 'kg',
      market: '',
      date: new Date().toISOString().split('T')[0]
    });
  };
  
  // Malzeme düzenleme
  const handleEdit = (id) => {
    const ingredientToEdit = ingredients.find(ing => ing.id === id);
    setFormData(ingredientToEdit);
    setEditingId(id);
  };
  
  // Malzeme silme
  const handleDelete = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };
  
  // Malzemeyi alışveriş listesine ekle
  const addToShoppingList = (ingredient) => {
    // LocalStorage'dan mevcut listeyi al
    const existingList = localStorage.getItem('shoppingList');
    let shoppingList = existingList ? JSON.parse(existingList) : [];
    
    // Yeni malzeme objesi
    const newItem = {
      id: Date.now() + Math.random(),
      name: ingredient.name,
      quantity: '1',
      unit: ingredient.unit,
      category: ingredient.category,
      checked: false
    };
    
    // Aynı malzeme zaten listede var mı kontrol et
    const existingItemIndex = shoppingList.findIndex(item => 
      item.name.toLowerCase() === newItem.name.toLowerCase() && 
      item.unit === newItem.unit
    );
    
    // Eğer varsa miktarını arttır, yoksa yeni ekle
    if (existingItemIndex >= 0) {
      const existingItem = shoppingList[existingItemIndex];
      const newQuantity = parseFloat(existingItem.quantity) + 1;
      shoppingList[existingItemIndex] = { 
        ...existingItem, 
        quantity: newQuantity.toString() 
      };
      setNotificationText(`${ingredient.name} miktarı güncellendi`);
    } else {
      shoppingList.push(newItem);
      setNotificationText(`${ingredient.name} alışveriş listesine eklendi`);
    }
    
    // LocalStorage'a kaydet
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    
    // Bildirim göster
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  // Sıralama işlemi
  const sortIngredients = (ingredients) => {
    return [...ingredients].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'date':
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });
  };
  
  // Kategori filtreleme
  const filteredIngredients = activeFilter === 'all' 
    ? ingredients 
    : ingredients.filter(ing => ing.category === activeFilter);
  
  // Arama sonucuna göre filtreleme
  const searchedIngredients = search
    ? filteredIngredients.filter(ing => 
        ing.name.toLowerCase().includes(search.toLowerCase()) ||
        ing.market.toLowerCase().includes(search.toLowerCase())
      )
    : filteredIngredients;
  
  // Sıralanmış malzemeler
  const sortedIngredients = sortIngredients(searchedIngredients);
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Malzemeler</PageTitle>
        <PageDescription>
          Tüm malzemeleri yönetin, fiyatları takip edin ve alışveriş listenize ekleyin.
          En güncel fiyatları kaydederek bütçenizi kontrol altında tutun.
        </PageDescription>
      </PageHeader>
      
      <SearchAndFilters>
        <SearchBar>
          <SearchInput 
            type="text" 
            placeholder="Malzeme ara..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton>
            <FaSearch />
          </SearchButton>
        </SearchBar>
        
        <FilterTabs>
          <FilterTab 
            active={activeFilter === 'all'} 
            onClick={() => setActiveFilter('all')}
          >
            Tümü
          </FilterTab>
          {categories.map((category, index) => (
            <FilterTab 
              key={index}
              active={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </FilterTab>
          ))}
        </FilterTabs>
        
        <SortDropdown>
          <FaSort />
          <FormSelect 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">İsme Göre</option>
            <option value="price">Fiyata Göre</option>
            <option value="date">Tarihe Göre</option>
          </FormSelect>
        </SortDropdown>
      </SearchAndFilters>
      
      <ContentWrapper>
        <AddIngredientForm onSubmit={handleSubmit}>
          <FormTitle>
            {editingId !== null ? (
              <>
                <FaEdit /> Malzeme Düzenle
              </>
            ) : (
              <>
                <FaPlus /> Yeni Malzeme Ekle
              </>
            )}
          </FormTitle>
          
          <FormGroup>
            <FormLabel htmlFor="name">
              <FaTag /> Malzeme Adı
            </FormLabel>
            <FormInput 
              type="text" 
              id="name"
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Örn: Domates, Ekmek, Süt..."
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="category"><FaShoppingBag /> Kategori</FormLabel>
            <FormSelect 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleInputChange}
              required
            >
              <option value="">Kategori Seçin</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="price"><FaMoneyBillWave /> Fiyat</FormLabel>
            <FormInput 
              type="number" 
              id="price" 
              name="price" 
              value={formData.price} 
              onChange={handleInputChange}
              step="0.01"
              min="0" 
              placeholder="0.00" 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="unit">Birim</FormLabel>
            <FormSelect 
              id="unit" 
              name="unit" 
              value={formData.unit} 
              onChange={handleInputChange}
              required
            >
              <option value="kg">Kilogram (kg)</option>
              <option value="gr">Gram (gr)</option>
              <option value="lt">Litre (lt)</option>
              <option value="ml">Mililitre (ml)</option>
              <option value="adet">Adet</option>
              <option value="paket">Paket</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="market"><FaStore /> Market</FormLabel>
            <FormSelect 
              id="market" 
              name="market" 
              value={formData.market} 
              onChange={handleInputChange}
              required
            >
              <option value="">Market Seçin</option>
              {markets.map((market, index) => (
                <option key={index} value={market}>{market}</option>
              ))}
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="date"><FaCalendarAlt /> Fiyat Tarihi</FormLabel>
            <FormInput 
              type="date" 
              id="date" 
              name="date" 
              value={formData.date} 
              onChange={handleInputChange}
              required 
            />
          </FormGroup>
          
          <SubmitButton type="submit">
            {editingId ? <><FaEdit /> Güncelle</> : <><FaPlus /> Ekle</>}
          </SubmitButton>
        </AddIngredientForm>
        
        <IngredientsList>
          <ListTitle><FaShoppingBag /> Malzemeler ({sortedIngredients.length})</ListTitle>
          
          <FilterContainer>
            <FiltersHeader>
              <FilterTitle><FaFilter /> Filtrele & Sırala</FilterTitle>
              <SortContainer>
                <SortSelect 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">İsme Göre</option>
                  <option value="price-low">Fiyat (Düşük → Yüksek)</option>
                  <option value="price-high">Fiyat (Yüksek → Düşük)</option>
                  <option value="date">Tarihe Göre (Yeni)</option>
                </SortSelect>
              </SortContainer>
            </FiltersHeader>
            
            <Filters>
              <FilterButton 
                active={activeFilter === 'all'} 
                onClick={() => setActiveFilter('all')}
              >
                Tümü
              </FilterButton>
              {categories.map((category, index) => (
                <FilterButton 
                  key={index} 
                  active={activeFilter === category} 
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </FilterButton>
              ))}
            </Filters>
          </FilterContainer>
          
          {sortedIngredients.length > 0 ? (
            <IngredientGrid>
              {sortedIngredients.map((ingredient) => {
                return (
                  <IngredientCard key={ingredient.id}>
                    <IngredientImage 
                      image={ingredient.image} 
                      categoryImage={getCategoryImage(ingredient.category)} 
                    />
                    <IngredientContent>
                      <IngredientHeader>
                        <IngredientName>{ingredient.name}</IngredientName>
                        <IngredientCategory>
                          <FaTag /> {ingredient.category}
                        </IngredientCategory>
                      </IngredientHeader>
                      
                      <IngredientDetails>
                        <DetailItem>
                          <FaStore style={{color: getMarketLogo(ingredient.market)}} /> 
                          <strong>{ingredient.market}</strong>
                        </DetailItem>
                        <DetailItem>
                          <FaCalendarAlt /> 
                          {ingredient.date}
                        </DetailItem>
                        <IngredientPrice>
                          <FaMoneyBillWave /> 
                          ₺{Number(ingredient.price).toFixed(2)} / {ingredient.unit}
                        </IngredientPrice>
                      </IngredientDetails>
                      
                      <IngredientActions>
                        <ActionButton 
                          className="edit"
                          onClick={() => handleEdit(ingredient.id)}
                        >
                          <FaEdit /> Düzenle
                        </ActionButton>
                        <ActionButton 
                          className="delete"
                          onClick={() => handleDelete(ingredient.id)}
                        >
                          <FaTrash /> Sil
                        </ActionButton>
                      </IngredientActions>
                      
                      <ButtonSuccess 
                        onClick={() => addToShoppingList(ingredient)}
                        style={{marginTop: '10px'}}
                      >
                        <FaShoppingCart /> Alışveriş Listesine Ekle
                      </ButtonSuccess>
                    </IngredientContent>
                  </IngredientCard>
                );
              })}
            </IngredientGrid>
          ) : (
            <EmptyState>
              <FaShoppingBag />
              <h3>Malzeme Bulunamadı</h3>
              <p>Arama kriterlerinize uygun malzeme bulunamadı veya hiç malzeme eklenmemiş.</p>
              <SubmitButton 
                onClick={() => {
                  setSearch('');
                  setActiveFilter('all');
                }}
              >
                <FaSearch /> Tüm Malzemeleri Göster
              </SubmitButton>
            </EmptyState>
          )}
        </IngredientsList>
      </ContentWrapper>
      
      <Notification show={showNotification}>
        <FaShoppingCart /> {notificationText}
      </Notification>
    </PageContainer>
  );
};

export default IngredientsPage; 
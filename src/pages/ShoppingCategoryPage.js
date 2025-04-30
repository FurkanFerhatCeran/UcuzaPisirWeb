import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { FaShoppingCart, FaPlus, FaMinus, FaSearch, FaHeart, FaStar, FaFilter, FaSortAmountDown, FaTag } from 'react-icons/fa';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const CategoryBreadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  
  &:hover {
    color: #4CAF50;
  }
`;

const CategoryTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 20px 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  
  span {
    color: #4CAF50;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SearchAndFilters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  display: flex;
  flex: 1;
  max-width: 500px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  padding-right: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const Filters = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 5px;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 10px;
    }
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background-color: ${props => props.active ? '#4CAF50' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#4CAF50' : '#ddd'};
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#f5f5f5'};
  }
`;

const SortButton = styled(FilterButton)`
  background-color: white;
  color: #333;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
`;

const Tab = styled.button`
  padding: 15px 20px;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#4CAF50' : 'transparent'};
  color: ${props => props.active ? '#4CAF50' : '#333'};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    color: #4CAF50;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const DiscountTag = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.8rem;
  z-index: 1;
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  
  svg {
    color: ${props => props.favorite ? '#f44336' : '#666'};
    font-size: 1.2rem;
  }
  
  &:hover svg {
    color: #f44336;
  }
`;

const ProductImage = styled.div`
  height: 180px;
  background-image: url(${props => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  padding: 15px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
  
  @media (max-width: 768px) {
    height: 140px;
  }
`;

const ProductContent = styled.div`
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 10px;
  color: #333;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProductCategory = styled.div`
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  margin-bottom: 10px;
  
  svg {
    color: #FFC107;
  }
`;

const PriceContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const OriginalPrice = styled.div`
  font-size: 0.8rem;
  color: #999;
  text-decoration: line-through;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #4CAF50;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const AddToCartContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.disabled ? '#f5f5f5' : 'white'};
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  color: ${props => props.disabled ? '#ccc' : '#333'};
  
  &:hover {
    background-color: ${props => props.disabled ? '#f5f5f5' : '#f1f1f1'};
  }
`;

const QuantityValue = styled.div`
  width: 40px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  font-weight: 500;
`;

const AddToCartButton = styled.button`
  flex: 1;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #45a049;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? '#4CAF50' : '#ddd'};
  border-radius: 5px;
  background-color: ${props => props.active ? '#4CAF50' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#f5f5f5'};
  }
`;

// Örnek ürün verileri
const productData = {
  "atistirmalik": [
    {
      id: 1,
      title: "Lay's Klasik Patates Cips",
      category: "Atıştırmalık",
      image: "https://cdn.pixabay.com/photo/2020/04/07/07/08/potato-chips-5011866_1280.jpg",
      rating: 4.8,
      price: 24.90,
      originalPrice: 29.90,
      discount: "%15",
      isFavorite: false
    },
    {
      id: 2,
      title: "Doritos Nacho Peynirli Cips",
      category: "Atıştırmalık",
      image: "https://cdn.pixabay.com/photo/2010/12/13/10/24/chips-2616_1280.jpg",
      rating: 4.6,
      price: 29.90,
      originalPrice: 34.90,
      discount: "%10",
      isFavorite: true
    },
    {
      id: 3,
      title: "Ülker Çikolatalı Gofret",
      category: "Atıştırmalık",
      image: "https://cdn.pixabay.com/photo/2014/01/15/07/06/cookies-245403_1280.jpg",
      rating: 4.3,
      price: 12.50,
      originalPrice: 15.00,
      discount: "%15",
      isFavorite: false
    },
    {
      id: 4,
      title: "Tadım Kavrulmuş Fındık",
      category: "Atıştırmalık",
      image: "https://cdn.pixabay.com/photo/2018/04/29/11/54/nuts-3359430_1280.jpg",
      rating: 4.9,
      price: 69.90,
      originalPrice: 79.90,
      discount: "%10",
      isFavorite: false
    },
    {
      id: 5,
      title: "Çerezza Karışık Kuruyemiş",
      category: "Atıştırmalık",
      image: "https://cdn.pixabay.com/photo/2017/05/13/01/38/mixed-nuts-2308506_1280.jpg",
      rating: 4.7,
      price: 89.90,
      originalPrice: 99.90,
      discount: "%10",
      isFavorite: true
    },
    {
      id: 6,
      title: "Eti Browni Kek",
      category: "Atıştırmalık",
      image: "https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg",
      rating: 4.4,
      price: 9.90,
      originalPrice: 12.90,
      discount: "%20",
      isFavorite: false
    }
  ],
  "icecekler": [
    {
      id: 7,
      title: "Coca-Cola 1 Litre",
      category: "İçecek",
      image: "https://cdn.pixabay.com/photo/2019/11/14/15/47/coke-4626458_1280.jpg",
      rating: 4.5,
      price: 17.90,
      originalPrice: 19.90,
      discount: "%10",
      isFavorite: true
    },
    {
      id: 8,
      title: "Fanta Portakal 1 Litre",
      category: "İçecek",
      image: "https://cdn.pixabay.com/photo/2018/10/02/21/39/orange-3719525_1280.jpg",
      rating: 4.3,
      price: 16.90,
      originalPrice: 18.90,
      discount: "%10",
      isFavorite: false
    },
    {
      id: 9,
      title: "Erikli Su 1.5 Litre",
      category: "İçecek",
      image: "https://cdn.pixabay.com/photo/2017/02/02/15/15/bottle-2032980_1280.jpg",
      rating: 4.2,
      price: 5.90,
      originalPrice: null,
      discount: null,
      isFavorite: false
    }
  ],
  "sutUrunleri": [
    {
      id: 10,
      title: "Pınar Süt 1 Litre",
      category: "Süt Ürünleri",
      image: "https://cdn.pixabay.com/photo/2020/04/14/09/53/milk-5041579_1280.jpg",
      rating: 4.6,
      price: 14.90,
      originalPrice: 16.90,
      discount: "%10",
      isFavorite: false
    },
    {
      id: 11,
      title: "Sütaş Kaşar Peyniri 350g",
      category: "Süt Ürünleri",
      image: "https://cdn.pixabay.com/photo/2011/12/14/12/11/cheese-11299_1280.jpg",
      rating: 4.7,
      price: 69.90,
      originalPrice: 79.90,
      discount: "%15",
      isFavorite: true
    }
  ]
};

// Kategori adlarını Türkçe görüntüleme için map
const categoryNameMap = {
  "atistirmalik": "Atıştırmalık",
  "icecekler": "İçecekler",
  "sutUrunleri": "Süt Ürünleri"
};

const ShoppingCategoryPage = () => {
  const { categoryId } = useParams();
  const [activeTab, setActiveTab] = useState('tuzlu');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSortFilter, setActiveSortFilter] = useState('popular');
  const [products, setProducts] = useState(productData[categoryId] || []);
  const [quantities, setQuantities] = useState({});
  
  // Ürün miktarını artırma
  const increaseQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };
  
  // Ürün miktarını azaltma
  const decreaseQuantity = (productId) => {
    if ((quantities[productId] || 0) > 0) {
      setQuantities(prev => ({
        ...prev,
        [productId]: prev[productId] - 1
      }));
    }
  };
  
  // Favorilere ekleme/çıkarma
  const toggleFavorite = (productId) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isFavorite: !product.isFavorite } 
          : product
      )
    );
  };
  
  // Sepete ekleme
  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    alert(`${product.title} ürününden ${quantity} adet sepete eklendi!`);
    // Burada sepete ekleme işlemi yapılacak
  };
  
  // Tab'a göre filtreleme
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => {
        if (activeTab === 'tuzlu' && product.title.toLowerCase().includes('cips')) return true;
        if (activeTab === 'tatli' && (product.title.toLowerCase().includes('çikolata') || product.title.toLowerCase().includes('kek'))) return true;
        if (activeTab === 'kuruyemis' && product.title.toLowerCase().includes('kuruyemiş')) return true;
        return false;
      });
  
  // Arama sonuçlarına göre filtreleme
  const searchedProducts = searchTerm 
    ? filteredProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    : filteredProducts;
  
  // Sıralama filtresine göre sıralama
  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (activeSortFilter === 'priceAsc') return a.price - b.price;
    if (activeSortFilter === 'priceDesc') return b.price - a.price;
    if (activeSortFilter === 'discount') return b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) - ((a.originalPrice - a.price) / a.originalPrice) : -1;
    // Default: popularity (rating)
    return b.rating - a.rating;
  });
  
  return (
    <PageContainer>
      <CategoryBreadcrumb>
        <BackButton to="/">
          ← Ana Sayfa
        </BackButton>
        {" / "}
        <span>Alışveriş</span>
        {" / "}
        <span>{categoryNameMap[categoryId] || "Kategori"}</span>
      </CategoryBreadcrumb>
      
      <CategoryTitle>
        <span>{categoryNameMap[categoryId] || "Kategori"}</span> Ürünleri
      </CategoryTitle>
      
      <SearchAndFilters>
        <SearchBar>
          <SearchInput 
            type="text" 
            placeholder="Ürün ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
        </SearchBar>
        
        <Filters>
          <FilterButton active={activeSortFilter === 'popular'} onClick={() => setActiveSortFilter('popular')}>
            <FaStar /> Popüler
          </FilterButton>
          <FilterButton active={activeSortFilter === 'priceAsc'} onClick={() => setActiveSortFilter('priceAsc')}>
            <FaSortAmountDown /> Fiyat (Artan)
          </FilterButton>
          <FilterButton active={activeSortFilter === 'priceDesc'} onClick={() => setActiveSortFilter('priceDesc')}>
            <FaSortAmountDown style={{ transform: 'rotate(180deg)' }} /> Fiyat (Azalan)
          </FilterButton>
          <FilterButton active={activeSortFilter === 'discount'} onClick={() => setActiveSortFilter('discount')}>
            <FaTag /> İndirim
          </FilterButton>
        </Filters>
      </SearchAndFilters>
      
      {categoryId === 'atistirmalik' && (
        <TabsContainer>
          <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
            Tümü
          </Tab>
          <Tab active={activeTab === 'tuzlu'} onClick={() => setActiveTab('tuzlu')}>
            Tuzlu Atıştırmalık
          </Tab>
          <Tab active={activeTab === 'tatli'} onClick={() => setActiveTab('tatli')}>
            Tatlı Atıştırmalık
          </Tab>
          <Tab active={activeTab === 'kuruyemis'} onClick={() => setActiveTab('kuruyemis')}>
            Kuruyemiş
          </Tab>
        </TabsContainer>
      )}
      
      <ProductsGrid>
        {sortedProducts.map(product => (
          <ProductCard key={product.id}>
            {product.discount && (
              <DiscountTag>{product.discount} İndirim</DiscountTag>
            )}
            <FavoriteButton 
              favorite={product.isFavorite}
              onClick={() => toggleFavorite(product.id)}
            >
              <FaHeart />
            </FavoriteButton>
            <ProductImage image={product.image} />
            <ProductContent>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductCategory>
                <FaTag /> {product.category}
              </ProductCategory>
              <Rating>
                <FaStar /> <span>{product.rating}</span>
              </Rating>
              <PriceContainer>
                {product.originalPrice && (
                  <OriginalPrice>₺{product.originalPrice.toFixed(2)}</OriginalPrice>
                )}
                <Price>₺{product.price.toFixed(2)}</Price>
              </PriceContainer>
              <AddToCartContainer>
                <QuantityControl>
                  <QuantityButton 
                    onClick={() => decreaseQuantity(product.id)}
                    disabled={(quantities[product.id] || 0) <= 0}
                  >
                    <FaMinus />
                  </QuantityButton>
                  <QuantityValue>{quantities[product.id] || 1}</QuantityValue>
                  <QuantityButton onClick={() => increaseQuantity(product.id)}>
                    <FaPlus />
                  </QuantityButton>
                </QuantityControl>
                <AddToCartButton onClick={() => addToCart(product)}>
                  <FaShoppingCart /> Sepete Ekle
                </AddToCartButton>
              </AddToCartContainer>
            </ProductContent>
          </ProductCard>
        ))}
      </ProductsGrid>
      
      {sortedProducts.length > 0 && (
        <Pagination>
          <PageButton active={true}>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>...</PageButton>
        </Pagination>
      )}
    </PageContainer>
  );
};

export default ShoppingCategoryPage; 
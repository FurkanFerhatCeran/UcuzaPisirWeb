import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrash, FaCheck, FaEdit, FaShoppingBasket, FaPrint, FaSave, FaTimesCircle, FaApple, FaCarrot, FaEgg, FaFish, FaBreadSlice, FaCookieBite, FaWineBottle, FaCoffee, FaCheese } from 'react-icons/fa';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const PageHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.4rem;
  color: #333;
  margin-bottom: 15px;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  
  @media (min-width: 992px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const ShoppingListContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 25px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #388E3C;
  }
  
  &:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
  }
`;

const ActionButton = styled.button`
  background-color: ${props => props.color || '#4CAF50'};
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
`;

const CategorySection = styled.div`
  margin-bottom: 20px;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.color ? `${props.color}15` : '#f5f5f5'};
  border-left: 4px solid ${props => props.color || '#4CAF50'};
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.color ? `${props.color}25` : '#f0f0f0'};
    transform: translateX(2px);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryIcon = styled.span`
  color: ${props => props.color || '#4CAF50'};
  font-size: 1.2rem;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  ${props => props.checked && `
    text-decoration: line-through;
    opacity: 0.7;
  `}
`;

const ItemCheckbox = styled.input`
  margin-right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: ${props => props.checked ? '400' : '500'};
  color: ${props => props.checked ? '#999' : '#333'};
`;

const ItemQuantity = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 8px;
`;

const TotalCounter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  margin-top: 20px;
  border-top: 1px dashed #ddd;
  color: #333;
  font-weight: 500;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 600px) {
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

const SidePanel = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 25px;
  height: fit-content;
`;

const EditItemForm = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  
  svg {
    font-size: 3rem;
    color: #ddd;
    margin-bottom: 15px;
  }
  
  h3 {
    font-size: 1.4rem;
    color: #666;
    margin-bottom: 10px;
  }
  
  p {
    color: #999;
    margin-bottom: 20px;
  }
`;

const ShoppingListPage = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [editUnit, setEditUnit] = useState('piece');
  const [editCategory, setEditCategory] = useState('other');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [checkedItems, setCheckedItems] = useState(0);
  
  // LocalStorage'dan alışveriş listesini yükle
  useEffect(() => {
    const savedList = localStorage.getItem('shoppingList');
    if (savedList) {
      const parsedList = JSON.parse(savedList);
      setShoppingList(parsedList);
      
      // Toplam ve işaretli öğe sayılarını hesapla
      setTotalItems(parsedList.length);
      setCheckedItems(parsedList.filter(item => item.checked).length);
      
      // Kategori bölümlerini varsayılan olarak genişlet
      const categories = {};
      parsedList.forEach(item => {
        categories[item.category] = true;
      });
      setExpandedCategories(categories);
    }
  }, []);
  
  // Alışveriş listesini LocalStorage'a kaydet
  useEffect(() => {
    if (shoppingList.length > 0) {
      localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
      setTotalItems(shoppingList.length);
      setCheckedItems(shoppingList.filter(item => item.checked).length);
    }
  }, [shoppingList]);
  
  // Yeni öğe ekle
  const addItem = () => {
    if (!newItem.trim()) return;
    
    // Basit kategori tespiti
    let category = 'other';
    const lowerItem = newItem.toLowerCase();
    
    if (lowerItem.includes('süt') || lowerItem.includes('peynir') || lowerItem.includes('yoğurt')) {
      category = 'dairy';
    } else if (lowerItem.includes('et') || lowerItem.includes('tavuk') || lowerItem.includes('balık')) {
      category = 'meat';
    } else if (lowerItem.includes('ekmek') || lowerItem.includes('un')) {
      category = 'bakery';
    } else if (lowerItem.includes('tuz') || lowerItem.includes('baharat')) {
      category = 'spices';
    } else if (lowerItem.includes('domates') || lowerItem.includes('elma') || lowerItem.includes('meyve') || 
              lowerItem.includes('patates') || lowerItem.includes('soğan')) {
      category = 'fruits';
    }
    
    const newItemObj = {
      id: Date.now(),
      name: newItem,
      quantity: '1',
      unit: 'piece',
      category,
      checked: false
    };
    
    setShoppingList([...shoppingList, newItemObj]);
    setNewItem('');
    
    // Yeni kategori eklendiğinde onu genişlet
    if (!expandedCategories[category]) {
      setExpandedCategories({...expandedCategories, [category]: true});
    }
  };
  
  // Öğeyi işaretle/işaretini kaldır
  const toggleItem = (id) => {
    setShoppingList(shoppingList.map(item => 
      item.id === id ? {...item, checked: !item.checked} : item
    ));
  };
  
  // Öğeyi düzenle
  const startEditItem = (item) => {
    setEditingItem(item.id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setEditUnit(item.unit);
    setEditCategory(item.category);
  };
  
  // Düzenlemeyi kaydet
  const saveEdit = () => {
    if (!editName.trim()) return;
    
    setShoppingList(shoppingList.map(item => 
      item.id === editingItem ? {
        ...item, 
        name: editName,
        quantity: editQuantity,
        unit: editUnit,
        category: editCategory
      } : item
    ));
    
    // Düzenleme modundan çık
    cancelEdit();
  };
  
  // Düzenlemeyi iptal et
  const cancelEdit = () => {
    setEditingItem(null);
    setEditName('');
    setEditQuantity('');
    setEditUnit('piece');
    setEditCategory('other');
  };
  
  // Öğeyi sil
  const deleteItem = (id) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };
  
  // Tüm işaretli öğeleri sil
  const deleteCheckedItems = () => {
    setShoppingList(shoppingList.filter(item => !item.checked));
  };
  
  // Tüm öğeleri işaretle/işaretini kaldır
  const toggleAllItems = (checked) => {
    setShoppingList(shoppingList.map(item => ({...item, checked})));
  };
  
  // Listeyi temizle
  const clearList = () => {
    if (window.confirm('Alışveriş listenizi tamamen temizlemek istediğinize emin misiniz?')) {
      setShoppingList([]);
      localStorage.removeItem('shoppingList');
    }
  };
  
  // Listeyi yazdır
  const printList = () => {
    window.print();
  };
  
  // Kategori görünürlüğünü değiştir
  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
  };
  
  // Kategorilere göre gruplandırılmış alışveriş listesi
  const getCategorizedList = () => {
    const categorized = {};
    
    shoppingList.forEach(item => {
      if (!categorized[item.category]) {
        categorized[item.category] = [];
      }
      categorized[item.category].push(item);
    });
    
    return categorized;
  };
  
  // Kategori adına göre ikon ve renk döndür
  const getCategoryInfo = (category) => {
    switch(category) {
      case 'dairy':
        return { icon: '🥛', name: 'Süt Ürünleri', color: '#42A5F5' };
      case 'meat':
        return { icon: '🥩', name: 'Et & Protein', color: '#EF5350' };
      case 'fruits':
        return { icon: '🍎', name: 'Meyve & Sebze', color: '#66BB6A' };
      case 'bakery':
        return { icon: '🍞', name: 'Unlu Mamüller', color: '#FFA726' };
      case 'spices':
        return { icon: '🧂', name: 'Baharatlar', color: '#AB47BC' };
      default:
        return { icon: '📦', name: 'Diğer', color: '#78909C' };
    }
  };
  
  // Birim çevirisi
  const translateUnit = (unit) => {
    const unitTranslations = {
      'piece': 'adet',
      'kg': 'kg',
      'g': 'g',
      'l': 'litre',
      'ml': 'ml',
      'packet': 'paket',
      'spoon': 'y.k.',
      'teaspoon': 'ç.k.',
      'cup': 'bardak'
    };
    
    return unitTranslations[unit] || unit;
  };
  
  const categorizedList = getCategorizedList();
  const hasItems = shoppingList.length > 0;
  
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'meyve & sebze':
        return <FaApple />;
      case 'et & tavuk':
        return <FaFish />;
      case 'süt & süt ürünleri':
        return <FaCheese />;
      case 'baharat':
        return <FaCoffee />;
      case 'bakliyat':
        return <FaCarrot />;
      case 'unlu mamüller':
        return <FaBreadSlice />;
      case 'yağ & sos':
        return <FaWineBottle />;
      case 'atıştırmalık':
        return <FaCookieBite />;
      default:
        return <FaShoppingBasket />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'meyve & sebze':
        return '#4CAF50';
      case 'et & tavuk':
        return '#F44336';
      case 'süt & süt ürünleri':
        return '#2196F3';
      case 'baharat':
        return '#FF9800';
      case 'bakliyat':
        return '#795548';
      case 'unlu mamüller':
        return '#FFC107';
      case 'yağ & sos':
        return '#9C27B0';
      case 'atıştırmalık':
        return '#E91E63';
      default:
        return '#607D8B';
    }
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Alışveriş Listem</PageTitle>
        <PageDescription>
          Tüm tarifleriniz için gerekli malzemeleri tek bir yerde toplayın ve kolayca alışverişinizi yapın.
        </PageDescription>
      </PageHeader>
      
      <ContentContainer>
        <ShoppingListContainer>
          <SectionTitle>
            <FaShoppingBasket /> Alışveriş Listesi
          </SectionTitle>
          
          <InputGroup>
            <Input 
              type="text" 
              placeholder="Yeni bir öğe ekleyin..." 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
            />
            <Button onClick={addItem} disabled={!newItem.trim()}>
              <FaPlus /> Ekle
            </Button>
          </InputGroup>
          
          {hasItems ? (
            <>
              {Object.keys(categorizedList).map(category => {
                const { icon, name, color } = getCategoryInfo(category);
                const items = categorizedList[category];
                
                return (
                  <CategorySection key={category}>
                    <CategoryHeader 
                      onClick={() => toggleCategory(category)}
                      color={getCategoryColor(category)}
                    >
                      <CategoryTitle>
                        <CategoryIcon color={getCategoryColor(category)}>
                          {getCategoryIcon(category)}
                        </CategoryIcon>
                        {name} ({items.length})
                      </CategoryTitle>
                      <span>{expandedCategories[category] ? '−' : '+'}</span>
                    </CategoryHeader>
                    
                    {expandedCategories[category] && (
                      <ItemList>
                        {items.map(item => (
                          <ListItem key={item.id} checked={item.checked}>
                            <ItemCheckbox 
                              type="checkbox" 
                              checked={item.checked}
                              onChange={() => toggleItem(item.id)}
                            />
                            <ItemDetails>
                              <ItemName checked={item.checked}>{item.name}</ItemName>
                              <ItemQuantity>
                                {item.quantity} {translateUnit(item.unit)}
                              </ItemQuantity>
                            </ItemDetails>
                            <ItemActions>
                              <ActionButton 
                                color="#2196F3"
                                onClick={() => startEditItem(item)}
                              >
                                <FaEdit />
                              </ActionButton>
                              <ActionButton 
                                color="#F44336"
                                onClick={() => deleteItem(item.id)}
                              >
                                <FaTrash />
                              </ActionButton>
                            </ItemActions>
                          </ListItem>
                        ))}
                      </ItemList>
                    )}
                  </CategorySection>
                );
              })}
              
              <TotalCounter>
                <span>Toplam Öğe: {totalItems}</span>
                <span>Tamamlanan: {checkedItems}/{totalItems}</span>
              </TotalCounter>
              
              <ActionsBar>
                <ButtonGroup>
                  <Button onClick={() => toggleAllItems(true)}>
                    <FaCheck /> Hepsini İşaretle
                  </Button>
                  <Button onClick={() => toggleAllItems(false)} color="#FF9800">
                    Hepsinin İşaretini Kaldır
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button onClick={deleteCheckedItems} color="#F44336">
                    <FaTrash /> İşaretlileri Sil
                  </Button>
                  <Button onClick={printList}>
                    <FaPrint /> Yazdır
                  </Button>
                </ButtonGroup>
              </ActionsBar>
            </>
          ) : (
            <EmptyState>
              <FaShoppingBasket />
              <h3>Alışveriş Listeniz Boş</h3>
              <p>Tariflerdeki "Alışveriş Listesine Ekle" butonunu kullanarak malzemeleri listeye ekleyebilirsiniz.</p>
              <Button onClick={() => setNewItem('Ekmek')}>
                Örnek Bir Öğe Ekle
              </Button>
            </EmptyState>
          )}
        </ShoppingListContainer>
        
        {editingItem && (
          <SidePanel>
            <SectionTitle>Öğeyi Düzenle</SectionTitle>
            <EditItemForm>
              <FormGroup>
                <Label>Malzeme Adı</Label>
                <Input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Miktar</Label>
                <Input
                  type="text"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Birim</Label>
                <Select
                  value={editUnit}
                  onChange={(e) => setEditUnit(e.target.value)}
                >
                  <option value="piece">Adet</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="l">Litre (l)</option>
                  <option value="ml">Mililitre (ml)</option>
                  <option value="packet">Paket</option>
                  <option value="spoon">Yemek Kaşığı</option>
                  <option value="teaspoon">Çay Kaşığı</option>
                  <option value="cup">Bardak</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Kategori</Label>
                <Select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  <option value="dairy">Süt Ürünleri</option>
                  <option value="meat">Et & Protein</option>
                  <option value="fruits">Meyve & Sebze</option>
                  <option value="bakery">Unlu Mamüller</option>
                  <option value="spices">Baharatlar</option>
                  <option value="other">Diğer</option>
                </Select>
              </FormGroup>
              
              <ButtonGroup>
                <Button onClick={saveEdit}>
                  <FaSave /> Kaydet
                </Button>
                <Button onClick={cancelEdit} color="#F44336">
                  <FaTimesCircle /> İptal
                </Button>
              </ButtonGroup>
            </EditItemForm>
          </SidePanel>
        )}
        
        {!editingItem && hasItems && (
          <SidePanel>
            <SectionTitle>Alışveriş İpuçları</SectionTitle>
            <ul>
              <li>Listeyi kategorilere göre gezerken daha hızlı alışveriş yapabilirsiniz.</li>
              <li>Aldığınız ürünleri işaretleyerek takibini kolaylaştırın.</li>
              <li>Yazdır butonuyla listenizi kağıda dökebilirsiniz.</li>
              <li>Listeyi temizlemek için tüm öğeleri işaretleyip "İşaretlileri Sil" butonunu kullanabilirsiniz.</li>
            </ul>
            
            <Button onClick={clearList} color="#F44336" style={{ marginTop: '20px', width: '100%' }}>
              <FaTrash /> Listeyi Temizle
            </Button>
          </SidePanel>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default ShoppingListPage; 
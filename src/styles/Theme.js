const theme = {
  colors: {
    primary: '#4CAF50',     // Yeşil - ekonomi ve tazelik hissi
    secondary: '#FF9800',   // Turuncu - yemek ve sıcaklık hissi
    accent: '#2196F3',      // Mavi - güven ve teknoloji hissi
    background: '#FFFFFF',  // Beyaz - temiz ve ferah
    text: '#333333',        // Koyu gri - okunabilirlik
    lightText: '#757575',   // Açık gri - ikincil metinler
    error: '#F44336',       // Kırmızı - hata mesajları
    success: '#4CAF50',     // Yeşil - başarı mesajları
    border: '#E0E0E0',      // Açık gri - kenarlıklar
  },
  fonts: {
    main: "'Roboto', sans-serif",
    heading: "'Montserrat', sans-serif",
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    largeDesktop: '1200px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
};

export default theme;
import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    siteName: 'Mafitihe Alle Hossana',
    tagline: "Hossana's local marketplace",
    searchPlaceholder: 'Search listings...',
    allCategories: 'All categories',
    recentListings: 'Recent listings',
    postAd: 'Post ad',
    signIn: 'Sign in',
    signUp: 'Register',
    signOut: 'Sign out',
    myListings: 'My listings',
    dashboard: 'Dashboard',
    contactSeller: 'Contact seller',
    callSeller: 'Call seller',
    price: 'Price',
    location: 'Location',
    postedBy: 'Posted by',
    description: 'Description',
    paymentMethod: 'Payment',
    cash: 'Cash', telebirr: 'Telebirr', cbe: 'CBE', both: 'Cash / Telebirr / CBE',
    categories: {
      car_rent: 'Car rent', car_sale: 'Car for sale', house_rent: 'House rent',
      house_sale: 'House for sale', land_sale: 'Land for sale',
      wedding_suit: 'Wedding suit', sound_rent: 'Sound rent',
      decoration: 'Decoration', makeup: 'Makeup'
    },
    noListings: 'No listings found',
    loading: 'Loading...',
    postListing: 'Post a listing',
    titleLabel: 'Title', categoryLabel: 'Category', priceLabel: 'Price',
    phoneLabel: 'Phone number', descLabel: 'Description', locationLabel: 'Location',
    imageLabel: 'Photos (up to 6)', submit: 'Submit listing',
    pending: 'Pending review', approved: 'Approved', rejected: 'Rejected',
    name: 'Your name', message: 'Message (optional)', send: 'Send message',
    hossana: 'Hossana, Central Ethiopia'
  },
  am: {
    siteName: 'ማፍጠሄ አለ ሆሳዕና',
    tagline: 'የሆሳዕና ዋና ገበያ',
    searchPlaceholder: 'ፈልግ...',
    allCategories: 'ሁሉም ምድቦች',
    recentListings: 'ቅርብ ጊዜ ማስታወቂያዎች',
    postAd: 'ማስታወቂያ ለጥፍ',
    signIn: 'ግባ',
    signUp: 'ተመዝገብ',
    signOut: 'ውጣ',
    myListings: 'ማስታወቂያዎቼ',
    dashboard: 'ዳሽቦርድ',
    contactSeller: 'ሻጩን ያነጋግሩ',
    callSeller: 'ሻጩን ይደውሉ',
    price: 'ዋጋ', location: 'ቦታ', postedBy: 'የለጠፈ', description: 'መግለጫ',
    paymentMethod: 'የክፍያ ዘዴ',
    cash: 'ጥሬ ገንዘብ', telebirr: 'ቴሌብር', cbe: 'CBE', both: 'ጥሬ / ቴሌብር / CBE',
    categories: {
      car_rent: 'መኪና ኪራይ', car_sale: 'መኪና ሽያጭ', house_rent: 'ቤት ኪራይ',
      house_sale: 'ቤት ሽያጭ', land_sale: 'መሬት ሽያጭ',
      wedding_suit: 'የሰርግ ልብስ', sound_rent: 'ድምፅ ኪራይ',
      decoration: 'ጌጥ', makeup: 'ሜካፕ'
    },
    noListings: 'ምንም ማስታወቂያ አልተገኘም',
    loading: 'እየጫነ ነው...',
    postListing: 'ማስታወቂያ ለጥፍ',
    titleLabel: 'ርዕስ', categoryLabel: 'ምድብ', priceLabel: 'ዋጋ',
    phoneLabel: 'ስልክ ቁጥር', descLabel: 'መግለጫ', locationLabel: 'ቦታ',
    imageLabel: 'ፎቶዎች (እስከ 6)', submit: 'ማስታወቂያ ላክ',
    pending: 'በግምገማ ላይ', approved: 'ተፈቅዷል', rejected: 'ውድቅ ተደርጓል',
    name: 'ስምዎ', message: 'መልዕክት (አማርኛ)', send: 'ላክ',
    hossana: 'ሆሳዕና፣ ማዕከላዊ ኢትዮጵያ'
  }
};

const LangContext = createContext();
export const useLang = () => useContext(LangContext);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const toggle = () => setLang(l => l === 'en' ? 'am' : 'en');
  return <LangContext.Provider value={{ lang, t, toggle }}>{children}</LangContext.Provider>;
}

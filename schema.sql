-- Mafitihe Alle Hossana - Database Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  title_am VARCHAR(200),
  description TEXT,
  description_am TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'car_rent','car_sale','house_rent','house_sale',
    'land_sale','wedding_suit','sound_rent','decoration','makeup'
  )),
  price NUMERIC(12,2),
  price_type VARCHAR(20) DEFAULT 'fixed' CHECK (price_type IN ('fixed','per_day','per_month','per_event','negotiable')),
  payment_method VARCHAR(30) DEFAULT 'both' CHECK (payment_method IN ('cash','telebirr','cbe','both')),
  phone VARCHAR(20) NOT NULL,
  location VARCHAR(200) DEFAULT 'Hossana',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','active','rejected','sold')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE listing_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE saved_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_user ON listings(user_id);
CREATE INDEX idx_images_listing ON listing_images(listing_id);

-- Seed admin user (password: admin123 - change immediately)
INSERT INTO users (name, phone, email, password_hash, role)
VALUES ('Admin', '+251900000000', 'admin@mafitihe.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'admin');

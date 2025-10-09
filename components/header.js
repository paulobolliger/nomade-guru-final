// Local: components/Header.js --- VERSÃO FINAL E SIMPLIFICADA

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header({ onCrieRoteiroClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="logo">
          <Link href="/">
            <img 
              src={scrolled 
                ? "https://res.cloudinary.com/dhqvjxgue/image/upload/c_crop,ar_4:3/v1744736404/logo_branco_sem_fundo_rucnug.png"
                : "https://res.cloudinary.com/dhqvjxgue/image/upload/v1744736403/logo_nomade_guru_iskhl8.png"
              }
              alt="Logo Nomade Guru" 
            />
          </Link>
        </div>
        
        {/* A navegação agora envolve tudo que fica à direita */}
        <nav className={isMenuOpen ? 'mobile-menu-open' : ''}>
          <ul>
            <li><Link href="/destinos">Destinos</Link></li>
            <li><Link href="/loja">Loja Online</Link></li> 
            <li><Link href="/blog">Blog</Link></li>
          </ul>
          <button 
            onClick={onCrieRoteiroClick} 
            className="header-btn"
          >
            Crie Seu Roteiro
          </button>
        </nav>

        {/* O botão hambúrguer fica fora da navegação */}
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        
      </div>
    </header>
  );
}
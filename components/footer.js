// Local: components/Footer.js

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-column footer-about">
          <div className="logo-footer">
            <img src="https://res.cloudinary.com/dhqvjxgue/image/upload/c_crop,ar_4:3/v1744736404/logo_branco_sem_fundo_rucnug.png" alt="Logo Nomade Guru" />
          </div>
          <p>Roteiros de viagem personalizados com inteligência artificial e curadoria humana, para você viajar com propósito e viver com liberdade.</p>
        </div>

        <div className="footer-column">
          <h3>Navegação</h3>
          <ul>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/sobre">Sobre Nós</Link></li>
            <li><Link href="/destinos">Destinos</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/depoimentos">Depoimentos</Link></li>
            <li><Link href="/loja">Loja Online</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Suporte</h3>
          <ul>
            <li><Link href="/contato">Contato</Link></li>
            <li><Link href="/faq">Perguntas Frequentes (FAQ)</Link></li>
            <li><Link href="/privacidade">Política de Privacidade</Link></li>
            <li><Link href="/termos-de-uso">Termos de Uso</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Siga-nos</h3>
          <ul className="box-redes-sociais">
            <li><a href="https://www.facebook.com/nomadeguru" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f icon"></i></a></li>
            <li><a href="https://www.instagram.com/nomade.guru/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram icon"></i></a></li>
            <li><a href="https://www.youtube.com/@NomadeGuru" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube icon"></i></a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" aria-label="Spotify"><i className="fab fa-spotify icon"></i></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Nomade Guru TAC Ltda. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
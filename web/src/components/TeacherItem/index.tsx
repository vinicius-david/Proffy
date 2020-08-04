import React from 'react';

import wppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/59883050?s=460&u=9297e05475d84763ecb291371d176d4b0c2989a9&v=4"
          alt="Vinicius David"
        />
        <div>
          <strong>Vinicius David</strong>
          <span>Matemática</span>
        </div>
      </header>

      <p>
        Professor de matemática em busca de um ensino de qualidade para seus
        alunos
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 50,00</strong>
        </p>

        <button type="button">
          <img src={wppIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;

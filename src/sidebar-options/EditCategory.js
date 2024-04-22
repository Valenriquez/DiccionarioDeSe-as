import  React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
 
import axios from 'axios';
import { Link } from 'react-router-dom';


import './EditCategory.css';

// Categories: https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall
 
function EditCategory() {
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    axios.get('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/categories/getall')
      .then(res => {
        console.log('API Response category:', res.data);
        setCategories(res.data.categories);
        // Fetch words data once categories data is available
        axios.get('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/words/getall')
          .then(res => {
            console.log('API Response words:', res.data);
            setWords(res.data.words);
          })
          .catch(err => console.log('API Error:', err));
      })
      .catch(err => console.log('API Error:', err));
  }, []);
  
  
  // definir valore
  const buttons = [
    { label: 'Editar Categoría', link: '/edit-category' },
    { label: 'Tutorial', link: '/create-category-tutorial' },
  ];

  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  const toggleExpansion = (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
    }
  };
  return (
    <>
        <Sidebar />
        <div className='navbar'> 
          <NavbarUser buttons={buttons} />
        </div>
        <div className="containerFor">
         <div className="row">
         <div className="col">
            <h1 className='base-datos'>Base de datos</h1>
            <h2 className='palabras-actuales'>Categorías actuales</h2>

          {categories.map((category) => (
          <div className='box' key={category.id}>
          <button onClick={() => toggleExpansion(category.id)}>  
            {expandedCategoryId === category.id ? '▼' : '▲'} <Link to={`/update-category/${category.id}`}>{category.name}</Link>

          </button>
          {expandedCategoryId === category.id && (
          <div>
          {words
          .filter(word => word.categoryid === category.id)
          .map(matchingWordData => (
            <div key={matchingWordData.id}>
              <button>{matchingWordData.word}</button>
            </div>
          ))}
          </div>
          )}
        </div>
      ))}
      </div>
    </div>
  </div>    
    </>
  );
}

export default EditCategory;
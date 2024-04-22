import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import './CreateCategory.css'; 
import { IoIosColorPalette } from "react-icons/io";
import { BsCake2Fill } from "react-icons/bs";
import { ImSpoonKnife } from "react-icons/im";
import { PiBirdFill } from "react-icons/pi";
import { FaApple } from "react-icons/fa";

import axios from 'axios';
// post: https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/categories/add
// Example import statement for Icon from cdbreact



// Categories: https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall

// ame":"Comida","color":"verde","icon":"fork.knife","idsettings":1,"isscannable":fals
function CreateCategory() {

  const options = [
    { value: 'color-image', label: <IoIosColorPalette /> },
    { value: 'family-image', label: <BsCake2Fill  /> },
    { value: 'im-spoon-knife', label: <ImSpoonKnife   /> },
    { value: 'pi-bird-fill', label: <PiBirdFill   /> },
    { value: 'apple-apple', label: <FaApple   /> },
  ];
  
  const [selectedOption, setSelectedOption] = useState(null);
    // Access the selected option directly
    if (selectedOption) {
      console.log(`Selected option: ${selectedOption.value}`);
      // Add your custom logic here based on the selected option
    } else {
      console.log('No option selected');
      // Handle the case when no option is selected
    }

  const [selectedProduct, setSelectedProduct] = useState('');

 
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [name, setName] = useState('')
  const [color, setColor] = useState('red');
  const [idsettings, setIdsettings] = useState(1)
  const [isscannable, setIsscannable] = useState(false)


  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const { control, handleSubmit } = useForm();
   useEffect(() => {
    axios.get('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/categories/getall')
      .then(res => {
        console.log('API Response category:', res.data); // Log the API response data
        setCategories(res.data.categories); // Update the admins state with the fetched data
      })
      .catch(err => console.log('API Error:', err)); // Log any API errors
  }, []); // Empty dependency array to run the effect only once

  console.log('categories Array:', categories); // Log the state of the admins array

  useEffect(() => {
    axios.get('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/words/getall')
      .then(res => {
        console.log('API Response words:', res.data); // Log the API response data
        setWords(res.data.words); // Update the admins state with the fetched data
      })
      .catch(err => console.log('API Error:', err)); // Log any API errors
  }, []); // Empty dependency array to run the effect only once

  console.log('words Array:', words); // Log the state of the admins array

  
  const buttons = [
    { label: 'Crear Categoría', link: '/create-category' },
    { label: 'Tutorial', link: '/create-category-tutorial' },
  ];

  const toggleExpansion = (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
    }
  };

  const [categoryData, setCategoryData] = useState({
    name: 'hola',
    color: 'red',
    icon: 'this-is-an-icon',
    idsettings: 1,
    isscannable: false,
  });

  function resetForm() {
    console.log('resetForm function is triggered');  
    setCategoryData({
      ...categoryData,
      name: '',
      color: '',
      icon: '',
      idsettings: 1, 
      isscannable: false, 
    });
  }

  // ame":"Comida","color":"verde","icon":"fork.knife","idsettings":1,"isscannable":fals
  const handleSubmitIcon = (e) => {
    e.preventDefault();
    // Handle the form submission with the selected product
    console.log('Selected Product:', selectedProduct);
  };

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleColor = (e) => {
    setColor(e.target.value)
  }

  const handleIdsettings = (e) => {
    setIdsettings(e.target.value)
  }

  const handleIsscannable = (e) => {
    setIsscannable(e.target.checked)
  }
 
  
  const handleApiForCategory = () => {
    console.log({ name, color, idsettings, isscannable });
    axios
      .post("https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/categories/add", {
        name: name,
        color: color,
        icon: selectedOption.value,
        idsettings: idsettings, 
        isscannable: isscannable
      })
      .then((result) => {
        console.log(result.data);
       })
      .catch((error) => {
        alert('service error');
         console.log(error);
      });
  }
  return (
    <>
        <Sidebar />
        <div className='navbar'> 
        <NavbarUser buttons={buttons} />
        </div>
        <div className="container">
         <div className="row">
          <div className="col">
            <h1 className='base-datos'>Base de datos</h1>
            <h2 className='palabras-actuales'>Palabras actuales</h2>
              {categories.map((categories) => (
              <div className='box' key={categories.id}>
              < button onClick={() => toggleExpansion(categories.id)}>
                {expandedCategoryId === categories.id ? '▼' : '▲'} {categories.name}
              </button>
              {expandedCategoryId === categories.id && (
              <div>
              {words
                .filter(word => word.categoryid === categories.id)
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
       
       <div class="col">
        <h1>Crear Categoría </h1>
           <label>
          <strong>Añade el nombre:</strong>
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleName}
              className="input"
              autoComplete="off"
            />
          </label>
          <br />
          <label>
          <strong>Escoge el color:</strong>
          <br />
          <select onChange={handleColor}>
              <option value="red">Rojo</option>
              <option value="yellow">Amarillo</option>
              <option value="green">Verde</option>
              <option value="purple">Morado</option>
              <option value="blue">Azul</option>
              <option value="brown">Café</option>
              <option value="black">Negro</option>
            </select>
          </label>

          <br />
          <label>
          <strong>Añade el icono:</strong>
            <br />  <br />
          <Select
            options={options}
            value={selectedOption}
            onChange={(option) => setSelectedOption(option)}
        />
          </label>
          <br /><br />
          <label>
          <strong>Selcciona el idioma:</strong>
            <br />  <br />
            <select onChange={handleIdsettings}>
              <option value="1">Español</option>
              <option value="2">English</option>
            </select>

          </label>
          <br />
          <label style={{ marginLeft: '30px' }}>
          <strong>Es escaneable:</strong>
             <input
              type="checkbox"
              name="isscannable"
              checked={isscannable}
              className="input"
              onChange={handleIsscannable}
             />
          </label>
          <br /><br />
          <button className="custom-button" onClick={handleApiForCategory} >Añadir</button>

          <button type="button" onClick={resetForm}>Limpiar</button>
          </div>
       </div>
      </div>
      </>
  );
}

export default CreateCategory;
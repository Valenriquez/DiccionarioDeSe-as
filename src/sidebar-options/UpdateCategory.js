import  React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";
import { IoIosColorPalette } from "react-icons/io";
import { BsCake2Fill } from "react-icons/bs";
import { ImSpoonKnife } from "react-icons/im";
import { PiBirdFill } from "react-icons/pi";
import { FaApple } from "react-icons/fa";

function UpdateCategory() {

  
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


  const {id} = useParams();
  const [values, setValues] = useState({
    name: "",
    color: "red",
    icon: "",
    idsettings: 1,
    isscannable: false
  });

  useEffect(() => {
    axios.get('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/categories/get/' +id)
      .then((res) => {
        setValues({
          ...values,
          name: res.data.name,
          color: res.data.color,
          icon: selectedOption.value,
          idsettings: 1,
          isscannable:  res.data.isscannable
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);




const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/categories/update/"+id, values)
    .then(res => {
      console.log("Category updated successfully:", res.data);
        navigate("/edit-category");
        console.log("Avr si se agrego")
    })
    .catch(err => console.log(err))

  }

  const handleDeleteCategory = async (id) => {
    try {
        await axios.delete('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/categories/delete/' + id)
        window.location.reload()
    }catch(err) {
        console.log(err);
    }
}
  return (
    <> 
    <div className='col'>
         <h1>Editar Categoría</h1>
          <form onSubmit={handleSubmit}>
            <strong>Nuevo nombre:</strong>
            <input 
             type="text"
             name="name"
             className='form-control'
             placeholder='Ingresa el nuevo nombre'
             value={values.name}
             onChange={ e=> { 
              console.log(e.target.value);
               setValues({...values, name: e.target.value})} }
            />
             <br />
        <strong>Color:</strong>
            <br />
            <select onChange={e=> setValues({...values, color: e.target.value})}>
              <option value="red">Rojo</option>
              <option value="green">Verde</option>
              <option value="purple">Morado</option>
              <option value="blue">Azul</option>
              <option value="brown">Café</option>
              <option value="black">Negro</option>
            </select>
            <br /><br />

          <strong>Icon:</strong>
          <Select
            options={options}
            value={selectedOption}
            onChange={(option) => setSelectedOption(option)}
        />
             <br />
            <strong>Selcciona el idioma:</strong>
            <br />
            <select onChange={e => setValues({ ...values, idsettings: e.target.value, })}>
              <option value="1">Español</option>
              <option value="2">English</option>
            </select>

          <br />
          
          <br /> 
            <strong>Is Scannable:</strong>

            <input
              type="checkbox"
              name="isscannable"
              value={values.isscannable}
              onChange={e=> setValues({...values, isscannable: e.target.checked})}
            /> 
            </form>
            <br />
            <button className="btn btn-success" onClick={handleSubmit}>Editar</button>
            <button className='btn btn-danger ms-2' style={{ margin: '10px' }} onClick={ e => handleDeleteCategory(id)}
            >Eliminar
            </button>
          </div>
          </>
  )
}

export default UpdateCategory

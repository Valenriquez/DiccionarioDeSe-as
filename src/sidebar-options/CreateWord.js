import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Upload from '../Upload';
import './CreateWord.css';

function CreateWord() {

  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [word, setWord] = useState('')
  const [definition, setDefinition] = useState('')
  const [suggested1, setSuggested1] = useState('')
  const [suggested2, setSuggested2] = useState('')
  const [idsettings, setIdsettings] = useState(1)
  const [isscannable, setIsscannable] = useState(false)
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);

  const [image, setImage] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [videoLink, setVideoLink] = useState(null);
  const [audioLink, setAudioLink] = useState(null);



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUploadImage = (selectedFile) => {
    const S3_BUCKET = "signolingotest";
    const REGION =  "us-east-2";
    const encodedFilename = encodeURIComponent(selectedFile.name);
    const fileImage = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodedFilename}`;
    setImageLink(fileImage);
  };

  const handleUploadVideo = (selectedFile) => {
    const S3_BUCKET = "signolingotest";
    const REGION =  "us-east-2";
    const encodedFilename = encodeURIComponent(selectedFile.name);
    const fileVideo = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodedFilename}`;
    setVideoLink(fileVideo);
  };

  const handleUploadAudio = (selectedFile) => {
    const S3_BUCKET = "signolingotest";
    const REGION =  "us-east-2";
    const encodedFilename = encodeURIComponent(selectedFile.name);
    const fileAudio = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodedFilename}`;
    setAudioLink(fileAudio);
  };


  //TRYING -> FOR ID CATEGORIES
  const [selectedOptionCategory, setSelectedOptionCategory] = useState('');
  const [selectedOptionSuggested1, setSelectedOptionSuggested1] = useState('');
  const [selectedOptionSuggested2, setSelectedOptionSuggested2] = useState('');

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
    { label: 'Crear Palabra', link: '/create-word' },
    { label: 'Tutorial', link: '/tutorial' },
  ];
 
  const toggleExpansion = (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
    }
  };
 
  const [wordData, setWordData] = useState({
    word: '',
    categoryid: 0,
    definition: '',
    image: null,  
    suggested1: '',
    suggested2: '',
    video: null,  
    idsettings: 1,
    isscannable: false,
    audio: null, 
  });

  function resetForm() {
    setWordData({
    ...wordData,
    word: '',
    categoryid: 0,
    definition: '',
    image: null, // Use null to store the selected file
    suggested1: '',
    suggested2: '',
    video: null, // Use null to store the selected file
    idsettings: 1,
    isscannable: false,
    audio: null, // Use null to store the selected file
    });
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setWordData({
      ...wordData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
    console.log(wordData); // This logs the entire categoryData object to the console

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', wordData.image);
    formData.append('audio', wordData.audio);
    formData.append('video', wordData.video);
    formData.append('word', wordData.word);
    formData.append('categoryid', wordData.categoryid);
    formData.append('definition', wordData.definition);
    formData.append('idsettings', wordData.idsettings);
    formData.append('isscannable', wordData.isscannable);

    // Define the URL where you want to send the POST request
    const apiUrl = "https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/words/add";

    // Send the POST request using Axios
    axios.post(apiUrl, formData)
      .then(function (response) {
        console.log('Word added successfully:', response.data);
      })
      .catch(function (error) {
        console.error('Error adding word:', error);
      });
  };


   // {"id":28,"word":"Rojo","categoryid":17,"definition":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  //"image":"red","suggested1":"Amarillo","suggested2":"Azul","video":"Alimentos_7_Rojo","idsettings":1,
  //"isscannable":false,"audio":"Manzana"}]}
 

  const handleOptionChangeCategory = (event) => {
    setSelectedOptionCategory(event.target.value);
  };

  const handleOptionChangeSuggested1 = (event) => {
    setSelectedOptionSuggested1(event.target.value);
  };

  const handleOptionChangeSuggested2 = (event) => {
    setSelectedOptionSuggested2(event.target.value);
  };
  
  const handleWord = (e) => {
    setWord(e.target.value)
  }

  const handleDefinition = (e) => {
    setDefinition(e.target.value)
  }

  const handleIsscannable = (e) => {
    setIsscannable(e.target.checked)
  }

  const handleIdsettings = (e) => {
    setIdsettings(e.target.checked)
  }

  const handleImage = (e) => {
    console.log("hey theree");
    const S3_BUCKET = "signolingotest";
    const REGION =  "us-east-2";
    const file = e.target.files[0]; // Access the selected file from the event
    const encodedFilename = encodeURIComponent(file.name);
    const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodedFilename}`;
    console.log("this is it" + fileUrl);
    setImage(fileUrl);
    setFile(file); // Assuming you also want to store the selected file
  };
  


  // {"id":28,"word":"Rojo","categoryid":17,"definition":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  //"image":"red","suggested1":"Amarillo","suggested2":"Azul","video":"Alimentos_7_Rojo","idsettings":1,
  //"isscannable":false,"audio":"Manzana"}]}
  const handleApiForWord = () => {
    console.log({ word, selectedOptionCategory, definition, selectedOptionSuggested1, selectedOptionSuggested2, idsettings, isscannable, imageLink, videoLink, audioLink });
    axios
      .post("https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/words/add/", {  
        word: word, 
        categoryid: selectedOptionCategory, 
        definition: definition, 
        image: imageLink, 
        suggested1: selectedOptionSuggested1, 
        suggested2: selectedOptionSuggested2, 
        video: videoLink, 
        idsettings: idsettings, 
        isscannable: isscannable,
        audio: audioLink
      })
      .then((result) => {
        console.log('Word added successfully:', result.data);
        alert('success');
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
        <h1>Crear Palabra </h1>
         <label><strong>Selecciona la categoria:</strong></label>
         <select value={selectedOptionCategory} onChange={handleOptionChangeCategory}>
              <option>Selecciona la opción:</option>
                  {categories.map((categories) => (
                    <option key={categories.id} value={categories.id}>
                      {categories.name}
                    </option>
                    ))}
            </select>
    
           <br />
          <label><strong>Añade la palabra:</strong></label>
            <br />
            <input
              type="text"
              name="word"
              value={word}
              onChange={handleWord}
              className="input"
              autoComplete="off"
            />
          <label><strong>Añade la primera palabra sugerida:  </strong></label>

          <select value={selectedOptionSuggested1} onChange={handleOptionChangeSuggested1}>
            <option value="">Selecciona la opción:</option>
                  {words.map((words) => (
                    <option key={words.id}>
                       { words.word }
                    </option>
                    ))}
            </select>


          <label><strong>Añade la segunda palabra sugerida:   </strong></label>

          <select value={selectedOptionSuggested2} onChange={handleOptionChangeSuggested2}>
            <option value="">Selecciona la opción:</option>
                  {words.map((words) => (
                    <option key={words.id}>
                       { words.word }
                    </option>
                    ))}
            </select>


          <br />
          <label><strong>Añade la definición:</strong></label>
            <br />
            <input
              type="text"
              name="definition"
              value={definition}
              onChange={handleDefinition}
              className="input"
              autoComplete="off"
            />
          
          
          <br />
          <label><strong>Selcciona el idioma:</strong></label>
            <br />
            <select onChange={handleIdsettings}>
              <option value="1">Español</option>
              <option value="2">English</option>
            </select>
          <br />
          <label><strong>Añade la imagen:</strong></label>
          <br /><br />
      
          <Upload onChange={handleUploadImage} />
        

          
           


          <br />
          <label><strong>Añade el audio:</strong></label>
            <br /><br />
          
          <Upload onChange={handleUploadAudio} />
            

          <br />
          <label><strong>Añade el video:</strong></label>
            <br /><br />
            
            <Upload onChange={handleUploadVideo} />

          <br />
          <label>
          <strong>Es escaneable:</strong>
          <br />
            <input
               type="checkbox"
               name="isscannable"
               checked={isscannable}
               className="input"
               onChange={handleIsscannable}
            />
          </label>
          <br /><br />
      
      </div>
          <button className="custom-button" onClick={handleApiForWord} >Añadir</button>
          <button type="button" onClick={resetForm}>Limpiar</button>
        
  
        </div>
      </div>
        </>
  );
}

export default CreateWord;
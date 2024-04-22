import  React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import Upload from '../Upload';
import { useNavigate, useParams } from 'react-router-dom';
 

function UpdateWord() {

  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);

  const [idsettings, setIdsettings] = useState(1)


  const [imageLink, setImageLink] = useState(null);
  const [videoLink, setVideoLink] = useState(null);
  const [audioLink, setAudioLink] = useState(null);



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

  const {id} = useParams();
  const [values, setValues] = useState({
    word: "",
    categoryid: 0,
    definition: '',
    image: "",  
    suggested1: "",
    suggested2: "",
    video: "",  
    idsettings: 1,
    isscannable: false,
    audio: "", 
  });
  useEffect(() => { 
    axios.get(`https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/words/get/${id}`)
      .then((res) => {
        const { word, categoryid, definition, image, suggested1, suggested2, video, isscannable, audio } = res.data;
        setValues({
          ...values,
          word: word,
          categoryid: categoryid,
          definition: definition,
          image: image,
          suggested1: suggested1,
          suggested2: suggested2,
          video: video,
          isscannable: isscannable,
          audio: audio,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

const navigate = useNavigate()


const handleIdsettings = (e) => {
  setIdsettings(e.target.checked)
}

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/words/update/"+id, values)
    .then(res => {
      console.log("Words updated successfully:", res.data);
        navigate("/edit-word");
        console.log("Avr si se agrego")
    })
    .catch(err => console.log(err))

  }

  
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

  
  const handleOptionChangeCategory = (event) => {
    setSelectedOptionCategory(event.target.value);
  };

  const handleOptionChangeSuggested1 = (event) => {
    setSelectedOptionSuggested1(event.target.value);
  };

  const handleOptionChangeSuggested2 = (event) => {
    setSelectedOptionSuggested2(event.target.value);
  };


  const handleDeleteWord = async (id) => {
    try {
        await axios.delete('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/words/delete/' + id)
        window.location.reload()
        alert('Se borró correctamente')
    }catch(err) {
        console.log(err);
    }
}
  return (
    <div className='col'>
         <h1>Editar Palabra</h1>
          <form onSubmit={handleSubmit}>
          
            <strong>Nueva palabra:</strong>
            <input 
             type="text"
             name="word"
             className='form-control'
             placeholder='Ingresa el nuevo nombre'
             value={values.word}
             onChange={e => {
              console.log(e.target.value);
              setValues({...values, word: e.target.value});
            }}
            />
            
          <strong>Category ID:</strong>
            <input
              type="number"
              name="categoryid"
              className='form-control'
              placeholder='Ingresa el nuevo categoryid'
              value={values.categoryid}
              onChange={e=> setValues({...values, categoryid: e.target.value})}
              
            />

             <strong>Añade la primera palabra sugerida:  </strong>

              <select value={selectedOptionSuggested1} onChange={handleOptionChangeSuggested1}>
                <option value="">Selecciona la opción:</option>
                      {words.map((words) => (
                        <option key={words.id}>
                          { words.word }
                        </option>
                        ))}
                </select>


              <strong>Añade la segunda palabra sugerida:   </strong>
              
              <select value={selectedOptionSuggested2} onChange={handleOptionChangeSuggested2}>
                <option value="">Selecciona la opción:</option>
                      {words.map((words) => (
                        <option key={words.id}>
                          { words.word }
                        </option>
                        ))}
                </select>

            <strong>Definición:</strong>
            <input
              type="text"
              name="definition"
              className='form-control'
              placeholder='Ingresa el nuevo definition'
              value={values.definition}
              onChange={e=> setValues({...values, definition: e.target.value})}
              
            />

          <strong>Selcciona el idioma:</strong>
            <br />
            <select onChange={handleIdsettings}>
              <option value="1">Español</option>
              <option value="2">English</option>
            </select>
          <br />
          <strong>Añade la imagen:</strong>
          <br /><br />
      
          <Upload onChange={handleUploadImage} />
        

          
           


          <br />
          <strong>Añade el audio:</strong>
            <br /><br />
          
          <Upload onChange={handleUploadAudio} />
            

          <br />
          <strong>Añade el video:</strong>
            <br /><br />
            
            <Upload onChange={handleUploadVideo} />

          <br />
            
            <strong>Es escaneable:</strong>
            <input
              type="checkbox"
              name="isscannable"
              placeholder='Ingresa el nuevo nombre'
              value={values.isscannable}
              onChange={e=> setValues({...values, isscannable: e.target.checked})}
            /> 
 
            </form>
            <br />
            <button className="btn btn-success" onClick={handleSubmit}>Editar</button>
            
            <button className='btn btn-danger ms-2' style={{ margin: '10px' }} onClick={ e => handleDeleteWord(id)}
            >Eliminar
            </button>

            
          </div>
  )
}

export default UpdateWord

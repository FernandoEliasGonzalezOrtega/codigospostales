
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import React from 'react';

function App() {

  const getCP = async () =>{
    const estado = document.getElementById("estado");
    const municipio = document.getElementById("municipio");
    const colonia = document.getElementById("colonia");
    try {
      let formData = new FormData();
      var cp = document.getElementById("cp").value;
      formData.append("cp", cp);
      const url = "http://api.masksoftco.mx/direcciones/codigo-postal";

      if(cp.length>=5){
        let result = await axios({
          url,
          method: 'POST',
          dataType: 'json',
          ContentType: 'application/json',
          data: formData
            });
            console.log(result);
            const datos = result.data;
            if(datos===0){
              alert("Código Postal no encontrado");
              return(0);
            }
            estado.innerHTML = "<option>"+ datos[0].estado + "</option>";
            municipio.innerHTML = "<option>"+ datos[0].municipio + "</option>";
            for(let i = 0; i<datos.length;i++){
              colonia.innerHTML += "<option>"+ datos[i].colonia + "</option>";
            }
      } else{
        colonia.innerHTML = "<option>Selecciona una opción...</option>";
      }
    }
    catch (error) {
      console.log(error);
    }
  }
      

  return (
    <div className="App">
      <form>
        <h1>Códigos Postales</h1>
        <div className='row'>
          <div className='col-md-3'>
            <label>Código Postal</label>
            <input type="number" className="form-control" placeholder='Código Postal' id='cp' onChange={getCP} required/>
          </div>
          <div className='col-md-3'>
            <label>Estado</label>
            <select name='Estado' className="form-control" id="estado" disabled> 
            <option>Selecionar una opción...</option>  
            </select>

          </div>
          <div className='col-md-3'>
          <label>Municipio/Alcaldia</label>
            <select name='Municipio o Alcaldia' className="form-control" id="municipio" disabled> 
              <option>Selecionar una opción...</option>
            </select>
          </div>
          <div className='col-md-3'>
          <label>Colonia</label>
            <select name='Colonia' className="form-control" id="colonia" required> 
              <option>Selecionar una opción...</option>
            </select>
          </div>
        </div>

        
      </form>
    </div>
  );
}

export default App;

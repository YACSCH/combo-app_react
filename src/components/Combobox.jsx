import React, { useState, useEffect } from "react";
import { GetToken } from "../api/getData";
import axios from "axios";

const ComboBoxes = () => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [communes, setCommunes] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterTableData, setFilterTableData] = useState([]);

  useEffect(() => {
    axios
      .get("https://beta.api.cne.cl/api/region")
      .then((response) => {
        console.log(response.data);
        setRegions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      axios
        .get(`https://beta.api.cne.cl/api/comuna/${selectedRegion}`)
        .then((response) => {
          console.log(response.data);
          setCommunes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching communes:", error);
        });
    }
  }, [selectedRegion]);

  useEffect(() => {
      axios.get("https://beta.api.cne.cl/api/v3/combustible/vehicular/estaciones/", {
        headers: {
              Authorization: GetToken()
                ,
            },
          }
        )
        .then((response) => {
          setTableData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        
        const filterStations = Object.values(tableData)
        .filter((station) => station.id_region === selectedRegion)
        .filter((comuna) => comuna.id_comuna === selectedCommune);

      setFilterTableData(filterStations);
    }
  , [selectedCommune]);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedCommune("");
  };
  const handleComuneChange = (event) => {
    setSelectedCommune(event.target.value);
  };

  return (
    <div className="container-app">
      <label htmlFor="region">Región:</label>
      <select id="region" value={selectedRegion} onChange={handleRegionChange}>
        <option value="">Seleccione una región</option>
        {regions.map((region) => (
          <option key={region.cod_region} value={region.cod_region}>
            {region.nom_region}
          </option>
        ))}
      </select>

      <label htmlFor="comuna">Comuna:</label>
      <select id="comuna" value={selectedCommune} onChange={handleComuneChange}>
        <option value="">Seleccione una comuna</option>
        {communes.map((comuna) => (
          <option key={comuna.cod_comuna} value={comuna.cod_comuna}>
            {comuna.nom_comuna}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Columna 1</th>
            <th>Columna 2</th>
            <th>Columna 3</th>
            <th>Columna 4</th>
            <th>Columna 4</th>
            <th>Columna 4</th>
            {/* Añadir más encabezados de columna según los datos de la tabla */}
          </tr>
        </thead>
        <tbody>
          {Object.values(filterTableData).map((item) => (
            <tr key={item.id}>
              <td>{item.razon_social}</td>
              <td>{item.horario_atencion}</td>
              <td>{item.nombre_comuna}</td>
              <td>{item.nombre_region}</td>
              <td>{item.ubicacion.latitud}</td>
              <td>{item.ubicacion.longitud}</td>
              {/* Mostrar más columnas según los datos de la tabla */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComboBoxes;

/* import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Combobox = () => {

const [data, setData] = useState([]) 
const [dataComuna, setDataComuna] = useState([]) 
const [selectedOption, setSelectedOption] = useState('');
const [selectedOptionComuna, setSelectedOptionComuna] = useState('');




useEffect( () => {
    const loadData = async () => {
    const response =  await axios.get('https://beta.api.cne.cl/api/region')
    setData(response.data) 
    };
    loadData();
},[]);
const loadComunas = async (region) => {

    const url = 'https://beta.api.cne.cl/api/comuna/' + region

    console.log(url)
    const responseComuna =  await axios.get(url)
    setDataComuna(responseComuna.data) 

}

const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log('Opción seleccionada:', selectedValue);
     
    loadComunas(selectedValue);

  };

  const handleOptionChangeComuna = (event) => {
    const selectedValueComuna = event.target.value;
    setSelectedOption(selectedValueComuna);
    console.log('Opción seleccionada:', selectedValueComuna);
  };

  return (
    <section>
        <select name="cboRegion" id="cboRegion" value={selectedOption}  onChange={handleOptionChange}>
        <option value="">Seleccione una Región</option>
         { data.map((item) => (
            <option key={item.cod_region} 
                    value={ item.cod_region }>
                        {item.nom_region}</option>
        ))};
         </select>
        <select name="cboComuna" id="cboComuna" value={selectedOptionComuna}  onChange={handleOptionChangeComuna}>
        <option value="">Seleccione una Comuna</option>
         { dataComuna.map((item) => (
            <option key={item.cod_comuna} 
                    value={ item.cod_comuna }>
                        {item.nom_comuna}</option>
        ))};
         </select>

    </section>
  )
}

export default Combobox */

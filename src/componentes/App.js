import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import { obtenerDiferenciaAnio, calcularMarca, obtenerPlan } from '../helper';
import Resultado from './Resultado';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultado: '',
      datosFinal: {}
    }
  }

  cotizarSeguro = (datos) => {
    const { marca, plan, year } = datos;

    // Agregar una base de 2000
    let resultado = 2000;

    // Obtener diferencia de años
    const diferencia = obtenerDiferenciaAnio(year);

    // Por cada año menor restar el 3%
    // Formula Porcentaje "(porcentaje) x total / 100" 
    resultado -= ((diferencia * 3) * resultado) / 100;
    
    // Americano 15%, Asiatico 5%, Europeo 30% de incremento al valor
    resultado = calcularMarca(marca) * resultado;
    
    // Plan básico incrementa 20%
    // Plan completo incrementa 50%
    let incrementoPlan = obtenerPlan(plan);
    
    //Dependiendo del plan incremente
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    // Crear objeto para el resumen
    const datosAuto = {
      marca: marca,
      plan: plan,
      year: year
    }

    this.setState({
      resultado: resultado,
      datosFinal: datosAuto
    })

  }

  render() {
    return (
      <div className="contenedor">
        <Header
          titulo="Cotizador de Seguro de Autos" 
        />
        <div className="contenedor-formulario">
          <Formulario
            cotizarSeguro={this.cotizarSeguro}
          />
          <Resumen
            datosFinal={this.state.datosFinal}
            resultado={this.state.resultado}
          />
          < Resultado
            resultado={this.state.resultado}
          />
        </div>
      </div>
    );
  }
}

export default App;

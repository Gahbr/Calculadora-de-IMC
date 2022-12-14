import styles from './App.module.css'
import poweredImg from './assets/powered.png'
import leftArrowImg from './assets/leftarrow.png'
import { useState } from 'react';
import {levels, calculateImc, Level} from './helpers/imc'
import GridItem from './components/GridItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App =() => {

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null> (null);

  const notify = ()=>{
    toast.error("Preencha todos os campos!")
}

  const handleCalculatebutton= ()=>{
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField))
    } else{
       notify()
      }
  }

  const handleBackButton = () =>{
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImg} alt="logo" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            IMC é a sigla para Índice de Massa Corpórea , parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.
          </p>
          <input
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
            value={heightField > 0 ? heightField : ''}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder="Digite o seu peso. Ex: 75.3 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button onClick={handleCalculatebutton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        
        <div className={styles.rightSide}>
          {!toShow && 
            <div className={styles.grid}>
              {levels.map((item, key) =>(
               <GridItem key={key} item={item}/>
              ))} 
            </div>
          }         
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImg} alt="left arrow" width={25} />
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>
      <ToastContainer position="top-right"/>
    </div>
  );
}

export default App;
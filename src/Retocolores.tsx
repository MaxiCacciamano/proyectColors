import { useEffect, useMemo, useState } from 'react'
import { Difficulty, DifficultyRules } from './Difficulty.tsx'; // Importa el componente de dificultad
import Game from './Game.tsx'
import './index.css';
// import colors from './colors.json'
// necesito el estado initial, playin, finished
//time = number
//score = number
type Color = {
  name: string,
  color: string,
  correct: boolean
}

const colors: Color[] = [
  {
      "name":"rojo",
      "color":"#f00",
      "correct":false
  },
  {
      "name":"verde",
      "color":"#0f0",
      "correct":false
  },
  {
      "name":"amarillo",
      "color":"#ff0",
      "correct":false
  },
  {
      "name":"purpura",
      "color":"#7b0a8f",
      "correct":false
  },
  {
      "name":"gris",
      "color":"#534e54",
      "correct":false
  },
  {
      "name":"naranja",
      "color":"#ff5900",
      "correct":false
  },
  {
      "name":"negro",
      "color":"#000000",
      "correct":false

  },
  {
      "name":"celeste",
      "color":"#2baccc",
      "correct":false
  },
  {
    "name":"rosa",
    "color":"#fc039d",
    "correct":false
  }
]

function Retocolores() {
  const [status, setStatus] = useState<"initial"|"playing"|"finished">('initial')
  const [time, setTime] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [gameColors, setGamecolors] = useState<Color[]>([]) 
  const [highScores, setHighScores] = useState<number[]>([]);
  const correctColor = useMemo<Color>(()=>gameColors.find((col)=>col.correct)!,[gameColors])
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.Easy);

 const handlePlayIniciar = (difficulty: Difficulty)=>{
    setSelectedDifficulty(difficulty); // Establecer la dificultad seleccionada
    setStatus("playing")
    setTime(0)
    setScore(0) 

    
    const [correctColor, wrongColor] = colors.slice().sort(()=> Math.random() - 0.5)
    setGamecolors([{...correctColor, correct:true}, wrongColor].sort(()=>Math.random()-0.5))

  }


  function handleColorClick(clickedColor: Color) {
    const penalty = DifficultyRules[selectedDifficulty].penalty;
  
    if (clickedColor.correct) {
      setScore((score) => score + 1);
    } else {
      if (selectedDifficulty === Difficulty.VeryHard) {
        setScore(0); // Reiniciar el puntaje a 0 en dificultad "Muy difícil"
        setStatus('finished'); // Cambiar a estado 'finished' inmediatamente en dificultad "Muy difícil"
      } else {
        setScore((score) => Math.max(0, score - penalty));
        if (score === 1) {
          setStatus('finished');
        }
      }
    }
  
    const [correctColor, wrongColor] = colors.slice().sort(() => Math.random() - 0.5);
    setGamecolors([{ ...correctColor, correct: true }, wrongColor].sort(() => Math.random() - 0.5));
  
    if (score === 9) {
      setStatus('finished');
      // saveHighScore(time);
    }
  }
  

  // function handleColorClick(clickedColor: Color){
  //   const penalty = DifficultyRules[selectedDifficulty].penalty;
  //   if(clickedColor.correct){
  //     setScore((score)=> score +1 )
  //   }else{
  //     if (selectedDifficulty === Difficulty.VeryHard) {
  //       setScore(0); // Reiniciar el puntaje a 0 en dificultad "Muy difícil"
  //     }else{
  //       setScore((score) => Math.max(0, score - penalty));
  //     }
  //     if(score === 1 ){
  //       setStatus('finished')
  //     }
  //   }

  //   const [correctColor, wrongColor] = colors.slice().sort(()=> Math.random() - 0.5)
  //   setGamecolors([{...correctColor, correct:true}, wrongColor].sort(()=>Math.random()-0.5))
    

  //   if(score === 9){
  //     setStatus("finished")
  //     saveHighScore(time);
  //   }

  // }

  // function saveHighScore() {
  //   const updatedHighScores = [...highScores, time].sort((a, b) => a - b).slice(0, 10);
  //   setHighScores(updatedHighScores);
  //   // localStorage para persistir los puntajes más altos.
  //   localStorage.setItem('highScores', JSON.stringify(updatedHighScores));
  // }
  function saveHighScore() {
    setHighScores((prevHighScores) => {
      const updatedHighScores = [...prevHighScores, time].sort((a, b) => a - b).slice(0, 10);
      // localStorage para persistir los puntajes más altos.
      localStorage.setItem('highScores', JSON.stringify(updatedHighScores));
      return updatedHighScores;
    });
  }
  
  

  function clearHighScores() {
    localStorage.removeItem('highScores');
    setHighScores([]); // Esto también limpia el estado de highScores en tu aplicación
  }

  

  useEffect(()=>{
    const storedHighScores = localStorage.getItem('highScores');
    let interval:number;
    if(status==="playing"){
      interval = setInterval(()=>{
        setTime(time => time + 1)
      },1000)
    }

    if (storedHighScores) {
      setHighScores(JSON.parse(storedHighScores));
    }
    return ()=>{
      clearInterval(interval)
    }
  },[status])
  return (
    <div className='gen1'>
    <div className='descrip'>
    <h2>{score} puntos</h2>
    <h2>{time} segundos</h2>
    </div>
    <div className='gen'>
    <main style={{}}> 
    <div className="block" style={{ borderRadius:'5%'}}>
      <footer>
          {status === "initial"&& (<Game handlePlayIniciar={handlePlayIniciar}/>)}
          {status === "finished"&& (<button style={{backgroundColor:'aliceblue', color:'black'}} onClick={()=>setStatus("initial")}>Reiniciar</button>)}
          {status === "playing"&&
          <>
        {
          status === "playing" &&(
          <section>
            <span style={{textTransform:"capitalize", color:gameColors[0] ?.color}}>
              <h4 style={{margin:"30px"}}>{correctColor.name}</h4>
            </span>
          </section>

          )
        }
          <button onClick={()=>handleColorClick(gameColors[0])} style={{width:128, height:128, background: gameColors[0]?.color, borderRadius:"50%", marginBottom:"0px"}}></button>  
          <button onClick={()=>handleColorClick(gameColors[1])} style={{width:128, height:128, background: gameColors[1]?.color, border:'1px solid white', borderRadius:"50%", marginBottom:"0px"}}></button>    
          </>
          }
      </footer>
    </div>
    <div className="table">
      <h2 style={{textAlign:"center", padding:"40px"}}>Puntajes más altos</h2>
      <table className="high-scores-table">
        <thead>
          <tr>
            <th>Posición</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((time, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* <button onClick={clearHighScores}>limpiar</button> */}
    </main> 
    </div>
    </div>
  )
}

export default Retocolores
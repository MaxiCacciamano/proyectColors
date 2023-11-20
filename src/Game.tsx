import { useState } from 'react';
import { Difficulty, DifficultyRules } from './Difficulty'; // Asegúrate de importar las reglas de dificultad
import Swal from 'sweetalert2'
import './Game.css'

interface GameProps {
  handlePlayIniciar: (difficulty: Difficulty) => void;
}


function Game({ handlePlayIniciar }: GameProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const startGame = () => {
    if (selectedDifficulty !== null) {
      // Iniciar el juego con la dificultad seleccionada
      const selectedRules = DifficultyRules[selectedDifficulty];
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: (`Comenzando el juego en dificultad: ${selectedRules.name}`),
        showConfirmButton: false,
        timer: 1500
      })
      handlePlayIniciar(selectedDifficulty);
    } else {
      // El usuario no ha seleccionado una dificultad
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, selecciona una dificultad antes de comenzar el juego.'
      })
    }
  };

  return (
    <div className='game'>
      <h1>Selecciona la dificultad</h1>
      <ul>
        {Object.values(Difficulty).map((difficulty) => (
          <li key={difficulty}>
            <label>
              <input
                type="radio"
                name="difficulty"
                value={difficulty}
                checked={selectedDifficulty === difficulty}
                onChange={() => handleDifficultyChange(difficulty)}
              />
              {DifficultyRules[difficulty].name}
            </label>
          </li>
        ))}
      </ul>
      <div className='comenzar'>
      <button onClick={startGame}>Comenzar Juego</button>
      </div>
    </div>
  );
}

export default Game;

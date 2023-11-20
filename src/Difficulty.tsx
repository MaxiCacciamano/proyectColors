// DifficultyLevels.tsx
export enum Difficulty {
    Easy = 'Fácil',
    Medium = 'Medio',
    Hard = 'Difícil',
    VeryHard = 'Muy difícil',
  }
  export const DifficultyRules: Record<Difficulty, { name: string, penalty: number }> = {
    [Difficulty.Easy]: { name: 'Fácil', penalty: 0 },
    [Difficulty.Medium]: { name: 'Medio', penalty: 1 },
    [Difficulty.Hard]: { name: 'Difícil', penalty: 3 },
    [Difficulty.VeryHard]: { name: 'Muy difícil', penalty: 0 }, // Cambiar a 0 para reiniciar el puntaje
  };

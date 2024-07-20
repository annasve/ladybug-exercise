import { useState } from 'react';
import Ladybug from './components/Ladybug';
import { Direction } from './components/Ladybug';

const STEP_SIZE = 25;

interface ladyBugStateIfc {
  posX: number;
  posY: number;
  orientation: Direction;
}

export const App: React.FC = () => {
  const [ladybugState, setLadybugState] = useState<ladyBugStateIfc>({
    posX: 800,
    posY: 300,
    orientation: Direction.right,
  });

  const handleKeyUp = ({ code }: React.KeyboardEvent<HTMLDivElement>) => {
    if (code === 'ArrowUp') {
      setLadybugState((oldLadybugState) => ({
        ...oldLadybugState,
        orientation: Direction.up,
        posX: oldLadybugState.posX - STEP_SIZE,
      }));
    } else if (code === 'ArrowLeft') {
      setLadybugState((oldLadybugState) => ({
        ...oldLadybugState,
        orientation: Direction.left,
        posY: oldLadybugState.posY - STEP_SIZE,
      }));
    } else if (code === 'ArrowRight') {
      setLadybugState((oldLadybugState) => ({
        ...oldLadybugState,
        orientation: Direction.right,
        posY: oldLadybugState.posY + STEP_SIZE,
      }));
    } else if (code === 'ArrowDown') {
      setLadybugState((oldLadybugState) => ({
        ...oldLadybugState,
        orientation: Direction.down,
        posX: oldLadybugState.posX + STEP_SIZE,
      }));
    }
  };

  return (
    <div tabIndex={-1} className="field" onKeyDown={handleKeyUp}>
      <header>Click anywhere to start the game</header>
      <Ladybug
        posX={ladybugState.posX}
        posY={ladybugState.posY}
        orientation={ladybugState.orientation}
      />
    </div>
  );
};

export default App;

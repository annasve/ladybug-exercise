import { useState } from 'react';
import Ladybug from './components/Ladybug';
import { Direction } from './components/Ladybug';

const STEP_SIZE = 25;

interface ladyBugStateIfc {
  posX: number;
  posY: number;
  orientation: Direction;
}

const keyMappings = {
  ArrowUp: { orientation: Direction.up, dx: -STEP_SIZE, dy: 0 },
  ArrowDown: { orientation: Direction.down, dx: +STEP_SIZE, dy: 0 },
  ArrowLeft: { orientation: Direction.left, dx: 0, dy: -STEP_SIZE },
  ArrowRight: { orientation: Direction.right, dx: 0, dy: +STEP_SIZE },
};

export const App: React.FC = () => {
  const [ladybugState, setLadybugState] = useState<ladyBugStateIfc>({
    posX: 100,
    posY: 100,
    orientation: Direction.right,
  });

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Extract code from the event
    const code = event.code;

    // Lookup the mapping based on the key code
    // // But in order for TS to recognize that its value should now sort of belong to keyMappings, type assertion needs to be used
    const mapping = keyMappings[code as keyof typeof keyMappings];

    setLadybugState((oldLadybugState) => ({
      ...oldLadybugState,
      orientation: mapping.orientation,
      posX: oldLadybugState.posX + mapping.dx,
      posY: oldLadybugState.posY + mapping.dy,
    }));
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

import React, { useState } from 'react';
import Graph2D from './components/Graph2D';
import Graph3D from './components/Graph3D';
import BabylonScene from './components/BabylonScene';

const App: React.FC = () => {
  const [is3D, setIs3D] = useState(true);

  const toggleVisualization = () => {
    setIs3D(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={toggleVisualization}>
        {is3D ? 'Switch to 2D' : 'Switch to 3D'}
      </button>
      {is3D ? <Graph3D /> : <Graph2D />}
      {/* <BabylonScene /> */}
    </div>
  );
};

export default App;

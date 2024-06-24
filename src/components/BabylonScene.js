import React, { useEffect, useRef } from 'react';
import { Engine } from '@babylonjs/core/Engines/engine';
import { nodelink3d } from './NodeLink3d'; // Assuming nodelink3d is exported from another file

const BabylonScene = () => {
    const sceneRef = useRef(null);

    useEffect(() => {
        if (sceneRef.current) {
            const engine = new Engine(sceneRef.current, true);
            const scene = nodelink3d(engine);

            engine.runRenderLoop(() => {
                scene.render();
            });

            return () => {
                scene.dispose();
                engine.dispose();
            };
        }
    }, []);

    return <canvas ref={sceneRef} />;
};

export default BabylonScene;

import React, { useEffect, useRef } from 'react';
import NeoVis from 'neovis.js';
import axios from 'axios';

const Graph2D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  let neoVisInstance: NeoVis | null = null;

  useEffect(() => {
    if (!containerRef.current) return;

    const fetchData = async () => {
      try {
        // const response = await axios.get('your-api-endpoint-to-fetch-data-from-neo4j');
        // const { nodes, edges } = response.data; // Assuming your API returns nodes and edges

        const neoVisConfig = {
          containerId: 'neoVisGraph',
          neo4j:{
            serverUrl: 'bolt://demo.neo4jlabs.com',
            serverUser: 'gameofthrones',
            serverPassword: 'gameofthrones',
          },
          initialCypher: 'MATCH (n)-[r]->(m) RETURN n,r,m limit 10',
        };

        neoVisInstance = new NeoVis(neoVisConfig);
        neoVisInstance.render();
        console.log(neoVisInstance);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // return () => {
    //   if (neoVisInstance) {
    //     neoVisInstance.close();
    //     neoVisInstance = null;
    //   }
    // };
  }, []);

  return <div ref={containerRef} id="neoVisGraph" style={{ width: '100%', height: '600px' }} />;
};

export default Graph2D;

import React, { useRef, useEffect, useState } from 'react';
import  ForceGraphVR  from '3d-force-graph-vr';
import neo4j, { Driver, Session } from 'neo4j-driver';

interface Neo4jNode {
  id: string;
  label: string;
  group: number;
}

interface Neo4jLink {
  source: string;
  target: string;
  label: string;
}

const Graph3D = () => {
  const [graphData, setGraphData] = useState<{ nodes: Neo4jNode[]; links: Neo4jLink[] }>({ nodes: [], links: [] });
  const graphRef = useRef<HTMLDivElement | null>(null);
  const graphInstance = useRef<any>(null);

  useEffect(() => {
    const driver: Driver = neo4j.driver('bolt://demo.neo4jlabs.com', neo4j.auth.basic('gameofthrones', 'gameofthrones'));
    const session: Session = driver.session();

    session.run('MATCH (n)-[r]->(m) RETURN n,r,m limit 10')
      .then(result => {
        const nodes: Neo4jNode[] = [];
        const links: Neo4jLink[] = [];

        result.records.forEach(record => {
          nodes.push({ id: record.get('n').identity.toString(), label: record.get('n').labels[0], group: 1 });
          nodes.push({ id: record.get('m').identity.toString(), label: record.get('m').labels[0], group: 2 });
          links.push({
            source: record.get('n').identity.toString(),
            target: record.get('m').identity.toString(),
            label: record.get('r').type,
          });
        });

        setGraphData({ nodes, links });
      })
      .catch(error => {
        console.error('Error connecting to Neo4j:', error);
      })
      .finally(() => {
        session.close();
        driver.close();
      });
  }, []);

    useEffect(() => {
    if (graphRef.current && graphData.nodes.length > 0 && graphData.links.length > 0) {
      graphInstance.current = ForceGraphVR()(graphRef.current)
        .graphData(graphData)
        .backgroundColor('#ffffff') // Set the background color to white
        .nodeAutoColorBy("group")
        .linkColor('black')
        .linkWidth(2);
    }
  }, [graphData]);

  return (
    <div id="3dgraph" >
      <div ref={graphRef} style={{ width: '100%', height: '600px' }} />
    </div>
  );
};

export default Graph3D;

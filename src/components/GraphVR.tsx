import React, { useRef, useEffect, useState } from 'react';
import  ForceGraphVR  from '3d-force-graph-vr';
import result from '../data/sampleData.json';
import * as THREE from 'three';
import './../index.css';

interface GraphNode {
  id: string;
  group: number;
  label: string;
  details : string;
  shape: string;
  color: string;
}

interface GraphLink {
  id: string;
  source: string;
  target: string;
  details: string;
  group: number;
}

const GraphVR = () => {
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({ nodes: [], links: [] });
  const graphRef = useRef<HTMLDivElement | null>(null);
  const graphInstance = useRef<any>(null);

  useEffect(() => {
        const nodes: GraphNode[] = [];
        const links: GraphLink[] = [];

        result.records.forEach((record) => {
          nodes.push({
            id: record.l1.id,
            label: record.l1.labels[0],
            details: record.l1.properties.name,
            shape: 'box',
            color: '#98fb98',
            group: 1
          });
          nodes.push({
            id: record.l2.id,
            label: record.l2.labels[0],
            details: record.l2.properties.name,
            shape: 'cylinder',
            color: '#50c878',
            group: 2
          });
          nodes.push({
            id: record.l3.id,
            label: record.l3.labels[0],
            details: record.l3.properties.name,
            shape: 'cone',
            color: '#088f8f',
            group: 3
          });
          nodes.push({
            id: record.a.id,
            label: record.a.labels[0],
            details: record.a.properties.name,
            shape: 'torusknot',
            color: '#af69ee',
            group: 4
          });

          links.push(
          {
            id: record.h2.id,
            source: record.l1.id,
            target: record.l2.id,
            details: record.h2.type,
            group: 1
          },
          {
            id: record.h3.id,
            source: record.l2.id,
            target: record.l3.id,
            details: record.h3.type,
            group: 2
          },
          {
            id: record.ha.id,
            source: record.l3.id,
            target: record.a.id,
            details: record.ha.type,
            group: 3
          }
          );
        })

        setGraphData({ nodes, links });
  }, []);

    useEffect(() => {
    if (graphRef.current && graphData.nodes.length > 0 && graphData.links.length > 0) {
      graphInstance.current = ForceGraphVR()(graphRef.current)
        .nodeThreeObject(node => createCustomNodeShape(node))
        .graphData(graphData)
        // .backgroundColor('#ffffff') // Set the background color to white
        .nodeAutoColorBy('group')
        .nodeLabel('details')
        .linkAutoColorBy('group')
        .linkLabel('details')
        .linkWidth(2)
        ;
    }
  }, [graphData]);

  return (
    <div id="3dgraph" >
      <div ref={graphRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default GraphVR;

function createCustomNodeShape(node: any){
  let obj;
  switch(node.shape){
    case 'box':
      obj = new THREE.Mesh(
        new THREE.BoxGeometry(10,10,10),
        new THREE.MeshLambertMaterial({color: node.color})
      );
      break;
    case 'cylinder':
      obj = new THREE.Mesh(
        new THREE.CylinderGeometry(5,10,10),
        new THREE.MeshLambertMaterial({color: node.color})
      );
      break;
    case 'cone':
      obj = new THREE.Mesh(
        new THREE.ConeGeometry(7, 10),
        new THREE.MeshLambertMaterial({color: node.color})
      );
      break;
    case 'torus':
      obj = new THREE.Mesh(
        new THREE.TorusGeometry(5, 5, 10, 10),
        new THREE.MeshLambertMaterial({color: node.color})
      );
      break;     
    case 'torusknot':
      obj = new THREE.Mesh(
        new THREE.TorusKnotGeometry(5, 1),
        new THREE.MeshLambertMaterial({color: node.color})
      );
      break;
    case 'dode':
      obj = new THREE.Mesh(
        new THREE.DodecahedronGeometry(10),
        new THREE.MeshLambertMaterial({color: node.color})
      );
      break;
    case 'iso':
      obj = new THREE.Mesh(
        new THREE.IcosahedronGeometry(10),
        new THREE.MeshLambertMaterial({color: node.color})
      );
      break;
    case 'octa':
      obj = new THREE.Mesh(
        new THREE.OctahedronGeometry(10),
        new THREE.MeshLambertMaterial({color: node.color})
      );
      break;
    case 'tetra':
      obj = new THREE.Mesh(
        new THREE.TetrahedronGeometry(10),
        new THREE.MeshLambertMaterial({color: node.color})
      );
      break;
    case 'ring':
      obj = new THREE.Mesh(
        new THREE.RingGeometry(10),
        new THREE.MeshLambertMaterial({color: node.color})
      );
      break;          
    default:
      obj = new THREE.Mesh(
        new THREE.SphereGeometry(7, 32, 32),
        new THREE.MeshLambertMaterial({color:node})
      );
      break;              
  }
  return obj;
}
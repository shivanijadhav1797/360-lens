import React, { useRef, useEffect, useState } from 'react';
import { HemisphericLight, Vector3, Scene, ArcRotateCamera, StandardMaterial, Color3, Color4} from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu'
import * as d3 from 'd3';
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceCollide } from 'd3-force-3d';

interface Node {
    name: string;
    group: number;
    index: number;
  }
  
  interface Link {
    source: number;
    target: number;
    value: number;
  }
  
  interface GraphData {
    nodes: Node[];
    links: Link[];
  }
  
  const NodeLink3d: React.FC<{ data: GraphData }> = ({ data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!data || !data.nodes || !data.links) {
        console.error('Invalid graph data');
        return;
      }
  
      const maxNodeIndex = data.nodes.length - 1;
      const invalidLinks = data.links.filter(link => link.source > maxNodeIndex || link.target > maxNodeIndex);
      if (invalidLinks.length > 0) {
        console.error('Invalid links found:', invalidLinks);
        return;
      }
    

    const simulation = d3.forceSimulation(data.nodes)
    //   .force('link', d3.forceLink<Node, Link>(data.links).id(d => String(d.index)))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(400, 400));

    // simulation.on('tick', () => {
    //   if (!context) return;
    //   context.clearRect(0, 0, canvas.width, canvas.height);
    //   context.beginPath();
    //   data.links.forEach(link => {
    //     context.moveTo(link.source, link.target);
    //     context.lineTo(link.source, link.target);
    //   });
    //   context.stroke();

    //   context.beginPath();
    //   data.nodes.forEach(node => {
    //     context.moveTo(node.index + 3, node.index);
    //     context.arc(node.index, node.index, 3, 0, 2 * Math.PI);
    //   });
    //   context.fill();
    // });

    return () => {
      simulation.stop();
    };
  }, [data]);
  
    return <canvas ref={canvasRef} width={800} height={800} />;
  };
  
  export default NodeLink3d;
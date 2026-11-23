import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Box, Layers, Maximize2 } from 'lucide-react';

export default function Hero3DViewer({ selectedColor, onModelCalculated, activeSampleId, onSelectSample }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const meshGroupRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [layerLinesEffect, setLayerLinesEffect] = useState(false);
  const [modelStats, setModelStats] = useState({
    name: 'Planetary Gear Transmission',
    code: 'SPECIMEN // 01',
    dimensions: { x: 74, y: 74, z: 24 },
    volumeCm3: 41,
    estimatedWeight: 50.8,
    estimatedTimeMin: 90
  });

  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  const createSampleGeometry = (type) => {
    switch (type) {
      case 'gear': {
        const group = new THREE.Group();
        const coreGeo = new THREE.CylinderGeometry(14, 14, 18, 32);
        const rimGeo = new THREE.TorusGeometry(32, 6, 16, 48);
        const coreMesh = new THREE.Mesh(coreGeo);
        const rimMesh = new THREE.Mesh(rimGeo);
        rimMesh.rotation.x = Math.PI / 2;
        group.add(coreMesh);
        group.add(rimMesh);

        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const toothGeo = new THREE.BoxGeometry(6, 12, 10);
          const tooth = new THREE.Mesh(toothGeo);
          tooth.position.set(Math.cos(angle) * 36, 0, Math.sin(angle) * 36);
          tooth.rotation.y = -angle;
          group.add(tooth);
        }
        return group;
      }
      case 'vase': {
        const group = new THREE.Group();
        const vaseGeo = new THREE.CylinderGeometry(20, 12, 55, 12, 16);
        const pos = vaseGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const y = pos.getY(i);
          const angle = (y / 55) * Math.PI * 1.5;
          const x = pos.getX(i);
          const z = pos.getZ(i);
          pos.setX(i, x * Math.cos(angle) - z * Math.sin(angle));
          pos.setZ(i, x * Math.sin(angle) + z * Math.cos(angle));
        }
        vaseGeo.computeVertexNormals();
        const vaseMesh = new THREE.Mesh(vaseGeo);
        vaseMesh.position.y = 20;
        group.add(vaseMesh);
        return group;
      }
      case 'case': {
        const group = new THREE.Group();
        const baseGeo = new THREE.BoxGeometry(50, 22, 65);
        const baseMesh = new THREE.Mesh(baseGeo);
        for (let i = -15; i <= 15; i += 10) {
          const slotGeo = new THREE.BoxGeometry(2, 3, 40);
          const slot = new THREE.Mesh(slotGeo);
          slot.position.set(i, 11, 0);
          group.add(slot);
        }
        group.add(baseMesh);
        return group;
      }
      case 'dragon':
      default: {
        const group = new THREE.Group();
        const headGeo = new THREE.ConeGeometry(15, 30, 8);
        headGeo.rotateX(Math.PI / 2);
        const headMesh = new THREE.Mesh(headGeo);
        headMesh.position.set(0, 10, 25);
        group.add(headMesh);

        for (let i = 0; i < 5; i++) {
          const segGeo = new THREE.DodecahedronGeometry(12 - i * 1.5);
          const seg = new THREE.Mesh(segGeo);
          seg.position.set(0, 8, 10 - i * 14);
          group.add(seg);
        }
        return group;
      }
    }
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(90, 85, 120);
    camera.lookAt(0, 10, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Sculptural Gallery Lighting
    const ambientLight = new THREE.AmbientLight(0xf5f3ed, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(80, 130, 90);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xEAE7DE, 1.2);
    rimLight.position.set(-80, 60, -80);
    scene.add(rimLight);

    // Architectural Exhibition Plinth (Bambu 256mm³ representation)
    const bedGeo = new THREE.BoxGeometry(112, 2.5, 112);
    const bedMat = new THREE.MeshStandardMaterial({
      color: 0xEEEBE2,
      roughness: 0.5,
      metalness: 0.1
    });
    const bedMesh = new THREE.Mesh(bedGeo, bedMat);
    bedMesh.position.y = -2;
    bedMesh.receiveShadow = true;
    scene.add(bedMesh);

    // Delicate measurement grid lines
    const gridHelper = new THREE.GridHelper(112, 14, 0x121212, 0xD4CFBF);
    gridHelper.position.y = 0.05;
    scene.add(gridHelper);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    meshGroupRef.current = modelGroup;

    loadSampleModel(activeSampleId || 'gear');

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      if (autoRotate && meshGroupRef.current) {
        meshGroupRef.current.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !meshGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, meshGroupRef.current.rotation.x + deltaY * 0.008));
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!meshGroupRef.current) return;
    const colorHex = selectedColor?.hex || '#1C1C1E';

    meshGroupRef.current.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(colorHex),
          roughness: layerLinesEffect ? 0.45 : 0.28,
          metalness: 0.1,
          wireframe: wireframe,
        });
      }
    });
  }, [selectedColor, wireframe, layerLinesEffect]);

  const loadSampleModel = (type) => {
    if (!meshGroupRef.current) return;

    while (meshGroupRef.current.children.length > 0) {
      meshGroupRef.current.remove(meshGroupRef.current.children[0]);
    }

    const sampleGroup = createSampleGeometry(type);
    const colorHex = selectedColor?.hex || '#1C1C1E';

    sampleGroup.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(colorHex),
          roughness: 0.28,
          metalness: 0.1,
          wireframe: wireframe
        });
        child.castShadow = true;
      }
    });

    sampleGroup.position.y = 12;
    meshGroupRef.current.add(sampleGroup);

    let stats;
    if (type === 'gear') {
      stats = { name: 'Planetary Gear Transmission', code: 'SPECIMEN // 01', dimensions: { x: 74, y: 74, z: 24 }, volumeCm3: 41, estimatedWeight: 50.8, estimatedTimeMin: 90 };
    } else if (type === 'vase') {
      stats = { name: 'Algorithmic Voronoi Vessel', code: 'SPECIMEN // 02', dimensions: { x: 55, y: 55, z: 95 }, volumeCm3: 56, estimatedWeight: 69.4, estimatedTimeMin: 145 };
    } else if (type === 'case') {
      stats = { name: 'DIN Hardware Compute Enclosure', code: 'SPECIMEN // 03', dimensions: { x: 65, y: 50, z: 26 }, volumeCm3: 38, estimatedWeight: 47.1, estimatedTimeMin: 75 };
    } else {
      stats = { name: 'Anatomical Segmented Serpent', code: 'SPECIMEN // 04', dimensions: { x: 120, y: 40, z: 35 }, volumeCm3: 65, estimatedWeight: 80.6, estimatedTimeMin: 180 };
    }

    setModelStats(stats);
    if (onModelCalculated) {
      onModelCalculated(stats);
    }
  };

  const handleSampleClick = (sampleId) => {
    if (onSelectSample) onSelectSample(sampleId);
    loadSampleModel(sampleId);
  };

  return (
    <div className="relative w-full h-[520px] md:h-[580px] bg-[#EFECE4] hairline-border overflow-hidden flex flex-col justify-between">
      {/* Reticle Corner Crosshairs */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-[#121212]/40 select-none">+ 0.00, 256.00</div>
      <div className="absolute top-3 right-3 text-[10px] font-mono text-[#121212]/40 select-none">+ 256.00, 256.00</div>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#121212]/40 select-none">+ 0.00, 0.00</div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#121212]/40 select-none">+ 256.00, 0.00</div>

      {/* Top Header Bar */}
      <div className="relative z-10 p-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E63920] block">
            {modelStats.code}
          </span>
          <h2 className="font-syne font-bold text-lg md:text-xl text-[#121212]">
            {modelStats.name}
          </h2>
        </div>

        {/* Technical Viewport Controls */}
        <div className="flex items-center gap-1 bg-[#F6F5F1] p-1 hairline-border pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors ${
              autoRotate ? 'bg-[#121212] text-[#F6F5F1]' : 'text-[#121212] hover:bg-black/5'
            }`}
          >
            Orbit
          </button>
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors ${
              wireframe ? 'bg-[#121212] text-[#F6F5F1]' : 'text-[#121212] hover:bg-black/5'
            }`}
          >
            Mesh
          </button>
          <button
            onClick={() => setLayerLinesEffect(!layerLinesEffect)}
            className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors ${
              layerLinesEffect ? 'bg-[#121212] text-[#F6F5F1]' : 'text-[#121212] hover:bg-black/5'
            }`}
          >
            0.12mm Pitch
          </button>
        </div>
      </div>

      {/* 3D Canvas Element */}
      <div 
        ref={mountRef} 
        className="w-full flex-1 cursor-grab active:cursor-grabbing relative"
        title="Orbit 3D geometry"
      />

      {/* Bottom Technical Spec Footer */}
      <div className="relative z-10 p-6 pt-0 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
        {/* Specimen Index Switcher */}
        <div className="flex items-center gap-1 pointer-events-auto bg-[#F6F5F1] p-1 hairline-border">
          {[
            { id: 'gear', label: '01 / Gear' },
            { id: 'vase', label: '02 / Vessel' },
            { id: 'case', label: '03 / Enclosure' },
            { id: 'dragon', label: '04 / Serpent' }
          ].map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSampleClick(sample.id)}
              className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all ${
                activeSampleId === sample.id
                  ? 'bg-[#121212] text-white font-medium'
                  : 'text-[#121212]/70 hover:text-black hover:bg-black/5'
              }`}
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Architectural Dimension Placard */}
        <div className="bg-[#F6F5F1] p-3 hairline-border flex items-center gap-6 font-mono text-[11px] pointer-events-auto">
          <div>
            <span className="text-[#6E6B65] text-[9px] block uppercase">Bounding Envelope</span>
            <span className="font-semibold text-[#121212]">{modelStats.dimensions.x} × {modelStats.dimensions.y} × {modelStats.dimensions.z} mm</span>
          </div>
          <div className="h-6 w-px bg-black/10"></div>
          <div>
            <span className="text-[#6E6B65] text-[9px] block uppercase">Net Specimen Mass</span>
            <span className="font-semibold text-[#121212]">{modelStats.estimatedWeight}g</span>
          </div>
          <div className="h-6 w-px bg-black/10"></div>
          <div>
            <span className="text-[#6E6B65] text-[9px] block uppercase">Bambu Velocity</span>
            <span className="font-semibold text-[#E63920]">~{modelStats.estimatedTimeMin} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}

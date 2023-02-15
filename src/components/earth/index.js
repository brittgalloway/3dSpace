import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Bounds, useBounds } from "@react-three/drei";
import * as THREE from 'three';
import EarthClouds from "../../assets/8k_earth_clouds.jpg";
import EarthNormal from "../../assets/8k_earth_normal_map.jpg";
import EarthSpecular from "../../assets/8k_earth_specular_map.jpg";
import EarthDayMap from "../../assets/8k_earth_daymap.jpg";
import { TextureLoader } from "three";


export function Earth() {

    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormal, EarthSpecular, EarthClouds ]);
    
    const earthRef = useRef();
    const cloudRef = useRef();
    const sphereArgs = [1, 32, 32];
    const planetPostion = [0,0,0];

    const mercuryRef = useRef();
    const venusRef = useRef();
    const marsRef = useRef();
    const jupiterRef = useRef();
    const saturnRef = useRef();
    const uranusRef = useRef();
    const neptuneRef = useRef();
    const plutoRef = useRef();

    useFrame(({ clock }) => {
        const elaspedTime = clock.getElapsedTime();

        earthRef.current.rotation.y = elaspedTime / 6;
        earthRef.current.position.x = Math.cos(elaspedTime)*150;
        earthRef.current.position.z = Math.sin(elaspedTime)*150;

        cloudRef.current.rotation.y = elaspedTime / 6;
        cloudRef.current.position.x = Math.cos(elaspedTime)*150;
        cloudRef.current.position.z = Math.sin(elaspedTime)*150;

        mercuryRef.current.position.x = Math.cos(elaspedTime)*35; 
        mercuryRef.current.position.z = Math.sin(elaspedTime)*35;

        venusRef.current.position.x = Math.cos(elaspedTime)*100; 
        venusRef.current.position.z = Math.sin(elaspedTime)*100; 

        marsRef.current.position.x = Math.cos(elaspedTime)*210;
        marsRef.current.position.z = Math.sin(elaspedTime)*210;
        
        jupiterRef.current.position.x = Math.cos(elaspedTime)*300;
        jupiterRef.current.position.z = Math.sin(elaspedTime)*300;
        
        saturnRef.current.position.x = Math.cos(elaspedTime)*450;
        saturnRef.current.position.z = Math.sin(elaspedTime)*450;
        
        uranusRef.current.position.x = Math.cos(elaspedTime)*600;
        uranusRef.current.position.z = Math.sin(elaspedTime)*600;
        
        neptuneRef.current.position.x = Math.cos(elaspedTime)*800;
        neptuneRef.current.position.z = Math.sin(elaspedTime)*800;
        
        plutoRef.current.position.x = Math.cos(elaspedTime)*1000;
        plutoRef.current.position.z = Math.sin(elaspedTime)*1000;
        
    })

    return <>
        <ambientLight intensity={1}/>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
        <Bounds fit observe margin={1.2}>
            <SelectToZoom>
                {/* sun */}
                <mesh scale={[15,15,15]}>
                    <pointLight color='#f6f3ea' intensity={1.2}/>
                    <sphereGeometry arg={[100, 60, 60]}/>
                    <meshStandardMaterial color='#f9d71c' emissive={0xf9d71c} emissiveIntensity={2} metalness={0.4} roughness={0.7}/>
                </mesh>
                {/* END sun */}
                {/* MERCURY */}
                <mesh ref={mercuryRef}scale={[0.3,0.3,0.3]} position={planetPostion} rotation={[0,0,30]}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#999999' metalness={0.4} roughness={1}/>
                </mesh>
                {/* END MERCURY */}
                {/* VENUS */}
                <mesh ref={venusRef} scale={[0.9,0.9,0.9]} position={planetPostion}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#df7b12' metalness={0.4} roughness={0.5}/>
                </mesh>
                {/* END VENUS */}
                {/* EARTH */}
                <mesh ref={cloudRef} position={planetPostion}>
                    <sphereGeometry arg={[1.05, 32, 32]}/> 
                    <meshPhongMaterial specularMap={specularMap}/>
                    <meshStandardMaterial map={cloudsMap} opacity={0.4} depthWrite={true} transparent={true} side={THREE.DoubleSide}/>
                </mesh>
                <mesh ref={earthRef} position={planetPostion} rotation={[0.5, 0, 0]}>
                    <sphereGeometry arg={sphereArgs}/> 
                    <meshPhongMaterial specularMap={specularMap}/>
                    <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.7}/>
                </mesh>
                {/* END EARTH */}
                {/* MARS */}
                <mesh ref={marsRef}scale={[0.7,0.7,0.7]} position={planetPostion}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#990000' metalness={0.4} roughness={0.7}/>
                </mesh>
                {/* END MARS */}
                {/* JUPITER */}
                <mesh ref={jupiterRef}scale={[8,8,8]} position={planetPostion} >
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#722e0a' metalness={0.6} roughness={0.7} />
                </mesh>
                {/* END JUPITER */}
                {/* SATURN */}
                <mesh ref={saturnRef} scale={[5,5,5]} position={planetPostion}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#630f38' metalness={0.6} roughness={0.7}/>
                </mesh>
                {/* END SATURN */}
                {/* URANUS */}
                <mesh ref={uranusRef} scale={[3,3,3]} position={planetPostion}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#45818e' metalness={0.7} roughness={0.4}/>
                </mesh>
                {/* END URANUS */}
                {/* NEPTUNE */}
                <mesh ref={neptuneRef} scale={[2.7,2.7,2.7]} position={planetPostion} >
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#0b5394' metalness={0.6} roughness={0.7}/>
                </mesh>
                {/* END NEPTUNE */}
                {/* PLUTO */}
                <mesh ref={plutoRef} scale={[1,1,1]} position={planetPostion}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#f1c232' metalness={0.4} roughness={0.7}/>
                </mesh>
                {/* END PLUTO */}
            </SelectToZoom>
        </Bounds>
    </>;
}

// https://codesandbox.io/s/bounds-and-makedefault-rz2g0?file=/src/App.js
// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
function SelectToZoom({ children }) {
    const api = useBounds()
    return (
      <group onClick={(e) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())} 
        onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
            {children}
      </group>
    )
  }
import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Bounds, useBounds } from "@react-three/drei";
import * as THREE from 'three';
import EarthClouds from "../../assets/8k_earth_clouds.jpg";
import EarthNormal from "../../assets/8k_earth_normal_map.jpg";
import EarthSpecular from "../../assets/8k_earth_specular_map.jpg";
import EarthDayMap from "../../assets/8k_earth_daymap.jpg";
import { TextureLoader } from "three";

// https://codesandbox.io/s/bounds-and-makedefault-rz2g0?file=/src/App.js
// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
function SelectToZoom({ children }) {
    const api = useBounds()
    return (
      <group onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
        {children}
      </group>
    )
  }

export function Earth(props) {

    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormal, EarthSpecular, EarthClouds ]);
    
    const earthRef = useRef();
    const cloudRef = useRef();
    const sphereArgs = [1, 32, 32];
    const earthPostion = [0,0,150];

    const mercuryRef = useRef();

    useFrame(({ clock }) => {
        const elaspedTime = clock.getElapsedTime();

        earthRef.current.rotation.y = elaspedTime / 6;
        cloudRef.current.rotation.y = elaspedTime / 6;
        // mercuryRef.rotateOnAxis;
    })

    return <>
        <ambientLight intensity={1}/>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
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
                <mesh ref={mercuryRef} scale={[0.3,0.3,0.3]} position={[0,0,35]} offset={[0,0,35]} rotation={[0,0,30]}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#999999' metalness={0.4} roughness={1}/>
                </mesh>
                {/* END MERCURY */}
                {/* VENUS */}
                <mesh scale={[0.9,0.9,0.9]} position={[0,0,100]}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#df7b12' metalness={0.4} roughness={0.5}/>
                </mesh>
                {/* END VENUS */}
                {/* EARTH */}
                <mesh ref={cloudRef} position={earthPostion}>
                    <sphereGeometry arg={[1.05, 32, 32]}/> //default numbers
                    <meshPhongMaterial specularMap={specularMap}/>
                    <meshStandardMaterial map={cloudsMap} opacity={0.4} depthWrite={true} transparent={true} side={THREE.DoubleSide}/>
                </mesh>
                <mesh ref={earthRef} position={earthPostion} rotation={[0.5, 0, 0]}>
                    <sphereGeometry arg={sphereArgs}/> //default numbers
                    <meshPhongMaterial specularMap={specularMap}/>
                    <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.7}/>
                </mesh>
                {/* END EARTH */}
                {/* MARS */}
                <mesh scale={[0.7,0.7,0.7]} position={[0,0,210]}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#990000' metalness={0.4} roughness={0.7}/>
                </mesh>
                {/* END MARS */}
                {/* JUPITER */}
                <mesh scale={[8,8,8]} position={[0,0,300]}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#722e0a' metalness={0.6} roughness={0.7}/>
                </mesh>
                {/* END JUPITER */}
                {/* SATURN */}
                <mesh scale={[5,5,5]} position={[0,0,450]}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#630f38' metalness={0.6} roughness={0.7}/>
                </mesh>
                {/* END SATURN */}
                {/* URANUS */}
                <mesh scale={[3,3,3]} position={[0,0,600]}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#45818e' metalness={0.7} roughness={0.4}/>
                </mesh>
                {/* END URANUS */}
                {/* NEPTUNE */}
                <mesh scale={[2.7,2.7,2.7]} position={[0,0,800]}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#0b5394' metalness={0.6} roughness={0.7}/>
                </mesh>
                {/* END NEPTUNE */}
                {/* PLUTO */}
                <mesh scale={[1,1,1]} position={[0,0,1000]}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#f1c232' metalness={0.4} roughness={0.7}/>
                </mesh>
                {/* END PLUTO */}
            </SelectToZoom>
        </Bounds>
    </>;
}
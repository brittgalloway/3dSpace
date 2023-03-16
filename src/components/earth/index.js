import React, { useRef, useState} from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Bounds, useBounds, Text, Billboard, Html } from "@react-three/drei";
import * as THREE from 'three';
import EarthClouds from "../../assets/8k_earth_clouds.jpg";
import EarthNormal from "../../assets/8k_earth_normal_map.jpg";
import EarthSpecular from "../../assets/8k_earth_specular_map.jpg";
import EarthDayMap from "../../assets/8k_earth_daymap.jpg";
import { TextureLoader } from "three";


export function Earth() {

    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormal, EarthSpecular, EarthClouds ]);
    const [hidden, set] = useState(true);
    const sphereArgs = [1, 32, 32];
    const planetPostion = [0,0,0];
    const earthRef = useRef();
    const cloudRef = useRef();

    const mercuryRef = useRef();
    const venusRef = useRef();
    const marsRef = useRef();
    const jupiterRef = useRef();
    const saturnRef = useRef();
    const saturnRingRef = useRef();
    const uranusRef = useRef();
    const neptuneRef = useRef();
    const plutoRef = useRef();

    const handleText = () => {
        set(hidden ? false : true);
        return hidden;
    }

// https://codesandbox.io/s/bounds-and-makedefault-rz2g0?file=/src/App.js
// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds

//Sun Only
function SelectToZoom({ children }) {
    const api = useBounds()
    return (
      <group onClick={(event) => {
 
        event.stopPropagation(); 
        event.delta <= 2 && api.refresh(event.object).fit();

        }} >
            {children}
      </group>
    )
}
//For moving objects
function SelectToFollow({ children }) {
    const api = useBounds()
    return (
      <group onClick={(event) => {
 
        event.stopPropagation(); 
        event.delta <= 2 && api.refresh(event.object).fit();
        console.log('name',event.object.name);
        const planetName = event.object.name;
        const planetPos = event.object.position;
        
        const planetData = {
            postionX : planetPos.x,
            postionZ : planetPos.z
        }
        console.log(planetData);

        }} >
            {children}
      </group>
    )
}
//https://jsfiddle.net/a2nhdqsg/
useFrame(({ clock }) => {
    const elaspedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elaspedTime / 6;
    earthRef.current.position.x = Math.cos(elaspedTime * (100/ 1000))*150;
    earthRef.current.position.z = Math.sin(elaspedTime * (100/ 1000))*150;

    cloudRef.current.rotation.y = elaspedTime / 6;
    cloudRef.current.position.x = Math.cos(elaspedTime * (100/ 1000))*150;
    cloudRef.current.position.z = Math.sin(elaspedTime * (100/ 1000))*150;

    mercuryRef.current.position.x = Math.cos(elaspedTime * (760/ 1000))*35; 
    mercuryRef.current.position.z = Math.sin(elaspedTime * (760/ 1000))*35;

    venusRef.current.position.x = Math.cos(elaspedTime * (388/ 1000))*100; 
    venusRef.current.position.z = Math.sin(elaspedTime * (388/ 1000))*100; 

    marsRef.current.position.x = Math.cos(elaspedTime * (88/ 1000))*210;
    marsRef.current.position.z = Math.sin(elaspedTime * (88/ 1000))*210;

    jupiterRef.current.position.x = Math.cos(elaspedTime * (75/ 1000))*300;
    jupiterRef.current.position.z = Math.sin(elaspedTime * (75/ 1000))*300;
    
    saturnRef.current.position.x = Math.cos(elaspedTime * (51/ 1000))*450;
    saturnRef.current.position.z = Math.sin(elaspedTime * (51/ 1000))*450;
    saturnRingRef.current.position.x = Math.cos(elaspedTime * (51/ 1000))*450;
    saturnRingRef.current.position.z = Math.sin(elaspedTime * (51/ 1000))*450;
    
    uranusRef.current.position.x = Math.cos(elaspedTime * (23/ 1000))*600;
    uranusRef.current.position.z = Math.sin(elaspedTime * (23/ 1000))*600;
    
    neptuneRef.current.position.x = Math.cos(elaspedTime * (12/ 1000))*800;
    neptuneRef.current.position.z = Math.sin(elaspedTime * (12/ 1000))*800;
    
    plutoRef.current.position.x = Math.cos(elaspedTime * (2/ 1000))*1000;
    plutoRef.current.position.z = Math.sin(elaspedTime * (2/ 1000))*1000;
    
})
    return <>
        <ambientLight intensity={1}/>
        {/* <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} /> */}
        <OrbitControls  makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75}/>
        
        <Bounds fit observe margin={1.2}>
            <SelectToZoom>
                {/* sun */}
                <mesh name={'sun'} scale={[15,15,15]} onClick={() => { handleText() }}>
                    <pointLight color='#f6f3ea' intensity={1.2}/>
                    <sphereGeometry arg={[100, 60, 60]}/>
                    <meshStandardMaterial color='#f9d71c' emissive={0xf9d71c} emissiveIntensity={2} metalness={0.4} roughness={0.7}/>
                
                </mesh>
                <Html
                    as='article'
                    wrapperClass='sunFacts'
                    onOcclude={set}
                    style={{
                        width: 350,
                        transition: 'all 0.5s',
                        opacity: hidden ? 0 : 1,
                        transform: `scale(${hidden ? 0.5 : 1}) translateX(-50%) translateY(-50%)`
                    }}
                >
                    <h1>Sun</h1>
                    <p>Type: Yellow Dwarf Star </p>
                    <p>Radius: ~695,000 kilometers</p>
                    <p>Main Gases: hydrogen and helium</p>
                </Html>
                {/* END sun */}
            </SelectToZoom>
        </Bounds>
                {/* MERCURY */}
                <mesh name={'mercury'} ref={mercuryRef} scale={[0.3,0.3,0.3]} position={planetPostion} rotation={[0,0,30]} onClick={() => { handleText() }} >
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#999999' metalness={0.4} roughness={1}/>
                </mesh>
                {/* END MERCURY */}
                {/* VENUS */}
                <mesh name={'venus'} ref={venusRef} scale={[0.9,0.9,0.9]} position={planetPostion} onClick={() => { handleText() }}>
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
                <mesh name={'earth'} ref={earthRef} position={planetPostion} rotation={[0.5, 0, 0]} onClick={() => { handleText() }}>
                    <sphereGeometry arg={sphereArgs}/> 
                    <meshPhongMaterial specularMap={specularMap}/>
                    <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.7}/>
                </mesh>
                {/* END EARTH */}
                {/* MARS */}
                <mesh name={'mars'} ref={marsRef}scale={[0.7,0.7,0.7]} position={planetPostion} onClick={() => { handleText() }}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#990000' metalness={0.4} roughness={0.7}/>
                </mesh>
                {/* END MARS */}
                {/* JUPITER */}
                <mesh name={'jupiterRef'} scale={[8,8,8]} position={planetPostion} ref={jupiterRef} onClick={() => { handleText() }}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#722e0a' metalness={0.6} roughness={0.7} />
                    
                </mesh>
                {/* END JUPITER */}
                {/* SATURN */}
                <mesh name={'saturn'} ref={saturnRef} scale={[5,5,5]} position={planetPostion} onClick={() => { handleText() }}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#630f38' metalness={0.6} roughness={0.7}/>
                </mesh>
                <mesh name={'saturnRings'} ref={saturnRingRef} scale={[3,3,3]} rotation={[45, 45, 45]} position={planetPostion}>
                    <torusGeometry args={[6, 2, 2]} />
                    <meshStandardMaterial color='#630f38' metalness={0.6} roughness={0.7}/>
                </mesh>
                {/* END SATURN */}
                {/* URANUS */}
                <mesh name={'uranus'} ref={uranusRef} scale={[3,3,3]} position={planetPostion} onClick={() => { handleText() }}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#45818e' metalness={0.7} roughness={0.4}/>
                    <Billboard>
                        <Text color='white'  fontSize='7' anchorX="center" anchorY="middle" position={[0,3,0]}>
                            Uranus
                        </Text>
                    </Billboard>
                </mesh>
                {/* END URANUS */}
                {/* NEPTUNE */}
                <mesh name={'neptune'} ref={neptuneRef} scale={[2.7,2.7,2.7]} position={planetPostion} onClick={() => { handleText() }} >
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#0b5394' metalness={0.6} roughness={0.7}/>
                    <Billboard>
                        <Text color='white'  fontSize='10' anchorX="center" anchorY="middle" position={[0,3,0]}>
                            Neptune
                        </Text>
                    </Billboard>
                </mesh>
                {/* END NEPTUNE */}
                {/* PLUTO */}
                <mesh name={'pluto'} ref={plutoRef} scale={[1,1,1]} position={planetPostion} onClick={() => { handleText() }}>
                    <sphereGeometry arg={sphereArgs}/>
                    <meshStandardMaterial color='#3c1e55' metalness={0.4} roughness={0.7}/>
                    <Billboard>
                        <Text color='white'  fontSize='20' anchorX="center" anchorY="middle" position={[0,3,0]}>
                            Pluto
                        </Text>
                    </Billboard>
                </mesh>
                {/* END PLUTO */}
            
    </>;
}


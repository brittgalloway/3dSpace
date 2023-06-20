import React, { useRef, useState} from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Bounds, useBounds, Text, Billboard, Html } from "@react-three/drei";
import * as THREE from 'three';
import Planet from "./planet";
import EarthClouds from "../assets/8k_earth_clouds.jpg";
import EarthNormal from "../assets/8k_earth_normal_map.jpg";
import EarthSpecular from "../assets/8k_earth_specular_map.jpg";
import EarthDayMap from "../assets/8k_earth_daymap.jpg";
import { TextureLoader } from "three";


const IndexPage = () => {

    const [specularMap, cloudsMap] = useLoader(TextureLoader, [EarthSpecular, EarthClouds ]);
    const [hidden, set] = useState(true);
    const planetPostion = [0,0,0];
    const cloudRef = useRef();

    const sunRef = useRef();

    const saturnRingRef = useRef();


    const handleText = () => {
        // set(hidden ? false : true);
      
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

    cloudRef.current.rotation.y = elaspedTime / 6;
    cloudRef.current.position.x = Math.cos(elaspedTime * (100/ 1000))*150;
    cloudRef.current.position.z = Math.sin(elaspedTime * (100/ 1000))*150;

    saturnRingRef.current.position.x = Math.cos(elaspedTime * (51/ 1000))*450;
    saturnRingRef.current.position.z = Math.sin(elaspedTime * (51/ 1000))*450;   
})
    return (<>
        <ambientLight intensity={1}/>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75}/>
        
        <Bounds fit observe margin={1.2}>
            <SelectToZoom>
                {/* sun */}
                <mesh name={'sun'} ref={sunRef} scale={[15,15,15]} onClick={() => { set(hidden ? false : true); sunRef.current = hidden }}>
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
                <Planet
                    name={'mercury'}
                    scale={[0.3,0.3,0.3]}
                    rotation={[0,0,30]}
                    position1={760}
                    position2={35}
                    meshColor={'#999999'}
                    meshRoughness={1}
                    wrapperClass={'mercuryFacts'}
                    majorMoons={0}
                    moons={0}
                    realRotation={'59 days'}
                    revolutions={'88 days'}
                    fact={'Mercury has no atmosphere.'}
                />
                {/* END MERCURY */}
                {/* VENUS */}
                <Planet
                    name={'venus'}
                    scale={[0.9,0.9,0.9]}
                    rotation={[0,0,30]}
                    position1={388}
                    position2={100}
                    meshColor={'#df7b12'}
                    meshRoughness={0.5}
                    wrapperClass={'venusFacts'}
                    majorMoons={0}
                    moons={0}
                    realRotation={'116 days'}
                    revolutions={'225 days'}
                    fact={'Venus rotates on its axis backward.'}
                />
                {/* END VENUS */}
                {/* EARTH */}
                <mesh ref={cloudRef} position={planetPostion}>
                    <sphereGeometry arg={[1.05, 32, 32]}/> 
                    <meshPhongMaterial specularMap={specularMap}/>
                    <meshStandardMaterial map={cloudsMap} opacity={0.4} depthWrite={true} transparent={true} side={THREE.DoubleSide}/>
                </mesh>
                <Planet
                    name={'earth'}
                    scale={[1,1,1]}
                    rotation={[0.5, 0, 0]}
                    position1={100}
                    position2={150}
                    meshColor={'#3467eb'}
                    meshRoughness={0.7}
                    wrapperClass={'earthFacts'}
                    majorMoons={1}
                    moons={1}
                    realRotation={'24 hours'}
                    revolutions={'365 days'}
                    fact={'Earth is the only known planet with intelligent life.'}
                />
                {/* END EARTH */}
                {/* MARS */}
                <Planet
                    name={'mars'}
                    scale={[0.7,0.7,0.7]}
                    rotation={[0, 0, 0]}
                    position1={88}
                    position2={210}
                    meshColor={'#990000'}
                    meshRoughness={0.7}
                    wrapperClass={'marsFacts'}
                    majorMoons={2}
                    moons={2}
                    realRotation={'24.6 hours'}
                    revolutions={'687 days'}
                    fact={'Mars has ice, and is thought to have been a living planet similar to Earth.'}
                />
                {/* END MARS */}
                {/* JUPITER */}
                <Planet
                    name={'jupiter'}
                    scale={[8,8,8]}
                    rotation={[0, 0, 0]}
                    position1={75}
                    position2={300}
                    meshColor={'#722e0a'}
                    meshRoughness={0.7}
                    wrapperClass={'jupiterFacts'}
                    majorMoons={4}
                    moons={79}
                    realRotation={'10h 55m'}
                    revolutions={'11.86 years'}
                    fact={`Figuring out Jupiter's rotation is complicated because it rotates at different speeds at different denisities. The 10 hours is the speed of the core.`}
                /> 
                {/* END JUPITER */}
                {/* SATURN */}
                <Planet
                    name={'saturn'}
                    scale={[5,5,5]}
                    rotation={[0, 0, 0]}
                    position1={51}
                    position2={450}
                    meshColor={'#630f38'}
                    meshRoughness={0.7}
                    wrapperClass={'saturnFacts'}
                    majorMoons={2}
                    moons={82}
                    realRotation={'10h 40m'}
                    revolutions={'29.46 years'}
                    fact={`Saturn has thousands of rings. It is made of asteriods, dust, and other space matter.`}
                />
                <mesh name={'saturnRings'} ref={saturnRingRef} scale={[3,3,3]} rotation={[45, 45, 45]} position={planetPostion}>
                    <torusGeometry args={[6, 2, 2]} />
                    <meshStandardMaterial color='#630f38' metalness={0.6} roughness={0.7}/>
                </mesh>
                {/* END SATURN */}
                {/* URANUS */}
                    <Billboard>
                        <Text color='white'  fontSize='7' anchorX="center" anchorY="middle" position={[0,3,0]}>
                            Uranus
                        </Text>
                    </Billboard>
                        <Planet
                            name={'uranus'}
                            scale={[3,3,3]}
                            rotation={[0, 0, 0]}
                            position1={23}
                            position2={600}
                            meshColor={'#45818e'}
                            meshRoughness={0.4}
                            wrapperClass={'uranusFacts'}
                            majorMoons={1}
                            moons={27}
                            realRotation={'17h 14m'}
                            revolutions={'84 years'}
                            fact={`Uranus' axis is at 98&#176; and rotates clockwise while every other planet (except Venus) rotates counter-clockwise.`}
                        />
              
                {/* END URANUS */}
                {/* NEPTUNE */}
                    <Billboard>
                        <Text color='white'  fontSize='10' anchorX="center" anchorY="middle" position={[0,3,0]}>
                            Neptune
                        </Text>
                    </Billboard>
               
                <Planet
                    name={'neptune'}
                    scale={[2.7,2.7,2.7]}
                    rotation={[0, 0, 0]}
                    position1={12}
                    position2={800}
                    meshColor={'#0b5394'}
                    meshRoughness={0.7}
                    wrapperClass={'neptuneFacts'}
                    majorMoons={1}
                    moons={14}
                    realRotation={'18.5 hours'}
                    revolutions={'164.8 years'}
                    fact={`Neptune has extreme temperatures and high pressure. Because of this, scientists believe Neptune makes diamonds (compressed carbon) in the clouds; creating diamond rain.`}
                />
                {/* END NEPTUNE */}
                {/* PLUTO */}

                    {/* <Billboard>
                        <Text color='white'  fontSize='20' anchorX="center" anchorY="middle" position={[0,3,0]}>
                            Pluto
                        </Text>
                    </Billboard> */}
                <Planet
                    name={'pluto'}
                    scale={[1,1,1]}
                    rotation={[0, 0, 0]}
                    position1={2}
                    position2={1000}
                    meshColor={'#3c1e55'}
                    meshRoughness={0.7}
                    wrapperClass={'plutoFacts'}
                    majorMoons={1}
                    moons={5}
                    realRotation={'6 days'}
                    revolutions={'248 years'}
                    fact={`Pluto is the smallest planet and on a slightly different plane than the other planets. As such it is a contraversial planet, offically being a dwarf planet, though it doesn't fully match those requirements either.`}
                />
                {/* END PLUTO */}
            
    </>)
}

export default IndexPage;
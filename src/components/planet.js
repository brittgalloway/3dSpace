import React, { useRef, useState} from "react";
import { useFrame} from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function Planet({name, scale, rotation, position1, position2, meshColor, meshRoughness, meshMetalness, wrapperClass, majorMoons, moons, realRotation, revolutions, fact} ) {

    const [hidden, set] = useState(true);
    const planetRef = useRef();
    
    const handleText = () => {
        set(hidden ? false : true);
      
    }
    useFrame(({ clock }) => {
        const elaspedTime = clock.getElapsedTime();
    
        planetRef.current.position.x = Math.cos(elaspedTime * (position1/ 1000))* position2; 
        planetRef.current.position.z = Math.sin(elaspedTime * (position1/ 1000))* position2;
        
    })

    return <>
        <mesh name={name} ref={planetRef} position={[0,0,0]} scale={scale} rotation={rotation} onClick={() => { handleText() }}>
            <sphereGeometry arg={[1, 32, 32]}/>
            <meshStandardMaterial color={meshColor} metalness={meshMetalness} roughness={meshRoughness}/>
        
        </mesh>
    
        <Html
            as='article'
            wrapperClass={wrapperClass}
            onOcclude={set}
            style={{
                width: 350,
                transition: 'all 0.5s',
                opacity: hidden ? 0 : 1,
                transform: `scale(${hidden ? 0.5 : 1}) translateX(-50%) translateY(-50%)`
            }}
        >
            <h1>{name}</h1>
            <dl>
                <dt>Major Moons: </dt>
                <dd>{majorMoons}</dd>
                <dt>Confirmed moons: </dt>
                <dd>{moons}</dd>
                <dt>Rotation: </dt>
                <dd>{realRotation}</dd>
                <dt>Revolutions: </dt>
                <dd>{revolutions}</dd>
                <dt>Unique Fact: </dt>
                <dd>{fact}</dd>
            </dl>
        </Html>      
    </>
}
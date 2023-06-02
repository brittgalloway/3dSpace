import * as React from "react";
import { useLoader} from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from 'three';
import { TextureLoader } from "three";

export default function Planet({name, ref, scale, rotation, pointColor, pointIntensity, sphereGeometryArg, meshColor, meshRoughness, meshMetalness, wrapperClass, majorMoons, moons, realRotation, revolutions, fact} ) {

    const [hidden, set] = React.useState(true);


    const handleText = () => {
        set(hidden ? false : true);
      
    }
    return <>
        <mesh name={name} ref={ref} position={[0,0,0]} scale={scale} rotation={rotation} onClick={() => { set(hidden ? false : true); ref.current = hidden }}>
            <pointLight color={pointColor} intensity={pointIntensity}/>
            <sphereGeometry arg={sphereGeometryArg}/>
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
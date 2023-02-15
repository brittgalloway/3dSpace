import './App.css';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Earth } from './components/earth';
import { Stars} from "@react-three/drei";

const CanvasContainer = styled.div`
  width: 100% !important;
  height: 100% !important;
`;
function App() {

  return (
    <CanvasContainer>
      <Canvas >
        <Suspense fallback = {null}> //loading fallback
          <Stars radius={100} depth={600} count={2000} factor={10} saturation={0} fade={true}/>
          <Earth></Earth>
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
}

export default App;

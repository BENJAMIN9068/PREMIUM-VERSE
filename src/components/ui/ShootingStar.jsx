import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

const ShootingStar = () => {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * 2;
        ref.current.position.set(
            Math.sin(t) * 10,
            Math.cos(t) * 10,
            0
        );
    });

    return (
        <Trail width={5} length={8} color={new THREE.Color(2, 1, 10)} attenuation={(t) => t * t}>
            <mesh ref={ref}>
                <sphereGeometry args={[0.1]} />
                <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
            </mesh>
        </Trail>
    );
};

export default ShootingStar;

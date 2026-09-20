import { useMemo } from 'react'; import * as THREE from 'three'; import { innerMaterial,materialFor } from './Materials';
const q=new THREE.Quaternion();
export function Connector({color,scale=1}:{color:string;scale?:number}){
 const outer=materialFor(color);
 const tube=useMemo(()=>new THREE.CylinderGeometry(.405,.405,1.9,32,1,true),[]);
 const inner=useMemo(()=>new THREE.CylinderGeometry(.315,.315,1.84,28,1,true),[]);
 const rim=useMemo(()=>new THREE.TorusGeometry(.405,.07,12,32),[]);
 const hub=useMemo(()=>new THREE.SphereGeometry(.70,32,24),[]);
 const branch=(rotation:[number,number,number],position:[number,number,number])=><group rotation={rotation} position={position}><mesh geometry={tube} material={outer} castShadow receiveShadow/><mesh geometry={inner} material={innerMaterial}/><mesh geometry={rim} material={outer} position={[0,.95,0]}/></group>;
 return <group scale={scale}><mesh geometry={hub} material={outer} castShadow receiveShadow/>{branch([0,0,0],[0,1.0,0])}{branch([Math.PI,0,0],[0,-1.0,0])}{branch([0,0,Math.PI/2],[1.0,0,0])}{branch([0,0,-Math.PI/2],[-1.0,0,0])}</group>;
}

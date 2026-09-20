import * as THREE from 'three';
export const materials:Record<string,THREE.MeshPhysicalMaterial>={
 white:new THREE.MeshPhysicalMaterial({color:'#eef2f6',roughness:.28,metalness:.02,clearcoat:.45,clearcoatRoughness:.18}),
 black:new THREE.MeshPhysicalMaterial({color:'#11151d',roughness:.3,metalness:.02,clearcoat:.35,clearcoatRoughness:.2}),
 blue:new THREE.MeshPhysicalMaterial({color:'#174fd3',roughness:.25,metalness:.02,clearcoat:.5,clearcoatRoughness:.15}),
 purple:new THREE.MeshPhysicalMaterial({color:'#6338c7',roughness:.27,metalness:.02,clearcoat:.45,clearcoatRoughness:.18})
};
export const innerMaterial=new THREE.MeshStandardMaterial({color:'#060a12',roughness:.62,metalness:0});
export function materialFor(color:string){return color==='#eef2f6'?materials.white:color==='#11151d'?materials.black:color==='#174fd3'?materials.blue:materials.purple;}

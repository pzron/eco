import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, PresentationControls, Float, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Loader, RotateCw, ZoomIn, Layers, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

function Model({ color = "#D3C1E7" }: { color?: string }) {
  // This is a placeholder box that represents the product until we have real GLTF models
  // In a real app, we would load a gltf/glb file here
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

export function ProductViewer({ color }: { color?: string }) {
  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-b from-transparent to-black/20 rounded-2xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10">
        <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           3D View Active
        </div>
      </div>
      
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <Suspense fallback={null}>
          <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
            <Stage environment="city" intensity={0.6}>
              <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Model color={color} />
              </Float>
            </Stage>
          </PresentationControls>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={4} enableZoom={false} makeDefault />
      </Canvas>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white/10 text-white" title="Rotate Left">
          <RotateCw className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white/10 text-white" title="Zoom In">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white/10 text-white" title="Exploded View">
          <Layers className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white/10 text-white" title="Reset View">
          <Maximize className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

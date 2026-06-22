import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            // Skin – soft warm tan
            const skinColor = { color: "#ddb896", roughness: 0.80, metalness: 0 };

            type MatEntry = {
              color: string;
              roughness?: number;
              metalness?: number;
              emissive?: string;
              emissiveIntensity?: number;
            };

            const colorMap: Record<string, MatEntry> = {
              // Skin (face, ears, hands, neck)
              Plane007: skinColor,
              Cube002: skinColor,
              Ear001: skinColor,
              Hand: skinColor,
              Neck: skinColor,
              // Shirt – black with stronger dark-blue emissive glow
              BODYSHIRT: { color: "#0d0d0d", roughness: 0.88, metalness: 0, emissive: "#1a2a4a", emissiveIntensity: 0.35 },
              // Pants – dark denim with visible emissive
              Pant: { color: "#141420", roughness: 0.92, metalness: 0, emissive: "#1a1a30", emissiveIntensity: 0.28 },
              // Sneakers – white/silver with soft glow
              Shoe: { color: "#e8e8ea", roughness: 0.28, metalness: 0.18, emissive: "#c8d0e0", emissiveIntensity: 0.18 },
              // Sole – clean white with faint glow
              Sole: { color: "#f5f5f5", roughness: 0.60, metalness: 0, emissive: "#e0e0e0", emissiveIntensity: 0.14 },

              // Furniture
              // Table frame/legs/monitor stand - black with sharp whiter reflection
              Plane003: { color: "#1a1a1a", roughness: 0.15, metalness: 0.85 },
            };

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const settings = colorMap[child.name];
                if (settings) {
                  const original = Array.isArray(mesh.material)
                    ? mesh.material[0]
                    : mesh.material;
                  const cloned = (original as THREE.MeshStandardMaterial).clone();
                  cloned.color.set(settings.color);
                  if (settings.roughness !== undefined) cloned.roughness = settings.roughness;
                  if (settings.metalness !== undefined) cloned.metalness = settings.metalness;
                  if (settings.emissive) cloned.emissive.set(settings.emissive);
                  if (settings.emissiveIntensity !== undefined) cloned.emissiveIntensity = settings.emissiveIntensity;
                  cloned.needsUpdate = true;
                  mesh.material = cloned;
                }
              }
            });

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;

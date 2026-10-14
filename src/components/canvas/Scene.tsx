import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import { useThree, useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';

export default function Scene() {
  const { scene, animations } = useGLTF("/body.glb");
  const { actions, mixer } = useAnimations(animations, scene);
  const { camera } = useThree();

  const modelRef = useRef<THREE.Group>(null);
  const innerModelRef = useRef<THREE.Group>(null);
  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  // Refs and state for dual-layer mesh peeling: original muscle mesh + real human skeleton.obj
  const origMeshRef = useRef<any>(null);
  const skeletonGroupRef = useRef<THREE.Group>(null);
  const [skeletonObj, setSkeletonObj] = useState<THREE.Object3D | null>(null);
  const skeletonMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const currentBlendRef = useRef(0);

  // Services section state (strictly muscular model visibility, skeleton hidden)
  const [isInServices, setIsInServices] = useState(false);

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  const currentActionNameRef = useRef<string>('');

  // Smooth live animation player: keeps animations actively playing & breathing at 60fps,
  // cross-fading gracefully between movements on scroll instead of stuttering/scrubbing
  const transitionToAnimation = (name: string, duration = 0.5) => {
    const target = name.toLowerCase();
    if (currentActionNameRef.current === target) return;
    currentActionNameRef.current = target;

    Object.keys(actionsRef.current).forEach((key) => {
      const act = actionsRef.current[key];
      if (!act) return;

      if (key.toLowerCase() === target) {
        act.enabled = true;
        act.paused = false;
        act.setEffectiveWeight(1);
        act.fadeIn(duration).play();
      } else {
        act.fadeOut(duration);
      }
    });
  };

  // Sequential phase transition for Peeling Layers:
  // Phase 1 (p < 0.5): Muscular model rotates 1 full round (0 -> 2*PI) and disappears (opacity 1 -> 0). Skeleton is 100% hidden.
  // Phase 2 (p >= 0.5): Muscular model completely disappeared (0). Skeleton model fully appears (opacity 0 -> 1) and completes 1 full round (0 -> 2*PI).
  const applySkeletonBlend = (val: number) => {
    const p = Math.max(0, Math.min(1, val));
    currentBlendRef.current = p;

    let muscleOpacity = 0;
    let skeletonOpacity = 0;

    // Seamless revealing transition around the 1st round completion (p: 0.38 -> 0.52):
    // p < 0.38: Muscular model 100% visible, rotating 1st round. Skeleton hidden.
    // 0.38 <= p <= 0.52: Muscular model peels away (1 -> 0) while Skeleton reveals from within (0 -> 1)
    // p > 0.52: Muscular model completely disappeared (0). Skeleton 100% visible, showcasing full osseous matrix.
    if (p < 0.38) {
      muscleOpacity = 1;
      skeletonOpacity = 0;
    } else if (p <= 0.52) {
      const t = (p - 0.38) / 0.14;
      muscleOpacity = 1 - t;
      skeletonOpacity = t;
    } else {
      muscleOpacity = 0;
      skeletonOpacity = 1;
    }

    // Apply to muscular model (both root group and all underlying meshes)
    const isMuscleVisible = muscleOpacity > 0.005;

    if (modelRef.current) {
      modelRef.current.visible = isMuscleVisible;
    }
    if (innerModelRef.current) {
      innerModelRef.current.visible = isMuscleVisible;
    }

    scene.traverse((child: any) => {
      if (child.isMesh || child.isSkinnedMesh) {
        child.visible = isMuscleVisible;
        const mat: any = child.material;
        if (Array.isArray(mat)) {
          mat.forEach((m: any) => {
            m.transparent = true;
            m.opacity = muscleOpacity;
            m.depthWrite = muscleOpacity > 0.8;
          });
        } else if (mat) {
          mat.transparent = true;
          mat.opacity = muscleOpacity;
          mat.depthWrite = muscleOpacity > 0.8;
        }
      }
    });

    // Apply to skeleton model
    if (skeletonMatRef.current) {
      const isSkeletonVisible = skeletonOpacity > 0.005;
      skeletonMatRef.current.transparent = true;
      skeletonMatRef.current.opacity = skeletonOpacity;
      skeletonMatRef.current.depthWrite = skeletonOpacity > 0.55;

      if (skeletonOpacity > 0.05 && skeletonOpacity < 0.95) {
        skeletonMatRef.current.emissive.set("#4a3622");
        skeletonMatRef.current.emissiveIntensity = 0.38;
      } else {
        skeletonMatRef.current.emissive.set("#2d2218");
        skeletonMatRef.current.emissiveIntensity = 0.22;
      }
    }

    if (skeletonGroupRef.current) {
      skeletonGroupRef.current.visible = skeletonOpacity > 0.005;
    }
    if (skeletonObj) {
      skeletonObj.visible = skeletonOpacity > 0.005;
    }
  };

  const updatePeelRotation = (val: number) => {
    const p = Math.max(0, Math.min(1, val));
    if (p < 0.50) {
      // Muscular model completes 1 full 360° round
      const rot = (p / 0.50) * Math.PI * 2;
      if (modelRef.current) {
        modelRef.current.rotation.y = rot;
      }
      // Skeleton rotates in exact lockstep as it reveals from within the muscle
      if (skeletonGroupRef.current) {
        skeletonGroupRef.current.rotation.y = rot;
      }
    } else {
      // Muscular model stays at 360° (front) while disappeared
      if (modelRef.current) {
        modelRef.current.rotation.y = Math.PI * 2;
      }
      // Skeleton model continues its full 360° showcase rotation
      const skeletonRot = ((p - 0.50) / 0.50) * Math.PI * 2;
      if (skeletonGroupRef.current) {
        skeletonGroupRef.current.rotation.y = skeletonRot;
      }
    }
  };

  const setSkeletonBlend = (val: number) => {
    applySkeletonBlend(val);
  };

  // Listen for sync events from PeelingLayersSection (range slider & scroll)
  useEffect(() => {
    const handleSync = (e: any) => {
      const p = e.detail?.progress ?? 0;
      setSkeletonBlend(p);
      updatePeelRotation(p);
    };
    window.addEventListener('flexlab-peel-sync', handleSync);
    return () => window.removeEventListener('flexlab-peel-sync', handleSync);
  }, []);


  // Listen for active state from ServicesSection so skeleton strictly disappears in Services
  useEffect(() => {
    const handleOrthoActive = (e: any) => {
      const active = Boolean(e.detail?.active);
      setIsInServices(active);
      if (active) {
        setSkeletonBlend(0);
        if (skeletonGroupRef.current) skeletonGroupRef.current.visible = false;
        if (skeletonObj) skeletonObj.visible = false;
      }
    };
    window.addEventListener('flexlab-ortho-active', handleOrthoActive);
    return () => window.removeEventListener('flexlab-ortho-active', handleOrthoActive);
  }, []);

  // Listen for discipline selection to smoothly adjust perspective angle
  useEffect(() => {
    const handleDisciplineSelect = (e: any) => {
      const angle = e.detail?.cameraAngle;
      let targetRot = Math.PI * 2;
      switch (angle) {
        case 'Back':
          targetRot = Math.PI * 3;
          break;
        case '3/4 Back':
          targetRot = Math.PI * 2 + (5 * Math.PI) / 6;
          break;
        case '3/4 Front':
          targetRot = Math.PI * 2 + Math.PI / 6;
          break;
        case 'Close 3/4':
          targetRot = Math.PI * 2 + Math.PI / 4;
          break;
        default:
          targetRot = Math.PI * 2;
          break;
      }
      if (modelRef.current) {
        gsap.to(modelRef.current.rotation, {
          y: targetRot,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener('flexlab-discipline-select', handleDisciplineSelect);
    return () => window.removeEventListener('flexlab-discipline-select', handleDisciplineSelect);
  }, []);

  // Setup muscle transparency & load real human skeleton.obj model
  useEffect(() => {
    let targetMesh: any = null;
    scene.traverse((child: any) => {
      if (child.isMesh || child.isSkinnedMesh) {
        targetMesh = child;
        if (Array.isArray(child.material)) {
          child.material.forEach((m: any) => {
            m.transparent = true;
            m.opacity = 1;
          });
        } else if (child.material) {
          child.material.transparent = true;
          child.material.opacity = 1;
        }
      }
    });

    if (targetMesh && !origMeshRef.current) {
      origMeshRef.current = targetMesh;
    }

    // Load authentic human skeleton.obj model from public
    const loader = new OBJLoader();
    loader.load(
      '/skeleton.obj',
      (obj) => {
        // High-precision osteological bone material (natural ivory tone)
        const boneMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#f6f0e6"),
          roughness: 0.55,
          metalness: 0.08,
          emissive: new THREE.Color("#2d2218"),
          emissiveIntensity: 0.22,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          side: THREE.DoubleSide,
        });

        skeletonMatRef.current = boneMat;

        // Assign bone material and compute vertex normals for smooth anatomical lighting
        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.computeVertexNormals();
            mesh.material = boneMat;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        // Anatomical fit inside muscular model (height: 1.85m, feet at Y=0.03m, skull at Y=1.88m)
        const skeletonBox = new THREE.Box3().setFromObject(obj);
        const skeletonSize = new THREE.Vector3();
        skeletonBox.getSize(skeletonSize);
        const skeletonCenter = new THREE.Vector3();
        skeletonBox.getCenter(skeletonCenter);

        const targetHeight = 1.85;
        const s = targetHeight / (skeletonSize.y || 66.95);
        obj.scale.set(s, s, s);

        // Align X and Z center to 0, align feet base to Y=0.03 inside muscular foot
        const skelMinY = skeletonBox.min.y;
        obj.position.set(
          -skeletonCenter.x * s,
          0.03 - skelMinY * s,
          -skeletonCenter.z * s
        );

        obj.visible = false;
        setSkeletonObj(obj);
        // Immediately sync with current blend progress
        applySkeletonBlend(currentBlendRef.current);
      },
      undefined,
      (err) => {
        console.error("Error loading skeleton.obj:", err);
      }
    );
  }, [scene]);

  // Calculate exact Three.js world coordinates matching the center of #services-stage-card
  const getServicesCardCenter = () => {
    if (typeof window === 'undefined') return { x: 0.882, y: -0.74, scale: 0.54 };
    const card = document.getElementById('services-stage-card');
    if (!card) return { x: 0.882, y: -0.74, scale: 0.54 };
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const distance = 4.9; // camera.position.z (5.0) - model.position.z (0.1)
    const vFov = (25 * Math.PI) / 180;
    const planeHeight = 2 * Math.tan(vFov / 2) * distance;
    const planeWidth = planeHeight * (window.innerWidth / window.innerHeight);

    const worldX = (cardCenterX / window.innerWidth - 0.5) * planeWidth;
    const worldCenterY = -(cardCenterY / window.innerHeight - 0.5) * planeHeight;

    // Calculate scale so the model height is exactly 82% of the stage card height
    const cardWorldHeight = (rect.height / window.innerHeight) * planeHeight;
    const isMobile = window.innerWidth < 768;
    const targetModelHeight = (isMobile ? 0.78 : 0.82) * cardWorldHeight;
    const computedScale = targetModelHeight / 1.88;

    // Model height at computedScale is targetModelHeight. Model pivot is at feet:
    const feetY = worldCenterY - targetModelHeight / 2;
    return { x: worldX, y: feetY, scale: computedScale };
  };

  useFrame((state, delta) => {
    // Subtle organic breathing float on Y
    if (innerModelRef.current) {
      innerModelRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.015;

      // Gentle interactive mouse parallax tilt
      const targetRotY = state.pointer.x * 0.04;
      const targetRotX = -state.pointer.y * 0.02;
      innerModelRef.current.rotation.y = THREE.MathUtils.lerp(innerModelRef.current.rotation.y, targetRotY, Math.min(1, delta * 3));
      innerModelRef.current.rotation.x = THREE.MathUtils.lerp(innerModelRef.current.rotation.x, targetRotX, Math.min(1, delta * 3));
    }

    if (isInServices) {
      // In Services (Seven Clinical Disciplines), strictly ensure muscular model is 100% visible and skeleton is 100% hidden
      if (skeletonGroupRef.current) skeletonGroupRef.current.visible = false;
      if (skeletonObj) skeletonObj.visible = false;
      if (modelRef.current) {
        modelRef.current.visible = true;
        const target = getServicesCardCenter();
        modelRef.current.position.x = target.x;
        modelRef.current.position.y = target.y;
        modelRef.current.position.z = 0.1;
        modelRef.current.scale.set(target.scale, target.scale, target.scale);
      }
      if (innerModelRef.current) innerModelRef.current.visible = true;
      scene.traverse((child: any) => {
        if (child.isMesh || child.isSkinnedMesh) {
          child.visible = true;
          const mat: any = child.material;
          if (Array.isArray(mat)) {
            mat.forEach((m: any) => {
              m.transparent = true;
              m.opacity = 1;
              m.depthWrite = true;
            });
          } else if (mat) {
            mat.transparent = true;
            mat.opacity = 1;
            mat.depthWrite = true;
          }
        }
      });
    } else {
      applySkeletonBlend(currentBlendRef.current);
    }
  });

  // Initial posture on mount: start natural idle breathing immediately in real-time
  useEffect(() => {
    transitionToAnimation('idel', 0.5);
  }, []);

  useGSAP(() => {
    if (!modelRef.current || !camera) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const heroX = isMobile ? 0 : 0.85;
    const heroY = -0.85;
    const heroScale = isMobile ? 0.58 : 0.68;

    // Initial position on load (properly visible in hero viewport)
    modelRef.current.position.set(heroX, heroY, 0);
    modelRef.current.scale.set(heroScale, heroScale, heroScale);
    modelRef.current.rotation.set(0, 0, 0);

    if (skeletonGroupRef.current) {
      skeletonGroupRef.current.position.set(isMobile ? 0 : 0.65, -0.85, 0.1);
      skeletonGroupRef.current.rotation.set(0, 0, 0);
      skeletonGroupRef.current.scale.set(heroScale, heroScale, heroScale);
      skeletonGroupRef.current.visible = false;
    }

    // 1. SECTION 1 -> SECTION 2 (Hero to Anatomy Engine)
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section1",
        endTrigger: "#section2",
        start: "top top",
        end: "top top",
        scrub: 1.4,
        onLeaveBack: () => {
          setSkeletonBlend(0);
          if (modelRef.current) {
            modelRef.current.position.set(heroX, heroY, 0);
            modelRef.current.scale.set(heroScale, heroScale, heroScale);
            modelRef.current.rotation.set(0, 0, 0);
          }
        },
      },
    });

    tl1
      .fromTo(
        modelRef.current.position,
        {
          x: heroX,
          y: heroY,
          z: 0,
        },
        {
          x: isMobile ? 0 : 0.22,
          y: -0.8,
          z: 0.12,
          ease: "none",
        },
        0
      )
      .fromTo(
        modelRef.current.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          y: -0.2,
          ease: "none",
        },
        0
      );

    // 2. SECTION 2 -> SECTION 3 (Anatomy Engine to Joint Intelligence)
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        endTrigger: "#section3",
        start: "top top",
        end: "top top",
        scrub: 1.4,
      },
    });

    tl2
      .to(
        modelRef.current.position,
        {
          x: isMobile ? 0 : 0.22,
          y: -0.65,
          z: 0.25,
          ease: "none",
        },
        0
      )
      .to(
        modelRef.current.rotation,
        {
          y: 0.25,
          ease: "none",
        },
        0
      );

    // 3. SECTION 3 -> WHAT WE TREAT ("Your body is the story")
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section3",
        endTrigger: "#what-we-treat",
        start: "top top",
        end: "top top",
        scrub: 1.4,
      },
    });

    tl3
      .to(
        modelRef.current.position,
        {
          x: isMobile ? 0 : -1.02,
          y: -0.85,
          z: 0.1,
          ease: "none",
        },
        0
      )
      .to(
        modelRef.current.scale,
        {
          x: isMobile ? 0.58 : 0.65,
          y: isMobile ? 0.58 : 0.65,
          z: isMobile ? 0.58 : 0.65,
          ease: "none",
        },
        0
      )
      .to(
        modelRef.current.rotation,
        {
          y: 0.15,
          ease: "none",
        },
        0
      );

    // 4. WHAT WE TREAT -> OUR METHOD (The FlexLab Method)
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#what-we-treat",
        endTrigger: "#our-method",
        start: "bottom 95%",
        end: "top top",
        scrub: 1.4,
      },
    });

    tl4
      .to(
        modelRef.current.position,
        {
          x: isMobile ? 0 : 1.08,
          y: -0.85,
          z: 0,
          ease: "none",
        },
        0
      )
      .to(
        modelRef.current.scale,
        {
          x: 0.68,
          y: 0.68,
          z: 0.68,
          ease: "none",
        },
        0
      )
      .to(
        modelRef.current.rotation,
        {
          y: -0.2,
          ease: "none",
        },
        0
      );

    // 4b. OUR METHOD -> PEELING LAYERS
    const tl4b = gsap.timeline({
      scrollTrigger: {
        trigger: "#our-method",
        endTrigger: "#peeling-layers",
        start: "top top",
        end: "top top",
        scrub: 1.4,
        onEnter: () => {
          setSkeletonBlend(0);
        },
      },
    });

    tl4b
      .to(
        modelRef.current.position,
        {
          x: isMobile ? 0 : 0.65,
          y: -0.85,
          z: 0.1,
          ease: "none",
        },
        0
      )
      .to(
        modelRef.current.scale,
        {
          x: 0.68,
          y: 0.68,
          z: 0.68,
          ease: "none",
        },
        0
      )
      .to(
        modelRef.current.rotation,
        {
          y: 0,
          ease: "none",
        },
        0
      );

    // 5. STUCK IN OSTEOLOGICAL SCAN AREA (Pinned for 1800px)
    // Muscular model stays at its exact original position (y: -0.85) untouched.
    // Skeleton model has independent absolute position higher up (y: -0.10) where it is fully visible!
    const scanState = { progress: 0, rotY: 0 };
    const tlScan = gsap.timeline({
      scrollTrigger: {
        trigger: "#peeling-layers",
        start: "top top",
        end: "+=1800",
        scrub: 1,
        onEnter: () => {
          setIsInServices(false);
        },
        onEnterBack: () => {
          setIsInServices(false);
        },
        onLeave: () => {
          setIsInServices(false);
        },
        onLeaveBack: () => {
          setIsInServices(false);
          setSkeletonBlend(0);
          updatePeelRotation(0);
        },
      },
    });

    tlScan
      // Muscular model kept at its exact original position untouched
      .to(
        modelRef.current.position,
        {
          x: isMobile ? 0 : 0.65,
          y: -0.85,
          z: 0.1,
          ease: "none",
          duration: 1,
        },
        0
      )
      .to(
        modelRef.current.scale,
        {
          x: 0.68,
          y: 0.68,
          z: 0.68,
          ease: "none",
          duration: 1,
        },
        0
      )
      // Muscular model completes 1 round and disappears; after that skeleton model fully appears and rotates
      .to(
        scanState,
        {
          progress: 1,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            setSkeletonBlend(scanState.progress);
            updatePeelRotation(scanState.progress);
          },
        },
        0
      );

    // Skeleton model positioned in exact same frame and scale as muscular model for close anatomical reveal!
    if (skeletonGroupRef.current) {
      tlScan
        .to(
          skeletonGroupRef.current.position,
          {
            x: isMobile ? 0 : 0.65,
            y: -0.85,
            z: 0.1,
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          skeletonGroupRef.current.scale,
          {
            x: 0.68,
            y: 0.68,
            z: 0.68,
            ease: "none",
            duration: 1,
          },
          0
        );
    }

    // 5b. PEELING LAYERS -> SERVICES (Muscular Model Entry, Skeleton Disappears)
    // Glides muscular model into place inside the frame while skeleton disappears smoothly
    const entryState = { blend: 1 };
    const tlOrthoEntry = gsap.timeline({
      defaults: { immediateRender: false },
      scrollTrigger: {
        trigger: "#services",
        start: "top bottom",
        end: "top top",
        scrub: 1,
        onEnter: () => {
          setIsInServices(true);
          setSkeletonBlend(0);
          if (skeletonGroupRef.current) skeletonGroupRef.current.visible = false;
          if (skeletonObj) skeletonObj.visible = false;
        },
        onEnterBack: () => {
          setIsInServices(true);
          setSkeletonBlend(0);
          if (skeletonGroupRef.current) skeletonGroupRef.current.visible = false;
          if (skeletonObj) skeletonObj.visible = false;
        },
        onLeaveBack: () => {
          setIsInServices(false);
          setSkeletonBlend(1);
          updatePeelRotation(1);
          if (skeletonGroupRef.current) skeletonGroupRef.current.visible = true;
          if (skeletonObj) skeletonObj.visible = true;
        },
      },
    });

    tlOrthoEntry
      .to(
        entryState,
        {
          blend: 0,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            setSkeletonBlend(entryState.blend);
          },
        },
        0
      )
      .to(
        modelRef.current.position,
        {
          x: () => getServicesCardCenter().x,
          y: () => getServicesCardCenter().y,
          z: 0.1,
          ease: "none",
        },
        0
      )
      .to(
        modelRef.current.scale,
        {
          x: () => getServicesCardCenter().scale,
          y: () => getServicesCardCenter().scale,
          z: () => getServicesCardCenter().scale,
          ease: "none",
        },
        0
      )
      .to(
        modelRef.current.rotation,
        {
          y: Math.PI * 2 + Math.PI / 6,
          ease: "none",
        },
        0
      );

    // 5c. STUCK IN SEVEN CLINICAL DISCIPLINES (Pinned for 1800px)
    // Muscular model is enlarged, perfectly centered within the stage box,
    // and responsive to clinical discipline perspective selections.
    const tlOrtho = gsap.timeline({
      defaults: { immediateRender: false },
      scrollTrigger: {
        trigger: "#services",
        start: "top top",
        end: "+=1800",
        scrub: 1,
        onEnter: () => {
          setIsInServices(true);
          setSkeletonBlend(0);
          if (skeletonGroupRef.current) skeletonGroupRef.current.visible = false;
          if (skeletonObj) skeletonObj.visible = false;
          const pos = getServicesCardCenter();
          if (modelRef.current) {
            modelRef.current.position.set(pos.x, pos.y, 0.1);
            modelRef.current.scale.set(pos.scale, pos.scale, pos.scale);
          }
        },
        onLeave: () => {
          setIsInServices(false);
        },
        onEnterBack: () => {
          setIsInServices(true);
          setSkeletonBlend(0);
          if (skeletonGroupRef.current) skeletonGroupRef.current.visible = false;
          if (skeletonObj) skeletonObj.visible = false;
          const pos = getServicesCardCenter();
          if (modelRef.current) {
            modelRef.current.position.set(pos.x, pos.y, 0.1);
            modelRef.current.scale.set(pos.scale, pos.scale, pos.scale);
          }
        },
        onLeaveBack: () => {
          setIsInServices(false);
        },
      },
    });

    tlOrtho.to(
      modelRef.current.rotation,
      {
        y: Math.PI * 4,
        ease: "none",
        duration: 1,
      },
      0
    );

    // 5d. SERVICES -> PROOF
    // Only AFTER the full 2-round spin finishes and pin releases:
    // Model moves down out of the section while scrolling!
    const tlServicesExit = gsap.timeline({
      defaults: { immediateRender: false },
      scrollTrigger: {
        trigger: "#proof",
        start: "top bottom",
        end: "top 30%",
        scrub: 1,
        onEnter: () => setIsInServices(false),
        onLeaveBack: () => setIsInServices(true),
      },
    });

    tlServicesExit.to(
      modelRef.current.position,
      {
        y: -10, // Moves out of the section
        ease: "power2.in",
      }
    );

    // 6. SERVICES -> CTA & BEFORE FOOTER
    // Glides model into place right before footer and stands IDLE
    const tlCTA = gsap.timeline({
      defaults: { immediateRender: false },
      scrollTrigger: {
        trigger: "#cta",
        start: "top bottom",
        end: "top 40%",
        scrub: 1,
        onEnter: () => {
          setSkeletonBlend(0);
        },
        onEnterBack: () => {
          setSkeletonBlend(0);
        },
        onLeaveBack: () => {
          setSkeletonBlend(0);
        },
      },
    });

    tlCTA
      .to(
        modelRef.current.position,
        {
          x: isMobile ? 0 : 0.72,
          y: -0.85,
          z: 0.1,
          ease: "power2.out",
        },
        0
      )
      .to(
        modelRef.current.rotation,
        {
          y: -0.15,
          ease: "power2.out",
        },
        0
      );
  }, []);

  return (
    <>
      {/* Muscular Model: Smoothly positioned by GSAP, inner group holds micro-breathing & parallax */}
      <group ref={modelRef} position={[0.85, -0.85, 0]} scale={[0.68, 0.68, 0.68]}>
        <group ref={innerModelRef}>
          <primitive object={scene} />
        </group>
      </group>

      {/* Real Anatomical Human Skeleton: Exactly aligned with muscular model */}
      <group
        ref={skeletonGroupRef}
        position={[0.85, -0.85, 0.1]}
        scale={[0.68, 0.68, 0.68]}
        visible={false}
      >
        {skeletonObj && <primitive object={skeletonObj} />}
      </group>

      {/* Joint markings removed as requested */}
    </>
  );
}
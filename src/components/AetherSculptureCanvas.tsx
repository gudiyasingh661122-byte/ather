import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { MaterialStudy, shouldRenderFrameAtFps, TARGET_FPS } from '../utils/videoCatalog';

interface AetherSculptureCanvasProps {
  activeStudy: MaterialStudy;
  explodedFactor: number; // 0 to 1
  rotationSpeedMultiplier?: number;
  className?: string;
}

// Pre-allocated math helpers outside the render loop (zero GC in tick)
const _targetColor = new THREE.Color();
const _emissiveColor = new THREE.Color();
const _dummyObj = new THREE.Object3D();

export const AetherSculptureCanvas: React.FC<AetherSculptureCanvasProps> = ({
  activeStudy,
  explodedFactor,
  rotationSpeedMultiplier = 1,
  className = '',
}) => {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const activeStudyRef = useRef<MaterialStudy>(activeStudy);
  const explodedRef = useRef<number>(explodedFactor);
  const speedRef = useRef<number>(rotationSpeedMultiplier);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    activeStudyRef.current = activeStudy;
  }, [activeStudy]);

  useEffect(() => {
    explodedRef.current = explodedFactor;
  }, [explodedFactor]);

  useEffect(() => {
    speedRef.current = rotationSpeedMultiplier;
  }, [rotationSpeedMultiplier]);

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    // 1. Software WebGL detection from GPU renderer string
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = Math.max(mount.clientWidth, 300);
    const height = Math.max(mount.clientHeight, 300);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.08);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 7.1);
    camera.lookAt(0, -0.15, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // 2. Mandatory Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 3. Balanced 3-Point Studio Lighting Rig + Softboxes
    const hemiLight = new THREE.HemisphereLight(0xdbe2f0, 0x1a1610, 0.65);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff0d4, 2.4);
    keyLight.position.set(4, 6, 4);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(512, 512);
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 18;
      const d = 3.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc6a56b, 1.65);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    if (!isSoftwareGl) {
      RectAreaLightUniformsLib.init();
      const softbox = new THREE.RectAreaLight(0xfff5e4, 3.5, 4, 4);
      softbox.position.set(-3, 3, 3);
      softbox.lookAt(0, 0, 0);
      scene.add(softbox);
    }

    // 4. Lightweight Procedural Brushed Anisotropy Bump Texture (CanvasTexture)
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 128;
    bumpCanvas.height = 128;
    const ctx = bumpCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 120; i++) {
        const y = (i * 1.06) % 128;
        const shade = 115 + ((i * 17) % 30);
        ctx.strokeStyle = `rgb(${shade},${shade},${shade})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(128, y);
        ctx.stroke();
      }
    }
    const brushedBumpMap = new THREE.CanvasTexture(bumpCanvas);
    brushedBumpMap.wrapS = THREE.RepeatWrapping;
    brushedBumpMap.wrapT = THREE.RepeatWrapping;
    brushedBumpMap.repeat.set(4, 4);
    brushedBumpMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 5. Composite 8-Part Procedural 3D Sculpture (THREE.Group)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const initialPbr = activeStudyRef.current.pbrConfig;

    // Primary Core Material (dynamically morphs with active MaterialStudy)
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(initialPbr.color),
      metalness: initialPbr.metalness,
      roughness: initialPbr.roughness,
      clearcoat: initialPbr.clearcoat,
      clearcoatRoughness: 0.08,
      anisotropy: initialPbr.anisotropy,
      bumpMap: brushedBumpMap,
      bumpScale: 0.008,
      envMapIntensity: 1.4,
    });

    // Brushed Champagne Gold Trim Material (contrasting roughness/metalness)
    const goldRingMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xc6a56b),
      metalness: 0.94,
      roughness: 0.18,
      anisotropy: 0.8,
      bumpMap: brushedBumpMap,
      bumpScale: 0.005,
      envMapIntensity: 1.5,
    });

    // Dark Gunmetal Structural Material (roughness delta >= 0.25)
    const obsidianAlloyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1b1b1d),
      metalness: 0.75,
      roughness: 0.48,
      bumpMap: brushedBumpMap,
      bumpScale: 0.01,
    });

    // Smoked Optical Glass Outer Vessel Material
    const glassShellMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf5f3ef),
      metalness: 0.0,
      roughness: 0.06,
      transmission: isSoftwareGl ? 0 : 0.9,
      transparent: true,
      opacity: isSoftwareGl ? 0.24 : 1.0,
      ior: 1.65,
      thickness: 0.8,
      clearcoat: 1.0,
      depthWrite: false,
    });

    // Part 1: Central Faceted Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.86, 2);
    const coreMesh = new THREE.Mesh(coreGeo, coreMaterial);
    coreMesh.castShadow = !isSoftwareGl;
    coreMesh.receiveShadow = !isSoftwareGl;
    rootGroup.add(coreMesh);

    // Part 2: Inner Crystalline Lattice Cage (Octahedron wireframe bezel)
    const innerCageGeo = new THREE.IcosahedronGeometry(1.06, 1);
    const innerCageMat = new THREE.MeshBasicMaterial({
      color: 0xc6a56b,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const innerCageMesh = new THREE.Mesh(innerCageGeo, innerCageMat);
    rootGroup.add(innerCageMesh);

    // Part 3: Outer Smoked Glass Containment Polyhedron
    const glassShellGeo = new THREE.OctahedronGeometry(1.24, 2);
    const glassShellMesh = new THREE.Mesh(glassShellGeo, glassShellMaterial);
    glassShellMesh.renderOrder = 2;
    rootGroup.add(glassShellMesh);

    // Part 4: Primary Equatorial Gimbal Ring (Champagne Gold)
    const outerRingGeo = new THREE.TorusGeometry(1.78, 0.042, 16, 72);
    const outerRingMesh = new THREE.Mesh(outerRingGeo, goldRingMaterial);
    outerRingMesh.rotation.x = Math.PI * 0.38;
    rootGroup.add(outerRingMesh);

    // Part 5: Secondary Meridian Gimbal Ring (Obsidian Alloy)
    const midRingGeo = new THREE.TorusGeometry(1.52, 0.055, 16, 64);
    const midRingMesh = new THREE.Mesh(midRingGeo, obsidianAlloyMaterial);
    midRingMesh.rotation.y = Math.PI * 0.28;
    midRingMesh.rotation.x = -Math.PI * 0.18;
    rootGroup.add(midRingMesh);

    // Part 6: Tertiary Precision Chronograph Ring (Core Material)
    const innerRingGeo = new THREE.TorusGeometry(1.34, 0.025, 12, 56);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, coreMaterial);
    innerRingMesh.rotation.z = Math.PI * 0.22;
    rootGroup.add(innerRingMesh);

    // Part 7: Axial Gimbal Spindles (4 precision pins)
    const spindleGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.42, 10);
    const spindleGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const pin = new THREE.Mesh(spindleGeo, goldRingMaterial);
      pin.position.set(Math.cos(angle) * 1.52, 0, Math.sin(angle) * 1.52);
      pin.rotation.z = Math.PI / 2;
      pin.rotation.y = -angle;
      spindleGroup.add(pin);
    }
    rootGroup.add(spindleGroup);

    // Part 8: Orbital Harmonic Nodes (InstancedMesh of 24 micro-satellites)
    const nodeCount = 24;
    const nodeGeo = new THREE.SphereGeometry(0.032, 10, 10);
    const nodesInstanced = new THREE.InstancedMesh(nodeGeo, goldRingMaterial, nodeCount);
    for (let i = 0; i < nodeCount; i++) {
      const theta = (i / nodeCount) * Math.PI * 2;
      const radius = 2.08 + (i % 2 === 0 ? 0.08 : -0.08);
      _dummyObj.position.set(
        Math.cos(theta) * radius,
        Math.sin(theta * 2) * 0.24,
        Math.sin(theta) * radius
      );
      const s = 0.85 + (i % 3) * 0.15;
      _dummyObj.scale.set(s, s, s);
      _dummyObj.updateMatrix();
      nodesInstanced.setMatrixAt(i, _dummyObj.matrix);
    }
    nodesInstanced.instanceMatrix.needsUpdate = true;
    nodesInstanced.computeBoundingSphere();
    rootGroup.add(nodesInstanced);

    // Contact Shadow Disc & Grounding Horizon Ring beneath the sculpture
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 4, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 4.4),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.55,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.25;
    scene.add(shadowPlane);

    const floorRing = new THREE.Mesh(
      new THREE.RingGeometry(1.85, 1.87, 64),
      new THREE.MeshBasicMaterial({
        color: 0xc6a56b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.22,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      })
    );
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = -2.23;
    scene.add(floorRing);

    // Render one immediate initial frame so canvas is ready right away
    renderer.render(scene, camera);

    // Track whether the 3D canvas is inside or near the viewport
    let isCanvasInView = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isCanvasInView = entry.isIntersecting;
        });
      },
      { rootMargin: '150px 0px', threshold: 0.01 }
    );
    visibilityObserver.observe(mount);

    // Pointer move handler for smooth parallax
    const onPointerMove = (e: PointerEvent) => {
      if (!isCanvasInView) return;
      const rect = mount.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointerRef.current.x = THREE.MathUtils.clamp(nx, -1, 1);
      pointerRef.current.y = THREE.MathUtils.clamp(ny, -1, 1);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!mount) return;
      const w = Math.max(mount.clientWidth, 280);
      const h = Math.max(mount.clientHeight, 280);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 6. 30 FPS Paced Animation Loop (afterDraw for software WebGL, 30 FPS cap for GPU)
    const clock = new THREE.Clock();
    let frameId = 0;
    let isDisposed = false;
    let currentExploded = explodedRef.current;
    let lastRenderTimeMs = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (isDisposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function stepAndRender() {
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const speed = speedRef.current;

      const targetPbr = activeStudyRef.current.pbrConfig;
      _targetColor.set(targetPbr.color);
      _emissiveColor.set(targetPbr.emissive);
      coreMaterial.color.lerp(_targetColor, 1 - Math.exp(-6 * dt));
      coreMaterial.emissive.lerp(_emissiveColor, 1 - Math.exp(-6 * dt));
      coreMaterial.metalness = THREE.MathUtils.damp(coreMaterial.metalness, targetPbr.metalness, 6, dt);
      coreMaterial.roughness = THREE.MathUtils.damp(coreMaterial.roughness, targetPbr.roughness, 6, dt);
      coreMaterial.clearcoat = THREE.MathUtils.damp(coreMaterial.clearcoat, targetPbr.clearcoat, 6, dt);
      coreMaterial.anisotropy = THREE.MathUtils.damp(coreMaterial.anisotropy, targetPbr.anisotropy, 6, dt);

      currentExploded = THREE.MathUtils.damp(currentExploded, explodedRef.current, 5, dt);

      const outerScale = 1 + currentExploded * 0.28;
      const midScale = 1 + currentExploded * 0.18;
      const glassScale = 1 + currentExploded * 0.14;
      outerRingMesh.scale.setScalar(outerScale);
      midRingMesh.scale.setScalar(midScale);
      glassShellMesh.scale.setScalar(glassScale);
      nodesInstanced.scale.setScalar(1 + currentExploded * 0.34);

      coreMesh.rotation.y += dt * 0.32 * speed;
      coreMesh.rotation.x += dt * 0.18 * speed;
      innerCageMesh.rotation.y -= dt * 0.24 * speed;
      glassShellMesh.rotation.y += dt * 0.14 * speed;

      outerRingMesh.rotation.z += dt * 0.28 * speed;
      midRingMesh.rotation.x += dt * 0.22 * speed;
      innerRingMesh.rotation.y -= dt * 0.38 * speed;
      spindleGroup.rotation.y += dt * 0.22 * speed;
      nodesInstanced.rotation.y = elapsed * 0.15 * speed;

      const targetRotY = pointerRef.current.x * 0.42;
      const targetRotX = -pointerRef.current.y * 0.28;
      rootGroup.rotation.y = THREE.MathUtils.damp(rootGroup.rotation.y, targetRotY, 4, dt);
      rootGroup.rotation.x = THREE.MathUtils.damp(rootGroup.rotation.x, targetRotX, 4, dt);
      rootGroup.position.y = Math.sin(elapsed * 1.1) * 0.06;

      renderer.render(scene, camera);
    }

    function tick(nowMs = performance.now()) {
      if (isDisposed) return;

      if (!isCanvasInView) {
        clock.getDelta(); // prevent large dt jump when re-entering view
        frameId = window.setTimeout(() => {
          if (!isDisposed) frameId = requestAnimationFrame(tick);
        }, 120);
        return;
      }

      if (isSoftwareGl) {
        stepAndRender();
        afterDraw(() => tick(performance.now()));
      } else {
        if (shouldRenderFrameAtFps(lastRenderTimeMs, nowMs, TARGET_FPS)) {
          lastRenderTimeMs = nowMs;
          stepAndRender();
        }
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      isDisposed = true;
      visibilityObserver.disconnect();
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);

      coreGeo.dispose();
      innerCageGeo.dispose();
      glassShellGeo.dispose();
      outerRingGeo.dispose();
      midRingGeo.dispose();
      innerRingGeo.dispose();
      spindleGeo.dispose();
      nodeGeo.dispose();
      brushedBumpMap.dispose();
      shadowTex.dispose();
      envTexture.dispose();

      coreMaterial.dispose();
      goldRingMaterial.dispose();
      obsidianAlloyMaterial.dispose();
      glassShellMaterial.dispose();
      innerCageMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={canvasMountRef}
      data-testid="aether-3d-canvas"
      className={`relative h-full w-full select-none ${className}`}
      aria-label={`Interactive 3D AETHER sculpture displaying ${activeStudy.name} finish`}
    />
  );
};

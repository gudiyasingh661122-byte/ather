import test from 'node:test';
import assert from 'node:assert/strict';
import {
  UPLOADED_VIDEO_CATALOG,
  DIMENSIONAL_WORLDS,
  MATERIAL_UNIVERSE_STUDIES,
  getVideoById,
  shouldVideoPlay,
  createLuxuryPosterDataUri,
} from './videoCatalog';

test('all 6 uploaded video files are registered with local /assets/aistudio/ paths', () => {
  assert.equal(UPLOADED_VIDEO_CATALOG.length, 6);
  for (const video of UPLOADED_VIDEO_CATALOG) {
    assert.ok(video.src.startsWith('/assets/aistudio/'), `Expected local asset path for ${video.id}`);
    assert.ok(video.src.endsWith('.mp4'), `Expected .mp4 extension for ${video.id}`);
    assert.ok(video.subjectAndEnvironment.length > 20);
    assert.ok(video.cameraMovement.length > 10);
    assert.ok(video.lighting.length > 10);
  }
});

test('Dimensional Worlds uses 3 distinct uploaded videos without duplication', () => {
  assert.equal(DIMENSIONAL_WORLDS.length, 3);
  const uniqueSources = new Set(DIMENSIONAL_WORLDS.map((w) => w.src));
  assert.equal(uniqueSources.size, 3, 'Dimensional Worlds must not duplicate the same video');
});

test('Material Universe covers all 5 required luxury material categories', () => {
  const categories = MATERIAL_UNIVERSE_STUDIES.map((m) => m.category);
  assert.deepEqual(categories, [
    'Chrome',
    'Glass',
    'Metallic Reflections',
    'Architecture',
    'Light and Shadow',
  ]);
});

test('shouldVideoPlay enforces viewport visibility, reduced motion, and manual pause', () => {
  assert.equal(
    shouldVideoPlay({ isInViewport: true, prefersReducedMotion: false, isUserPaused: false }),
    true
  );
  assert.equal(
    shouldVideoPlay({ isInViewport: false, prefersReducedMotion: false, isUserPaused: false }),
    false
  );
  assert.equal(
    shouldVideoPlay({ isInViewport: true, prefersReducedMotion: true, isUserPaused: false }),
    false
  );
  assert.equal(
    shouldVideoPlay({ isInViewport: true, prefersReducedMotion: false, isUserPaused: true }),
    false
  );
});

test('getVideoById returns matching video and falls back safely', () => {
  const sphere = getVideoById('monochrome-chrome-sphere');
  assert.equal(sphere.id, 'monochrome-chrome-sphere');
  const fallback = getVideoById('non-existent-id');
  assert.equal(fallback.id, UPLOADED_VIDEO_CATALOG[0].id);
});

test('createLuxuryPosterDataUri produces valid SVG data URI', () => {
  const uri = createLuxuryPosterDataUri('#C6A56B');
  assert.ok(uri.startsWith('data:image/svg+xml;utf8,'));
});

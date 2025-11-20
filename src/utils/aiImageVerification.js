import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

let model = null;

/**
 * Load the COCO-SSD model for object detection
 * @returns {Promise<void>}
 */
export const loadModel = async () => {
  if (!model) {
    try {
      console.log('Loading AI model...');
      model = await cocoSsd.load();
      console.log('AI model loaded successfully!');
    } catch (error) {
      console.error('Error loading AI model:', error);
      throw error;
    }
  }
  return model;
};

/**
 * Categories that indicate garbage or waste-related items
 */
const GARBAGE_RELATED_ITEMS = [
  'bottle',
  'cup',
  'fork',
  'knife',
  'spoon',
  'bowl',
  'banana',
  'apple',
  'sandwich',
  'orange',
  'broccoli',
  'carrot',
  'hot dog',
  'pizza',
  'donut',
  'cake',
  'backpack',
  'umbrella',
  'handbag',
  'tie',
  'suitcase',
  'frisbee',
  'skis',
  'snowboard',
  'sports ball',
  'kite',
  'baseball bat',
  'baseball glove',
  'skateboard',
  'surfboard',
  'tennis racket',
  'wine glass',
  'chair',
  'couch',
  'potted plant',
  'bed',
  'dining table',
  'toilet',
  'tv',
  'laptop',
  'mouse',
  'remote',
  'keyboard',
  'cell phone',
  'microwave',
  'oven',
  'toaster',
  'sink',
  'refrigerator',
  'book',
  'clock',
  'vase',
  'scissors',
  'teddy bear',
  'hair drier',
  'toothbrush',
];

/**
 * Categories that indicate a person/selfie
 */
const PERSON_ITEMS = ['person'];

/**
 * Analyze an image to determine if it contains garbage/waste
 * @param {string} imageDataUrl - Base64 image data URL
 * @returns {Promise<{isValid: boolean, confidence: number, detectedItems: string[], reason: string}>}
 */
export const verifyGarbageImage = async (imageDataUrl) => {
  try {
    // Ensure model is loaded
    if (!model) {
      await loadModel();
    }

    // Create image element from data URL
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageDataUrl;
    });

    // Run detection
    const predictions = await model.detect(img);
    
    console.log('AI Detection Results:', predictions);

    // Check if image is empty or has very few objects
    if (predictions.length === 0) {
      return {
        isValid: false,
        confidence: 0,
        detectedItems: [],
        reason: 'No objects detected in image. Please take a clearer photo.',
      };
    }

    // Extract detected classes
    const detectedClasses = predictions.map(p => p.class.toLowerCase());
    const detectedItems = [...new Set(detectedClasses)]; // Remove duplicates

    // Check if it's a selfie/person photo
    const hasPerson = detectedClasses.some(cls => PERSON_ITEMS.includes(cls));
    if (hasPerson && predictions.length === 1) {
      return {
        isValid: false,
        confidence: predictions[0].score * 100,
        detectedItems: ['person'],
        reason: 'Selfies or photos of people are not allowed. Please photograph the garbage location.',
      };
    }

    // Check for garbage-related items
    const hasGarbageRelated = detectedClasses.some(cls => 
      GARBAGE_RELATED_ITEMS.includes(cls)
    );

    // Calculate confidence (average of all predictions)
    const avgConfidence = predictions.length > 0
      ? (predictions.reduce((sum, p) => sum + p.score, 0) / predictions.length) * 100
      : 0;

    // Accept if we detect garbage-related items OR outdoor scenes with objects
    // (garbage can be in various contexts)
    const isValid = hasGarbageRelated || (predictions.length > 0 && !hasPerson);

    return {
      isValid: isValid || predictions.length >= 2, // Accept if multiple objects detected
      confidence: avgConfidence,
      detectedItems: detectedItems,
      reason: isValid 
        ? 'Image verified! Potential waste items detected.'
        : 'Could not clearly identify waste items. Photo may still be uploaded.',
    };

  } catch (error) {
    console.error('Error verifying image:', error);
    // If AI fails, allow upload anyway (don't block users)
    return {
      isValid: true,
      confidence: 0,
      detectedItems: [],
      reason: 'AI verification unavailable. Photo will be uploaded for manual review.',
    };
  }
};

/**
 * Pre-load the model when the app starts
 */
export const preloadModel = () => {
  // Load in background without blocking
  loadModel().catch(err => {
    console.warn('Failed to preload AI model:', err);
  });
};


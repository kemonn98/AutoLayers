// Helper function to detect semantic context based on layer properties
function getSemanticName(layer: SceneNode, baseType: string): string {
  // For frames, try to detect common UI patterns from existing names
  if (layer.type === 'FRAME') {
    const name = layer.name.toLowerCase();
    
    // Check for common semantic patterns in existing name
    if (name.includes('header') || name.includes('navbar') || name.includes('topbar')) return 'header';
    if (name.includes('footer') || name.includes('bottombar')) return 'footer';
    if (name.includes('sidebar') || name.includes('aside')) return 'sidebar';
    if (name.includes('hero')) return 'hero';
    if (name.includes('card')) return 'card';
    if (name.includes('modal') || name.includes('dialog') || name.includes('popup')) return 'modal';
    if (name.includes('section')) return 'section';
    if (name.includes('wrapper')) return 'wrapper';
    if (name.includes('grid')) return 'grid';
    if (name.includes('list')) return 'list';
  }
  
  // For rectangles, try to detect buttons or cards
  if (layer.type === 'RECTANGLE') {
    const name = layer.name.toLowerCase();
    if (name.includes('button') || name.includes('btn') || name.includes('cta')) return 'button';
    if (name.includes('card')) return 'card';
    if (name.includes('badge') || name.includes('tag') || name.includes('chip')) return 'badge';
    if (name.includes('avatar') || name.includes('profile')) return 'avatar';
    if (name.includes('input') || name.includes('field')) return 'input';
  }
  
  return baseType;
}

function renameLayer(layer: SceneNode) {
  let typeName = '';

  // Determine the type of the layer with enhanced semantic detection
  switch (layer.type) {
    case 'TEXT':
      return; // Keep text layer names as is
      
    case 'RECTANGLE':
      if (layer.fills && Array.isArray(layer.fills)) {
        const hasImageFill = layer.fills.some(fill => fill.type === 'IMAGE');
        if (hasImageFill) {
          typeName = 'img';
        } else {
          // Check dimensions for common UI patterns
          const width = layer.width;
          const height = layer.height;
          
          // Detect common UI elements by dimensions
          if (height <= 50 && width >= 60 && width <= 300) {
            typeName = 'button'; // Button-like proportions
          } else if (height <= 5 || width <= 5) {
            typeName = 'divider'; // Very thin = divider
          } else if (width <= 100 && height <= 100 && Math.abs(width - height) <= 20) {
            typeName = 'avatar'; // Small square-ish shapes
          } else {
            typeName = 'box';
          }
        }
      } else {
        typeName = 'box';
      }
      break;
      
    case 'ELLIPSE':
      // Check if it's small and circular (likely an avatar or badge)
      if (layer.width === layer.height && layer.width <= 100) {
        typeName = 'avatar';
      } else {
        typeName = 'circle';
      }
      break;
      
    case 'POLYGON':
      typeName = 'shape';
      break;
      
    case 'STAR':
      typeName = 'icon';
      break;
      
    case 'VECTOR':
      typeName = 'icon'; // Most vectors are icons in modern UI
      break;
      
    case 'LINE':
      typeName = 'divider';
      break;
      
    case 'FRAME':
      // Enhanced auto layout detection with semantic naming
      if (layer.layoutMode === 'HORIZONTAL') {
        // Check for common horizontal patterns
        if ('children' in layer && layer.children.length > 0) {
          const childNames = layer.children.map(child => child.name.toLowerCase());
          const hasButtons = childNames.some(name => name.includes('button') || name.includes('btn'));
          const hasNav = childNames.some(name => name.includes('nav') || name.includes('menu'));
          
          if (hasButtons) {
            typeName = 'button-group';
          } else if (hasNav) {
            typeName = 'nav';
          } else {
            typeName = 'flex-row'; // Modern flexbox terminology
          }
        } else {
          typeName = 'flex-row';
        }
      } else if (layer.layoutMode === 'VERTICAL') {
        // Stack is the modern term for vertical layouts (aligns with design systems)
        typeName = 'stack';
      } else {
        // No auto layout - it's a positioned container
        typeName = 'container';
      }
      break;
      
    case 'GROUP':
      typeName = 'group';
      break;
      
    case 'INSTANCE':
      // Keep original instance name as it references a component
      return;
      
    case 'COMPONENT':
      // Keep component names as is
      return;
      
    case 'BOOLEAN_OPERATION':
      typeName = 'icon'; // Boolean operations are typically used for icons
      break;
      
    case 'COMPONENT_SET':
      // Keep variant names as is
      return;
      
    case 'SLICE':
      typeName = 'slice';
      break;
      
    default:
      typeName = 'node';
  }
  
  // Apply semantic detection to get more meaningful names based on context
  typeName = getSemanticName(layer, typeName);

  // Rename the layer based on its semantic type
  layer.name = typeName;
}

// Recursive function to rename all child layers within frames or groups
function renameLayers(layers: readonly SceneNode[]) {
  layers.forEach(layer => {
    renameLayer(layer);

    // Recursively rename layers within frames or groups
    if ('children' in layer) {
      renameLayers(layer.children);
    }
  });
}

// Function to rename selected objects directly (not just frames)
function renameSelectedObjects(selectedObjects: readonly SceneNode[]) {
  selectedObjects.forEach(layer => {
    renameLayer(layer);

    // If the selected object has children (e.g., Frame or Group), rename them recursively
    if ('children' in layer) {
      renameLayers(layer.children);
    }
  });
}

// Show the UI with specific width and height
figma.showUI(__html__, { width: 320, height: 240 });

// Listen for messages from the UI
figma.ui.onmessage = async (msg: { type: string }) => {
  if (msg.type === 'rename-layers') {
    const selectedObjects = figma.currentPage.selection;

    if (selectedObjects.length > 0) {
      // Rename selected objects and their children (if any)
      renameSelectedObjects(selectedObjects);

      // Send a message back to the UI to indicate completion
      figma.ui.postMessage({ status: 'complete' });
    } else {
      figma.notify("Please select at least one object.");
      figma.ui.postMessage({ status: 'error' });
    }
  }
};

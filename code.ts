// Helper function to detect semantic context based on layer properties
function getSemanticName(layer: SceneNode, baseType: string): string {
  // For frames, try to detect common UI patterns from existing names
  if (layer.type === 'FRAME') {
    const name = layer.name.toLowerCase();

    // Layout & structure
    if (name.includes('header') || name.includes('topbar')) return 'header';
    if (name.includes('footer') || name.includes('bottombar')) return 'footer';
    if (name.includes('sidebar') || name.includes('aside')) return 'sidebar';
    if (name.includes('section')) return 'section';
    if (name.includes('wrapper') || name.includes('container')) return 'wrapper';
    if (name.includes('grid')) return 'grid';
    if (name.includes('list')) return 'list';

    // Interactive components
    if (name.includes('btn') || name.includes('button')) return 'button';
    if (name.includes('link')) return 'link';
    if (name.includes('nav') || name.includes('menu')) return 'nav';
    if (name.includes('tab')) return 'tab';
    if (name.includes('dropdown') || name.includes('select')) return 'dropdown';
    if (name.includes('checkbox') || name.includes('check')) return 'checkbox';
    if (name.includes('radio')) return 'radio';
    if (name.includes('switch') || name.includes('toggle')) return 'switch';
    if (name.includes('accordion')) return 'accordion';

    // Content & media
    if (name.includes('img') || name.includes('image') || name.includes('photo') || name.includes('picture') || name.includes('thumbnail')) return 'img';
    if (name.includes('icon')) return 'icon';
    if (name.includes('avatar')) return 'avatar';
    if (name.includes('badge') || name.includes('tag') || name.includes('chip')) return 'badge';

    // Forms & inputs
    if (name.includes('input') || name.includes('field') || name.includes('form')) return 'input';
    if (name.includes('label')) return 'label';
    if (name.includes('search')) return 'search';
    if (name.includes('filter')) return 'filter';

    // Overlays & feedback
    if (name.includes('modal') || name.includes('dialog') || name.includes('popup')) return 'modal';
    if (name.includes('tooltip')) return 'tooltip';
    if (name.includes('toast') || name.includes('snackbar')) return 'toast';
    if (name.includes('alert') || name.includes('banner')) return 'alert';
    if (name.includes('spinner') || name.includes('loader')) return 'spinner';
    if (name.includes('skeleton')) return 'skeleton';

    // Cards & blocks
    if (name.includes('hero')) return 'hero';
    if (name.includes('card')) return 'card';
    if (name.includes('divider') || name.includes('separator')) return 'divider';
    if (name.includes('breadcrumb')) return 'breadcrumb';
    if (name.includes('pagination')) return 'pagination';
  }
  
  // For rectangles, try to detect cards, badges, etc (but not buttons - those are frames)
  if (layer.type === 'RECTANGLE') {
    const name = layer.name.toLowerCase();
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
      // Type assertion for RectangleNode which has width/height properties
      if ('width' in layer && 'height' in layer) {
        if (layer.fills && Array.isArray(layer.fills)) {
          const hasImageFill = layer.fills.some(fill => fill.type === 'IMAGE');
          if (hasImageFill) {
            typeName = 'img';
          } else {
            // Check dimensions for common UI patterns
            const width = layer.width;
            const height = layer.height;
            
            // Detect common UI elements by dimensions
            if (height <= 3 || width <= 3) {
              typeName = 'divider'; // Very thin = divider/separator
            } else {
              typeName = 'square';
            }
          }
        } else {
          typeName = 'square';
        }
      } else {
        typeName = 'square';
      }
      break;
      
    case 'ELLIPSE':
      typeName = 'circle';
      break;
      
    case 'POLYGON':
      typeName = 'polygon';
      break;
      
    case 'STAR':
      typeName = 'star';
      break;
      
    case 'VECTOR':
      if ('width' in layer && 'height' in layer && (layer.width === 0 || layer.height === 0)) {
        typeName = 'divider';
      } else {
        typeName = 'vector'; // Most vectors are icons in modern UI
      }
      break;
      
    case 'LINE':
      typeName = 'divider';
      break;
      
    case 'FRAME':
      // Check if this is a top-level frame (artboard/screen)
      if ('parent' in layer && layer.parent && layer.parent.type === 'PAGE' && 'width' in layer) {
        const width = Math.round(layer.width);
        
        // Detect device type by width range
        if (width >= 1025) {
          typeName = `[frame-${width}]`;
        } else if (width >= 601 && width <= 1024) {
          typeName = `[frame-${width}]`;
        } else if (width <= 600) {
          typeName = `[frame-${width}]`;
        } else {
          // Fallback (shouldn't reach here)
          typeName = `[frame-${width}]`;
        }
      }
      // Enhanced auto layout detection with semantic naming (for nested frames)
      else if (layer.layoutMode === 'HORIZONTAL') {
        typeName = 'flex-row';
      } else if (layer.layoutMode === 'VERTICAL') {
        // Stack is the modern term for vertical layouts (aligns with design systems)
        typeName = 'flex-col';
      } else {
        // No auto layout - it's a positioned container
        typeName = 'frame';
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

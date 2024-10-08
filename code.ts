function renameLayer(layer: SceneNode) {
  let typeName = '';

  // Determine the type of the layer
  switch (layer.type) {
    case 'TEXT':
      return;
    case 'RECTANGLE':
      if (layer.fills && Array.isArray(layer.fills)) {
        const hasImageFill = layer.fills.some(fill => fill.type === 'IMAGE');
        if (hasImageFill) {
          typeName = 'image';
        } else {
          typeName = 'rectangle';
        }
      } else {
        typeName = 'rectangle';
      }
      break;
    case 'ELLIPSE':
      typeName = 'ellipse';
      break;
    case 'POLYGON':
      typeName = 'polygon';
      break;
    case 'STAR':
      typeName = 'star';
      break;
    case 'VECTOR':
      typeName = 'vector';
      break;
    case 'LINE':
      typeName = 'line';
      break;
    case 'FRAME':
      // Handle auto layout mode
      if (layer.layoutMode === 'HORIZONTAL') {
        typeName = 'layout-column';
      } else if (layer.layoutMode === 'VERTICAL') {
        typeName = 'layout-row';
      } else {
        typeName = 'frame';
      }
      break;
    case 'GROUP':
      typeName = 'group';
      break;
    case 'INSTANCE':
      typeName = 'instance';
      break;
    case 'COMPONENT':
      typeName = 'component';
      break;
    case 'BOOLEAN_OPERATION':
      typeName = 'boolean-operation';
      break;
    case 'COMPONENT_SET':
      typeName = 'component-set';
      break;
    case 'SLICE':
      typeName = 'slice';
      break;
    default:
      typeName = 'layer';
  }

  // Rename the layer based on its type
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

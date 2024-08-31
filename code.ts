function renameLayer(layer: SceneNode) {
  let typeName = '';

  // Determine the type of the layer
  switch (layer.type) {
    case 'TEXT':
      return;
    case 'RECTANGLE':
      typeName = 'rectangle';
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
        typeName = 'layout-row';
      } else if (layer.layoutMode === 'VERTICAL') {
        typeName = 'layout-column';
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

// Recursive function to rename all layers in a given node
function renameLayers(layers: readonly SceneNode[]) {
  layers.forEach(layer => {
    renameLayer(layer);

    // Recursively rename layers within frames or groups
    if ('children' in layer) {
      renameLayers(layer.children);
    }
  });
}

// Function to rename the frame based on its layout mode
function renameFrame(frame: FrameNode) {
  if (frame.layoutMode === 'HORIZONTAL') {
    frame.name = 'layout-row';
  } else if (frame.layoutMode === 'VERTICAL') {
    frame.name = 'layout-column';
  } else {
    frame.name = 'frame';
  }
}

// Show the UI with specific width and height
figma.showUI(__html__, { width: 320, height: 240 });

// Listen for messages from the UI
figma.ui.onmessage = async (msg: { type: string }) => {
  if (msg.type === 'rename-layers') {
    const selectedObjects = figma.currentPage.selection;

    // Check if any selected objects are frames
    const selectedFrames = selectedObjects.filter(obj => obj.type === 'FRAME') as FrameNode[];

    if (selectedFrames.length > 0) {
      // Process each selected frame
      selectedFrames.forEach(frame => {
        // Rename the frame itself
        renameFrame(frame);

        // Rename layers within the frame
        renameLayers(frame.children);
      });

      // Send a message back to the UI to indicate completion
      figma.ui.postMessage({ status: 'complete' });
    } else {
      figma.notify("Please select at least one frame.");
      figma.ui.postMessage({ status: 'error' });
    }
  }
};

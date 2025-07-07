// src/lib/syncfusion.ts or any shared helper location

// Correctly load CommonJS exports
export async function setupSyncfusionLicense() {
  const basePkg = await import('@syncfusion/ej2-base');
  const { registerLicense } = basePkg;

  if (registerLicense) {
    registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);
  } else {
    console.warn("registerLicense not found in ej2-base");
  }
}

// syncfusion.ts
export async function getSidebarComponent(): Promise<React.ComponentType<any>> {
  const navPkg = await import('@syncfusion/ej2-react-navigations');
  return navPkg.SidebarComponent;
}


let chipPkg: any;

export const getChipComponents = async () => {
  if (!chipPkg) {
    chipPkg = await import('@syncfusion/ej2-react-buttons');
  }
  return {
    ChipListComponent: chipPkg.ChipListComponent,
    ChipsDirective: chipPkg.ChipsDirective,
    ChipDirective: chipPkg.ChipDirective,
  };
};

let ButtonComponent: any = null;

export const getButtonComponent = async () => {
  if (!ButtonComponent) {
    const pkg = await import("@syncfusion/ej2-react-buttons");
    ButtonComponent = pkg.ButtonComponent;
  }
  return ButtonComponent;
};



import * as grids from '@syncfusion/ej2-react-grids';


export const {
  GridComponent,
  ColumnsDirective,
  ColumnDirective
 
} = grids;

// syncfusion.ts

import * as SyncfusionDropdowns from '@syncfusion/ej2-react-dropdowns';

export const ComboBox = SyncfusionDropdowns.ComboBoxComponent;
export const DropDownList = SyncfusionDropdowns.DropDownListComponent;


// syncfusion.ts

import * as Syncfusionmap from '@syncfusion/ej2-react-maps';

export const MapsComponent = Syncfusionmap.MapsComponent;
export const LayersDirective = Syncfusionmap.LayersDirective;
export const LayerDirective = Syncfusionmap.LayerDirective;

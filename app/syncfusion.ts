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


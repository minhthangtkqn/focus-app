import { Module } from "@/__lib__/layout";
import {
    SampleListPanel,
    SampleListPanelInfo,
    SampleDetailPanel,
    SampleDetailPanelInfo,
} from "./panel";

export const SampleModuleInfo = {
    name: 'sample-module' as const,
};

export const setupSampleModule = () => {
    const newModule = new Module(SampleModuleInfo.name);
    newModule.setupPanel({
        panelKey: SampleListPanelInfo.name,
        PanelComponent: SampleListPanel,
    });
    newModule.setupPanel({
        panelKey: SampleDetailPanelInfo.name,
        PanelComponent: SampleDetailPanel,
    });
    return newModule;
};

export { SampleListPanelInfo, SampleDetailPanelInfo } from './panel';

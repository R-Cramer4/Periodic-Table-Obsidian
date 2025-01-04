import { StrictMode } from 'react';
import { Root, createRoot } from 'react-dom/client';
import { PeriodicTable } from 'src/PeriodicTable';

import {Plugin, ItemView, WorkspaceLeaf} from 'obsidian';

export const PERIODIC_VIEW = "periodic-view";

export default class MyPlugin extends Plugin{
	onload(){
		const infoView = this.app.workspace.getLeavesOfType(PERIODIC_VIEW)[0];
		if(!infoView){
			this.registerView(
				PERIODIC_VIEW,
				(leaf) => new PeriodicView(leaf)
			);
		}
        this.activateView();
	}

	onunload(){
	}

	async activateView(){
		await this.app.workspace.getRightLeaf(false).setViewState({
			type: PERIODIC_VIEW,
			active: false
		});
	}
}

export class PeriodicView extends ItemView{
    root: Root | null = null;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return PERIODIC_VIEW;
	}

	getDisplayText() {
		return "Periodic table";
	}

	async onOpen() {
        this.root = createRoot(this.containerEl.children[1]);
        this.root.render(
            <StrictMode>
                <PeriodicTable />
            </StrictMode>
        );
	}

	async onClose() {
        this.root?.unmount();
	}
}

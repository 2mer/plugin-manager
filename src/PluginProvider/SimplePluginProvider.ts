import IPluginProvider from '../types/IPluginProvider';

// provides plugins given in the constructor
export default class SimplePluginProvider<T> implements IPluginProvider<T> {
	plugins: T[];

	constructor(...plugins: T[]) {
		this.plugins = plugins;
	}

	async providePlugins(): Promise<T[]> {
		return this.plugins;
	}
}

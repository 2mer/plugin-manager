import IPluginProvider from '../types/IPluginProvider';

export default class ImportPluginProvider<T> implements IPluginProvider<T> {
	pluginsPaths: string[];

	constructor(...pluginPaths: string[]) {
		this.pluginsPaths = pluginPaths;
	}

	async providePlugins(): Promise<T[]> {
		const plugins = await Promise.all(
			this.pluginsPaths.map((path) => import(path))
		);

		return plugins;
	}
}

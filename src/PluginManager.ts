import IPluginProvider from './types/IPluginProvider';

export default class PluginManager<T> {
	plugins: T[] = [];

	async registerPlugins(...pluginLoaders: IPluginProvider<T>[]) {
		// first we register all plugins
		const loaderPlugins = await Promise.all(
			pluginLoaders.map((loader) => loader.providePlugins())
		);

		// flatten
		const plugins = loaderPlugins.reduce((acc, curr) => {
			return acc.concat(curr);
		}, []);

		this.plugins.concat(plugins);
	}
}

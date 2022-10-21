import IPluginProvider from '../types/IPluginProvider';

export interface IMiddlewarePluginProviderOptions<T> {
	onPluginsProvided: (
		plugins: T[],
		pluginProvider: IPluginProvider<T>,
		index: number
	) => T[];

	pluginProviders: IPluginProvider<T>[];
}

// provides plugins given in the constructor
export default class MiddlewarePluginProvider<T> implements IPluginProvider<T> {
	options: IMiddlewarePluginProviderOptions<T>;

	constructor(options: IMiddlewarePluginProviderOptions<T>) {
		this.options = options;
	}

	async providePlugins(): Promise<T[]> {
		const plugins = await Promise.all(
			this.options.pluginProviders.map((pluginProvider, index) =>
				pluginProvider
					.providePlugins()
					.then((plugins) =>
						this.options.onPluginsProvided(
							plugins,
							pluginProvider,
							index
						)
					)
			)
		);
		return plugins.reduce((acc, curr) => acc.concat(curr), []);
	}
}

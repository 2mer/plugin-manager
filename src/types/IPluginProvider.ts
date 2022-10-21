export default interface IPluginProvider<T> {
	providePlugins(): Promise<T[]>;
}

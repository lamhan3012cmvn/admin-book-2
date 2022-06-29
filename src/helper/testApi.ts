export const testApi = async (cb: () => any) => {
	const result = await cb();
	console.log(result);
};

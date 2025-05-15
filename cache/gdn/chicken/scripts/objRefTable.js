const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Timeline,
		C3.Plugins.Sprite,
		C3.Plugins.Text,
		C3.Plugins.Audio,
		C3.Plugins.Sprite.Cnds.IsVisible,
		C3.Plugins.Audio.Acts.Play
	];
};
self.C3_JsPropNameTable = [
	{DefineAnimation: 0},
	{Chicken: 0},
	{DefineText: 0},
	{Audio: 0}
];

self.InstanceType = {
	DefineAnimation: class extends self.IInstance {},
	Chicken: class extends self.ISpriteInstance {},
	DefineText: class extends self.ITextInstance {},
	Audio: class extends self.IInstance {}
}
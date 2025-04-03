const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Behaviors.Physics,
		C3.Behaviors.Bullet,
		C3.Plugins.TiledBg,
		C3.Behaviors.solid
	];
};
self.C3_JsPropNameTable = [
	{Physics: 0},
	{Bullet: 0},
	{User: 0},
	{Phone: 0},
	{Solid: 0},
	{TiledBackground3: 0}
];

self.InstanceType = {
	User: class extends self.ISpriteInstance {},
	Phone: class extends self.ISpriteInstance {},
	TiledBackground3: class extends self.ITiledBackgroundInstance {}
}
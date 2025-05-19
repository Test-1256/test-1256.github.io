const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Gritsenko_Spine,
		C3.Behaviors.DragnDrop,
		C3.Behaviors.Sin,
		C3.Plugins.Keyboard,
		C3.Plugins.Sprite,
		C3.Plugins.Gritsenko_Spine.Cnds.OnSkeletonLoaded,
		C3.Plugins.Gritsenko_Spine.Acts.SetHeight,
		C3.Plugins.Gritsenko_Spine.Exps.TextureHeight,
		C3.Plugins.Gritsenko_Spine.Acts.SetWidth,
		C3.Plugins.Gritsenko_Spine.Exps.TextureWidth,
		C3.Plugins.Keyboard.Cnds.OnKey,
		C3.Plugins.Gritsenko_Spine.Cnds.CompareInstanceVar,
		C3.Plugins.Gritsenko_Spine.Acts.CreateCustomSkin,
		C3.Plugins.Gritsenko_Spine.Acts.AddCustomSkin,
		C3.Plugins.Gritsenko_Spine.Acts.SetCustomSkin,
		C3.Plugins.Gritsenko_Spine.Acts.SetSlotColor,
		C3.Plugins.System.Exps.rgba,
		C3.Plugins.Gritsenko_Spine.Acts.ApplySlotColors,
		C3.Plugins.System.Cnds.For,
		C3.Plugins.Gritsenko_Spine.Acts.SetSkin,
		C3.Plugins.System.Cnds.EveryTick,
		C3.Plugins.Gritsenko_Spine.Acts.SetEffectParam,
		C3.Behaviors.Sin.Exps.Value
	];
};
self.C3_JsPropNameTable = [
	{id: 0},
	{DragDrop: 0},
	{Sine: 0},
	{Spine: 0},
	{Keyboard: 0},
	{Sprite: 0}
];

self.InstanceType = {
	Spine: class extends self.IWorldInstance {},
	Keyboard: class extends self.IInstance {},
	Sprite: class extends self.ISpriteInstance {}
}
const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Plugins.video,
		C3.Plugins.SVGPicture,
		C3.Behaviors.Physics,
		C3.Plugins.iframe,
		C3.Plugins.Sprite.Cnds.IsVisible,
		C3.Plugins.video.Acts.Play
	];
};
self.C3_JsPropNameTable = [
	{Foots: 0},
	{Body: 0},
	{Head: 0},
	{Video: 0},
	{Physics: 0},
	{SVGPicture: 0},
	{iframe: 0}
];

self.InstanceType = {
	Foots: class extends self.ISpriteInstance {},
	Body: class extends self.ISpriteInstance {},
	Head: class extends self.ISpriteInstance {},
	Video: class extends self.IWorldInstance {},
	SVGPicture: class extends self.ISVGPictureInstance {},
	iframe: class extends self.IIframeInstance {}
}
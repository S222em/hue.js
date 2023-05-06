import { ApiResourceType } from '../ApiResourceType';
import { ResourceIdentifier } from '../ResourceIdentifier';

export interface ApiScenePost {
	type?: ApiResourceType.Scene;
	metadata?: { name: string; image?: ResourceIdentifier };
	group: ResourceIdentifier;
	actions: Array<{
		target: ResourceIdentifier;
		action: {
			on?: { on: boolean };
			dimming?: { brightness: number };
			color?: { xy: { x: number; y: number } };
			color_temperature?: { mirek: number };
			gradient?: {
				points: Array<{
					color: { xy: { x: number; y: number } };
				}>;
			};
			effects?: 'fire' | 'candle' | 'no_effect';
			dynamics?: {
				duration: number;
			};
		};
	}>;
	palette?: {
		color: Array<{
			color: { xy: { x: number; y: number } };
			dimming: { brightness: number };
		}>;
		dimming: { brightness: number };
		color_temperature: { color_temperature: { mirek: number }; dimming: { brightness: number } };
	};
	speed?: number;
}

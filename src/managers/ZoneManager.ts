import type { Bridge } from '../bridge/Bridge';
import { Zone } from '../structures/Zone';
import { ResourceManager } from './ResourceManager';
import type { ApiZone } from '../types/api';
import { Routes } from '../util/Routes';
import Collection from '@discordjs/collection';

export class ZoneManager extends ResourceManager<Zone> {
	public readonly cache: Collection<string, Zone>;

	public constructor(bridge: Bridge) {
		super(bridge, { maxRequests: 1, perMilliseconds: 1000 });
		this.cache = new Collection();
	}

	public _add(data: ApiZone): Zone {
		const zone = this.cache.ensure(data.id, () => new Zone(this.bridge));
		zone._patch(data);
		return zone;
	}

	public async fetch(id?: string): Promise<boolean | void> {
		const response = await this.rest.get(Routes.zone(id));
		const data = response.data.data as ApiZone[];
		data.forEach((data) => {
			this._add(data);
		});
	}
}

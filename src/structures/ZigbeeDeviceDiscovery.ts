import { Resource } from './Resource';
import { APIResourceType } from '../api/ResourceType';
import { ZigbeeDeviceDiscoveryManager } from '../managers/ZigbeeDeviceDiscoveryManager';

export enum ZigbeeDeviceDiscoveryStatus {
	Active = 'active',
	Ready = 'ready',
}

export enum ZigbeeDeviceDiscoveryActionType {
	Search = 'search',
}

export interface ZigbeeDeviceDiscoveryEdit {
	actionType: ZigbeeDeviceDiscoveryActionType;
}

export class ZigbeeDeviceDiscovery extends Resource<APIResourceType.ZigbeeDeviceDiscovery> {
	type = APIResourceType.ZigbeeDeviceDiscovery;

	get manager(): ZigbeeDeviceDiscoveryManager {
		return this.hue.zigbeeDeviceDiscoveries;
	}

	get ownerId(): string {
		return this.data.owner.rid;
	}

	get status(): ZigbeeDeviceDiscoveryStatus {
		return this.data.status as ZigbeeDeviceDiscoveryStatus;
	}

	public async edit(options: ZigbeeDeviceDiscoveryEdit) {
		await this.manager.edit(this.id, options);
	}
}

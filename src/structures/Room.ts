import { ResourceType } from '../api/ResourceType';
import { ArcheTypeResource, ArcheTypeResourceEditOptions } from './ArcheTypeResource';
import { RoomManager } from '../managers/RoomManager';
import { createResourceIdentifier } from '../util/resourceIdentifier';
import { ZoneEditOptions } from './Zone';

export interface RoomEditOptions extends ArcheTypeResourceEditOptions {
	children?: string[];
}

export type RoomCreateOptions = Required<RoomEditOptions>;

export class Room extends ArcheTypeResource<ResourceType.Room> {
	type = ResourceType.Room;

	get manager(): RoomManager {
		return this.bridge.rooms;
	}

	get childIds(): string[] {
		return this.data.children.map((child) => child.rid);
	}

	get serviceIds(): string[] {
		return this.data.services.map((service) => service.rid);
	}

	public async addChildren(children: Required<ZoneEditOptions>['children']): Promise<void> {
		const newChildren = [...this.childIds, ...children];

		await this.setChildren(newChildren);
	}

	public async removeChildren(children: Required<ZoneEditOptions>['children']): Promise<void> {
		const newChildren = this.childIds.filter((id) => !children.includes(id));

		await this.setChildren(newChildren);
	}

	public async setChildren(children: Required<ZoneEditOptions>['children']): Promise<void> {
		await this.edit({ children });
	}
	public async edit(options: RoomEditOptions): Promise<void> {
		await this.manager._put(this.id, {
			metadata: { name: options.name, archetype: options.archeType },
			children: options.children?.map?.((child) => {
				return createResourceIdentifier(child, ResourceType.Light);
			}),
		});
	}

	public async delete(): Promise<void> {
		await this.manager._delete(this.id);
	}
}

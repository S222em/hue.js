import type { Bridge } from '../bridge/Bridge';
import type { AxiosInstance } from 'axios';
import axiosRateLimit from 'axios-rate-limit';
import { BaseManager } from './BaseManager';

export class ResourceManager<Resource> extends BaseManager<Resource> {
	/**
	 * Used to send requests to a specific resource
	 * @internal
	 */
	public rest: AxiosInstance;

	constructor(bridge: Bridge, rateLimitOptions: { maxRequests: number; perMilliseconds: number }) {
		super(bridge);
		this.rest = axiosRateLimit(bridge.rest, rateLimitOptions);
	}
}

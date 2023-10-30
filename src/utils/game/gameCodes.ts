import { gameCodeValue } from 'constant'

const gameCodes = {
	[gameCodeValue.mobileLegend]: {
		build(): string {
			return `${this.userId}|${this.zoneId}`
		},
		userId: '',
		zoneId: ''
	},
	[gameCodeValue.ragnarok]: {
		build: (): string => '',
		init: (userid: string, serverid: string): string => `${userid}|${serverid}`
	},
	[gameCodeValue.pointBlank]: {
		build: (): string => '',
		init: (userid: string): string => userid
	},
	[gameCodeValue.freeFire]: {
		build: (): string => '',
		init: (userid: string): string => userid
	},
	[gameCodeValue.speedDrifters]: {
		build: (): string => '',
		init: (userid: string): string => userid
	},
	[gameCodeValue.arenaOfValor]: {
		build: (): string => '',
		init: (userid: string): string => userid
	},
	[gameCodeValue.bleachMobile_3D]: {
		build: (): string => '',
		init: (rolename: string, userid: string, serverid: string): string =>
			`${rolename}|${userid}|${serverid}`
	},
	[gameCodeValue.eraOfCelestial]: {
		build: (): string => '',
		init: (rolename: string, userid: string, serverid: string): string =>
			`${rolename}|${userid}|${serverid}`
	},
	[gameCodeValue.dragonNest]: {
		build: (): string => '',
		init: (rolename: string, serverid: string): string =>
			`${rolename}|${serverid}`
	},
	[gameCodeValue.bleachMobile]: {
		build: (): string => '',
		init: (userid: string): string => userid
	},
	[gameCodeValue.marvelSuperWar]: {
		build: (): string => '',
		init: (userid: string): string => userid
	},
	[gameCodeValue.lightOfThelGloryOfCepheus]: {
		build: (): string => '',
		init: (userid: string): string => userid
	},
	[gameCodeValue.lordsMobile]: {
		build: (): string => '',
		init: (userid: string): string => userid
	},
	[gameCodeValue.lifeAfter]: {
		build: (): string => '',
		init: (userid: string, serverid: string): string => `${userid}|${serverid}`
	},
	[gameCodeValue.genshinImpact]: {
		build(): string {
			return `${this.userId}|${this.serverId}`
		},
		userId: '',
		serverId: ''
	},
	[gameCodeValue.loLWildRift]: {
		build: (): string => '',
		init: (userid: string, tag: string): string => `${userid}|${tag}`
	}
}

export default gameCodes

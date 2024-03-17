import {
	PUBLIC_BASE_URL,
	PUBLIC_LAST_COMMIT,
	PUBLIC_LAST_COMMIT_TS,
	PUBLIC_TAG,
	PUBLIC_SHOW_VERSION
} from '$env/static/public';

export const siteConfig = {
	name: 'OBE',
	url: PUBLIC_BASE_URL,
	ogImage: `${PUBLIC_BASE_URL}/og.png`,
	description: 'Outcome Based Education di Fisika UIN Bandung',
	keywords: `bosgrid,bosapi,merdika,obe`,
	showVersion: PUBLIC_SHOW_VERSION === 'true' || false,
	version: PUBLIC_TAG,
	lastCommit: PUBLIC_LAST_COMMIT,
	lastCommitTs: PUBLIC_LAST_COMMIT_TS
};

export type SiteConfig = typeof siteConfig;

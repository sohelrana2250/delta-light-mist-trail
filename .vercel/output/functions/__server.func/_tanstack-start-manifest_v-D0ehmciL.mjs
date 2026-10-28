//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-D0ehmciL.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/account",
			"/post",
			"/info/$slug",
			"/listing/$id"
		],
		preloads: [
			"/assets/index-gwcwLiza.js",
			"/assets/rolldown-runtime-CbXtAM7H.js",
			"/assets/dist-Cgq8PNMQ.js",
			"/assets/preload-helper-mgDei8v9.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-gwcwLiza.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-BsRi1B2P.js",
			"/assets/badge-check-DCupQyeh.js",
			"/assets/chrome-BsNZ7n66.js",
			"/assets/utils-g8nGmOwD.js"
		]
	},
	"/account": {
		filePath: "/workspace/src/routes/account.tsx",
		children: void 0,
		preloads: [
			"/assets/account-DOJ8b3Jd.js",
			"/assets/trash-2-DiviB0_R.js",
			"/assets/chrome-BsNZ7n66.js",
			"/assets/utils-g8nGmOwD.js",
			"/assets/confirm-dialog-B-WS6WxZ.js"
		]
	},
	"/post": {
		filePath: "/workspace/src/routes/post.tsx",
		children: ["/post/$id"],
		preloads: ["/assets/post-DU75CBYI.js", "/assets/post-screen-D7TtUbS8.js"]
	},
	"/info/$slug": {
		filePath: "/workspace/src/routes/info.$slug.tsx",
		children: void 0,
		preloads: ["/assets/info._slug-CIaQPn9-.js", "/assets/chrome-BsNZ7n66.js"]
	},
	"/listing/$id": {
		filePath: "/workspace/src/routes/listing.$id.tsx",
		children: void 0,
		preloads: [
			"/assets/listing._id-BZ44TFZ9.js",
			"/assets/badge-check-DCupQyeh.js",
			"/assets/trash-2-DiviB0_R.js",
			"/assets/chrome-BsNZ7n66.js",
			"/assets/utils-g8nGmOwD.js",
			"/assets/confirm-dialog-B-WS6WxZ.js"
		]
	},
	"/post/$id": {
		filePath: "/workspace/src/routes/post.$id.tsx",
		children: void 0,
		preloads: ["/assets/post._id-CWVJRTXV.js"]
	}
} });
//#endregion
export { tsrStartManifest };

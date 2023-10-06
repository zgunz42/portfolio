if (!self.define) {
	let e,
		a = {}
	const i = (i, n) => (
		(i = new URL(i + '.js', n).href),
		a[i] ||
			new Promise(a => {
				if ('document' in self) {
					const e = document.createElement('script')
					;(e.src = i), (e.onload = a), document.head.appendChild(e)
				} else (e = i), importScripts(i), a()
			}).then(() => {
				let e = a[i]
				if (!e) throw new Error(`Module ${i} didn’t register its module`)
				return e
			})
	)
	self.define = (n, s) => {
		const r =
			e ||
			('document' in self ? document.currentScript.src : '') ||
			location.href
		if (a[r]) return
		let d = {}
		const c = e => i(e, r),
			o = { module: { uri: r }, exports: d, require: c }
		a[r] = Promise.all(n.map(e => o[e] || c(e))).then(e => (s(...e), d))
	}
}
define(['./workbox-756d4611'], function (e) {
	'use strict'
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: '/_data/en-US/articles/anime-i-watch-everyweek.json',
					revision: 'a3aebba2e1c30f607b14c3134fc1cc4a'
				},
				{
					url: '/_data/en-US/articles/best-nodejs-framework.json',
					revision: 'ed66e7480c7dd8608bd1a4c47f844dc9'
				},
				{
					url: '/_data/en-US/articles/convert-image-to-svg.json',
					revision: '5251600d0cb0a759086731073f4bf997'
				},
				{
					url: '/_data/en-US/articles/create-todo-app-with-golang.json',
					revision: 'b6a8254cb72d8bdf41fd4b1736f72cc1'
				},
				{
					url: '/_data/en-US/articles/index-page-1.json',
					revision: 'c952ab7c4879ce834e72a8f6a84ade57'
				},
				{
					url: '/_data/en-US/articles/index-page-2.json',
					revision: '88fd9c8081a5945624826d3ab212115f'
				},
				{
					url: '/_data/en-US/articles/integrate-tailwindcss-with-mantine.json',
					revision: '2ef7fd5134853288d694b2987ef07b3e'
				},
				{
					url: '/_data/en-US/articles/make-awesome-bot-nextjs.json',
					revision: '684395b584998fb15a0c5539e44c2315'
				},
				{
					url: '/_data/en-US/articles/reuse-type-in-typescript.json',
					revision: 'ddffa15d0c0c987c701183618b7063b3'
				},
				{
					url: '/_data/en-US/articles/send-email-using-golang.json',
					revision: 'bc36bdc15ec16c7421bec56e9a1e47a7'
				},
				{
					url: '/_data/en-US/config.json',
					revision: 'ee7ac13f009ccc08b26c73e63da86e82'
				},
				{
					url: '/_data/en-US/projects/android-hot-movie.json',
					revision: '9d64f523490d8774c1d1edf80c55b0d7'
				},
				{
					url: '/_data/en-US/projects/ebalian-chatbot.json',
					revision: 'e80763d3a5cb7863574a0d3be84b3d55'
				},
				{
					url: '/_data/en-US/projects/egg-box.json',
					revision: 'e96698de279b5c9fc0c24d8b78b865f7'
				},
				{
					url: '/_data/en-US/projects/index-page-1.json',
					revision: 'b902a984ebdaa2a0313d09434c1ae5c8'
				},
				{
					url: '/_data/en-US/projects/index-page-2.json',
					revision: '548ce8d651dc08f2e826599829501299'
				},
				{
					url: '/_data/en-US/projects/index-pinned.json',
					revision: 'bd5be35817ebfc827e96e5ebac139999'
				},
				{
					url: '/_data/en-US/projects/otonan.json',
					revision: '60689ce452c32a34b033f095078883d9'
				},
				{
					url: '/_data/en-US/projects/pawiwahan.json',
					revision: '6f365701d43e9b11da268d415df3bed8'
				},
				{
					url: '/_data/en-US/projects/slideit.json',
					revision: '7dd16bd110dde5d67928823c2772ebe9'
				},
				{
					url: '/_data/id-ID/articles/anime-i-watch-everyweek.json',
					revision: 'f9e98899485a7e28fd0822a7318343e2'
				},
				{
					url: '/_data/id-ID/articles/best-nodejs-framework.json',
					revision: 'a958179f6067ffa7335722437b679da3'
				},
				{
					url: '/_data/id-ID/articles/convert-image-to-svg.json',
					revision: '6a4e69ece69414d396b9a1a184fb5235'
				},
				{
					url: '/_data/id-ID/articles/create-todo-app-with-golang.json',
					revision: 'eef0a02703f13e246da1aac57e34e16a'
				},
				{
					url: '/_data/id-ID/articles/index-page-1.json',
					revision: '11712b81ba1f99a03e9d50caae350b3c'
				},
				{
					url: '/_data/id-ID/articles/index-page-2.json',
					revision: '2c1c407637113012a9272e23183adcf7'
				},
				{
					url: '/_data/id-ID/articles/integrate-tailwindcss-with-mantine.json',
					revision: '7e4aef171a037ab32ff253b77056db96'
				},
				{
					url: '/_data/id-ID/articles/make-awesome-bot-nextjs.json',
					revision: 'fdccc16d51262a179572b4f1e405c271'
				},
				{
					url: '/_data/id-ID/articles/reuse-type-in-typescript.json',
					revision: '9bcf1c43da2d1b281f0df9c0efe9c4d6'
				},
				{
					url: '/_data/id-ID/articles/send-email-using-golang.json',
					revision: '75a9bb5bec367d26c828bb1e41ed45ce'
				},
				{
					url: '/_data/id-ID/config.json',
					revision: 'bca74c7b71cebb5edd25a0bfb920a38d'
				},
				{
					url: '/_data/id-ID/projects/android-hot-movie.json',
					revision: '20af7adab0cc15c284299552d880b97a'
				},
				{
					url: '/_data/id-ID/projects/ebalian-chatbot.json',
					revision: 'ef2d960247c1f9e9535091b90743666a'
				},
				{
					url: '/_data/id-ID/projects/egg-box.json',
					revision: 'fbd103538799685b689f12ec233fc93c'
				},
				{
					url: '/_data/id-ID/projects/index-page-1.json',
					revision: '8e61934c1a58390c17d904a7a6491475'
				},
				{
					url: '/_data/id-ID/projects/index-page-2.json',
					revision: '16cea5bffb955fb2712654d758c867e4'
				},
				{
					url: '/_data/id-ID/projects/index-pinned.json',
					revision: '08822d05a92c7a35f1dd03b1b321f9c4'
				},
				{
					url: '/_data/id-ID/projects/otonan.json',
					revision: '9be124a273cb747eb7d5346ad6c8c787'
				},
				{
					url: '/_data/id-ID/projects/pawiwahan.json',
					revision: 'ceaf6c27ef1415d5def46dec99bfa7c1'
				},
				{
					url: '/_data/id-ID/projects/slideit.json',
					revision: '3643a9f1783136acf6adbc55fe4bf8c1'
				},
				{
					url: '/_next/app-build-manifest.json',
					revision: '434af078512000203212119bf342c673'
				},
				{
					url: '/_next/static/Q-ui_kKvfX78zFyzMAXlf/_buildManifest.js',
					revision: '8b73a15be657a130c57bb992daf36ef8'
				},
				{
					url: '/_next/static/Q-ui_kKvfX78zFyzMAXlf/_ssgManifest.js',
					revision: 'b6652df95db52feb4daf4eca35380933'
				},
				{
					url: '/_next/static/chunks/111-a58d329248283403.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/120-34dc18b7439ddd5e.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/157-4762bfa709230786.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/278-5141d970cb09816a.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/321-5dd1ee72ad9e133b.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/41-02fbd215b4ac0516.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/412-20b8635e9e86c5d3.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/6f163293-56d0f5102ad49640.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/718.5d97a884c77a4e67.js',
					revision: '5d97a884c77a4e67'
				},
				{
					url: '/_next/static/chunks/822-2811c6658dd36551.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/839-d02c4479fcdc919e.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/946-2daac49beab5f120.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/991-ddc364fa111e5719.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/framework-016048b4aa759478.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/main-062d5f42bed7c2bf.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/main-app-b215a49bf61862aa.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/pages/About-7b158ae17de45aee.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/pages/Contact-a7aebb679b60c051.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/pages/_app-3657f92f159f0c38.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/pages/_error-04cf077c2981bece.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/pages/blogs-84900697121f9c1f.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/pages/blogs/%5Bname%5D-94993fec5fd7984e.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/pages/download-60e4b9c3ee98f8a1.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/pages/index-f144ee3c634a3d7d.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/pages/projects-e21639629833f04c.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/pages/projects/%5Bname%5D-aecae0fd9c162156.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
					revision: '837c0df77fd5009c9e46d446188ecfd0'
				},
				{
					url: '/_next/static/chunks/webpack-4127c766a373e003.js',
					revision: 'Q-ui_kKvfX78zFyzMAXlf'
				},
				{
					url: '/_next/static/css/117ac7dcb379d385.css',
					revision: '117ac7dcb379d385'
				},
				{
					url: '/android-chrome-512x512.png',
					revision: '5f48b0e801e0f85a935c2dd685b0c8ed'
				},
				{
					url: '/android-icon-144x144.png',
					revision: '511fea5f4ebf6e7c601b021dec0c1915'
				},
				{
					url: '/android-icon-192x192.png',
					revision: '07d067e75b9aaa38a6d810d8ee0b93bc'
				},
				{
					url: '/android-icon-36x36.png',
					revision: '05d70021e980a1943710777417845e8f'
				},
				{
					url: '/android-icon-48x48.png',
					revision: 'f94e0f9bd7d1c0e307b954c65ff4ae1c'
				},
				{
					url: '/android-icon-72x72.png',
					revision: '9a17ed1d196b4a2a1bd95924543b3e91'
				},
				{
					url: '/android-icon-96x96.png',
					revision: 'd7b7c7ba418a0a2e5758ca5bb3b5fe03'
				},
				{
					url: '/apple-icon-114x114.png',
					revision: 'd772e90e909b2b19c7a6bc18904a508b'
				},
				{
					url: '/apple-icon-120x120.png',
					revision: '5aac2350e49ab21698f28bfb765f149c'
				},
				{
					url: '/apple-icon-144x144.png',
					revision: '511fea5f4ebf6e7c601b021dec0c1915'
				},
				{
					url: '/apple-icon-152x152.png',
					revision: 'e5375b6ff448279ef815fc7c4afb525e'
				},
				{
					url: '/apple-icon-180x180.png',
					revision: 'c2a4a932323083b3a1745a91135a5f18'
				},
				{
					url: '/apple-icon-57x57.png',
					revision: '19657044177df8ab6eb8052f1a259826'
				},
				{
					url: '/apple-icon-60x60.png',
					revision: '62f8134017adcdd78ce311054874bf63'
				},
				{
					url: '/apple-icon-72x72.png',
					revision: '9a17ed1d196b4a2a1bd95924543b3e91'
				},
				{
					url: '/apple-icon-76x76.png',
					revision: '1bfe315b22f2aff3b6dfe675c4399112'
				},
				{
					url: '/apple-icon-precomposed.png',
					revision: 'b1b0d8350782d1da9d64e9959d6ec7d2'
				},
				{
					url: '/apple-icon.png',
					revision: 'b1b0d8350782d1da9d64e9959d6ec7d2'
				},
				{
					url: '/browserconfig.xml',
					revision: '653d077300a12f09a69caeea7a8947f8'
				},
				{
					url: '/favicon-16x16.png',
					revision: 'ecec8cbc99fb49341ad30080da3b4403'
				},
				{
					url: '/favicon-32x32.png',
					revision: 'ac43608ea5111c40fa310b6982326c8d'
				},
				{
					url: '/favicon-96x96.png',
					revision: 'd7b7c7ba418a0a2e5758ca5bb3b5fe03'
				},
				{ url: '/favicon.ico', revision: 'ba13e3be4f7bf7cf5c00479fef04045e' },
				{
					url: '/fonts/Inter-Bold.woff2',
					revision: '444a7284663a3bc886683eb81450b294'
				},
				{
					url: '/fonts/Inter-Medium.woff2',
					revision: '75db5319e7e87c587019a5df08d7272c'
				},
				{
					url: '/fonts/Inter-Regular.woff2',
					revision: 'dc131113894217b5031000575d9de002'
				},
				{
					url: '/icons/arrow-left.svg',
					revision: '5344bb894484f478b2ad912ef0440436'
				},
				{
					url: '/images/__generated/1200px-abstract-wave-background-free-vector.jpg',
					revision: 'bd64c19d2a71d104e0388f47ddb5d5dd'
				},
				{
					url: '/images/__generated/1200px-adi_gunawan.jpg',
					revision: 'e941cfc1ab418f658a42b37511485a27'
				},
				{
					url: '/images/__generated/1200px-avatar.png',
					revision: '8cde0a999173c4db637a4e9af32451d1'
				},
				{
					url: '/images/__generated/1200px-let me know.png',
					revision: '3a83818bb785eeec4f6bb7371998098e'
				},
				{
					url: '/images/__generated/1200px-lotus pose clean.png',
					revision: 'eb786765955f7de3c8a185dc211e4f8d'
				},
				{
					url: '/images/__generated/1200px-lotus pose.png',
					revision: 'd18d8012c0d175f407851c599be6142d'
				},
				{
					url: '/images/__generated/1200px-nooooooo.png',
					revision: '0e87e12c7b4e84a0cf83826b9b52035d'
				},
				{
					url: '/images/__generated/1200px-placeholder.png',
					revision: '88827654b10cac01ecbca11c2c00075d'
				},
				{
					url: '/images/__generated/1200px-red-nooooooo.png',
					revision: '0fe6f45e8491cefdd0d75eb581447ec1'
				},
				{
					url: '/images/__generated/1200px-success.png',
					revision: 'da85b625e6c5297147dabd0bfb0b2671'
				},
				{
					url: '/images/__generated/1200px-surprise!.png',
					revision: 'c95b069da8e0864dd8ca15d6990fbed7'
				},
				{
					url: '/images/__generated/1200px-thank you.png',
					revision: '114d584408b37c398f028cf470941448'
				},
				{
					url: '/images/__generated/1200px-yay.png',
					revision: 'c76bc17fe2aa702747e06c1592213e60'
				},
				{
					url: '/images/__generated/1200px-you got it boss.png',
					revision: '3bafb177231b2dd5a4714265b0998dc3'
				},
				{
					url: '/images/__generated/1400px-abstract-wave-background-free-vector.jpg',
					revision: 'bd64c19d2a71d104e0388f47ddb5d5dd'
				},
				{
					url: '/images/__generated/1400px-adi_gunawan.jpg',
					revision: 'e941cfc1ab418f658a42b37511485a27'
				},
				{
					url: '/images/__generated/1400px-avatar.png',
					revision: '9c25a2b0e9a6926fab8e7a215ebbf99b'
				},
				{
					url: '/images/__generated/1400px-let me know.png',
					revision: '3645463ecb81df69476d7655d059a8e4'
				},
				{
					url: '/images/__generated/1400px-lotus pose clean.png',
					revision: '1a739534e4bfd5f12b94b2202c928461'
				},
				{
					url: '/images/__generated/1400px-lotus pose.png',
					revision: 'c91e44ba140b7bcccaa45b6447fe7a9a'
				},
				{
					url: '/images/__generated/1400px-nooooooo.png',
					revision: 'e45263aa9776382ced5f97e60db8f43a'
				},
				{
					url: '/images/__generated/1400px-placeholder.png',
					revision: '88827654b10cac01ecbca11c2c00075d'
				},
				{
					url: '/images/__generated/1400px-red-nooooooo.png',
					revision: 'b4383c353a4aa124f4c6eecbe6cccb43'
				},
				{
					url: '/images/__generated/1400px-success.png',
					revision: '89e046cc030528bf7fa9db1a5e8a6ed8'
				},
				{
					url: '/images/__generated/1400px-surprise!.png',
					revision: '3b5dad1a2324ea2584928888544dce3c'
				},
				{
					url: '/images/__generated/1400px-thank you.png',
					revision: '09a97673df00202a3f59cd9bf50afe74'
				},
				{
					url: '/images/__generated/1400px-yay.png',
					revision: '03a3952cd629a06880c427bf2cebd541'
				},
				{
					url: '/images/__generated/1400px-you got it boss.png',
					revision: '6a1a630d0e26532d2dfc05ba9f031dc1'
				},
				{
					url: '/images/__generated/340px-abstract-wave-background-free-vector.jpg',
					revision: 'bf7dc737485b3462a7ac6a6e18e455e6'
				},
				{
					url: '/images/__generated/340px-adi_gunawan.jpg',
					revision: '91d02b5e788f24324651aa26846c8dc2'
				},
				{
					url: '/images/__generated/340px-avatar.png',
					revision: '4f3cdbd4115c4031a7d167be06a59d33'
				},
				{
					url: '/images/__generated/340px-let me know.png',
					revision: '1ce203981c708caa94335616fbcdfd78'
				},
				{
					url: '/images/__generated/340px-lotus pose clean.png',
					revision: 'eda0c92141ae16add953d44e81037177'
				},
				{
					url: '/images/__generated/340px-lotus pose.png',
					revision: '3359637c9e325462cb2c41ad2187ff07'
				},
				{
					url: '/images/__generated/340px-nooooooo.png',
					revision: '29122f0a94df4291598ab60445c76f89'
				},
				{
					url: '/images/__generated/340px-placeholder.png',
					revision: '7a7edd766a6c06b75b7750f9b13ba8b0'
				},
				{
					url: '/images/__generated/340px-red-nooooooo.png',
					revision: '82fe3268723db5aad6faade62641d982'
				},
				{
					url: '/images/__generated/340px-success.png',
					revision: 'd81ad831d2ece87e72716c3cd144799f'
				},
				{
					url: '/images/__generated/340px-surprise!.png',
					revision: '962c74405d734d8c7f812b1b0eb951c2'
				},
				{
					url: '/images/__generated/340px-thank you.png',
					revision: '1d2cb69a56f92f12c2518c76d43f46a0'
				},
				{
					url: '/images/__generated/340px-yay.png',
					revision: 'a325f7320ec2ffac7bab49afcbbe7bfa'
				},
				{
					url: '/images/__generated/340px-you got it boss.png',
					revision: 'e05ca33aa73ec5060167780ebffbcc32'
				},
				{
					url: '/images/__generated/576px-abstract-wave-background-free-vector.jpg',
					revision: 'f8ee483f7f47a389f05b17adfe5b2900'
				},
				{
					url: '/images/__generated/576px-adi_gunawan.jpg',
					revision: 'b5d15201f355dc6359fc1c568a254e3c'
				},
				{
					url: '/images/__generated/576px-avatar.png',
					revision: '3092c959cf7d33d93ac7604ecc695b07'
				},
				{
					url: '/images/__generated/576px-let me know.png',
					revision: 'dfcfbd88fe7065616a0319964b0f6c56'
				},
				{
					url: '/images/__generated/576px-lotus pose clean.png',
					revision: 'f7c17984d74e0c36e2443e15d407b913'
				},
				{
					url: '/images/__generated/576px-lotus pose.png',
					revision: '85197ed2930d543174f97d2fe6b104c8'
				},
				{
					url: '/images/__generated/576px-nooooooo.png',
					revision: 'd5df83da0275e9e05c5d445b3d19b276'
				},
				{
					url: '/images/__generated/576px-placeholder.png',
					revision: '1ea0b81654a7a535fa62fa6e51837bb8'
				},
				{
					url: '/images/__generated/576px-red-nooooooo.png',
					revision: 'c64c1997c5dcc853320a99fa6994e405'
				},
				{
					url: '/images/__generated/576px-success.png',
					revision: 'b35ecf8e74f046352c93a5f5ce08e7bd'
				},
				{
					url: '/images/__generated/576px-surprise!.png',
					revision: '5851bcde3f234ac48e0cad81e208d5ab'
				},
				{
					url: '/images/__generated/576px-thank you.png',
					revision: 'e07173e2e933f883bcb313251bbda2a9'
				},
				{
					url: '/images/__generated/576px-yay.png',
					revision: '9731a811caeb2a3f7239be422a336586'
				},
				{
					url: '/images/__generated/576px-you got it boss.png',
					revision: 'db61c243ad50f9ecb22712d796f64ce6'
				},
				{
					url: '/images/__generated/768px-abstract-wave-background-free-vector.jpg',
					revision: 'bd64c19d2a71d104e0388f47ddb5d5dd'
				},
				{
					url: '/images/__generated/768px-adi_gunawan.jpg',
					revision: 'e941cfc1ab418f658a42b37511485a27'
				},
				{
					url: '/images/__generated/768px-avatar.png',
					revision: '57e25b9f1f3c3d73bb36b527c05bbde8'
				},
				{
					url: '/images/__generated/768px-let me know.png',
					revision: '6098349c278a0c55a3a102cf430119d4'
				},
				{
					url: '/images/__generated/768px-lotus pose clean.png',
					revision: 'f0db638d0d3766dcbbebc9799b53db05'
				},
				{
					url: '/images/__generated/768px-lotus pose.png',
					revision: '73cb7ec9d69e7e1d716a8738a44ddec5'
				},
				{
					url: '/images/__generated/768px-nooooooo.png',
					revision: '099a92a3a45392783cb29261801cf3dd'
				},
				{
					url: '/images/__generated/768px-placeholder.png',
					revision: 'ca75fa2c75e8be26d50f264b0e76dae2'
				},
				{
					url: '/images/__generated/768px-red-nooooooo.png',
					revision: '1efb599d702a5b02c8efbd885a18cddc'
				},
				{
					url: '/images/__generated/768px-success.png',
					revision: '43aabe070635dc86a526bce6ccc989a0'
				},
				{
					url: '/images/__generated/768px-surprise!.png',
					revision: '05be2d86c89f66aa5004cd5fa00d5412'
				},
				{
					url: '/images/__generated/768px-thank you.png',
					revision: '35ba00b629dfefd3534b63643ac68f44'
				},
				{
					url: '/images/__generated/768px-yay.png',
					revision: '628111e76effaf04ece65eb21b32e813'
				},
				{
					url: '/images/__generated/768px-you got it boss.png',
					revision: '9824830ec9e017aae326ba0199e9b0d8'
				},
				{
					url: '/images/__generated/992px-abstract-wave-background-free-vector.jpg',
					revision: 'bd64c19d2a71d104e0388f47ddb5d5dd'
				},
				{
					url: '/images/__generated/992px-adi_gunawan.jpg',
					revision: 'e941cfc1ab418f658a42b37511485a27'
				},
				{
					url: '/images/__generated/992px-avatar.png',
					revision: '2e136cacd3a72f84f63106b54953f371'
				},
				{
					url: '/images/__generated/992px-let me know.png',
					revision: '2d708cf501d3a4266b3dfffa817f633f'
				},
				{
					url: '/images/__generated/992px-lotus pose clean.png',
					revision: '617ff43885cd8a9f707e080a9fdb2374'
				},
				{
					url: '/images/__generated/992px-lotus pose.png',
					revision: '032d2b4c06be3d241dab7c2b9666d868'
				},
				{
					url: '/images/__generated/992px-nooooooo.png',
					revision: '63e9d2d8e10402facf04c8c32257156d'
				},
				{
					url: '/images/__generated/992px-placeholder.png',
					revision: '88827654b10cac01ecbca11c2c00075d'
				},
				{
					url: '/images/__generated/992px-red-nooooooo.png',
					revision: '723543e29f4cef1cff5283934c4657e7'
				},
				{
					url: '/images/__generated/992px-success.png',
					revision: 'd257709cddcdab1e87e29bd3e80a15f1'
				},
				{
					url: '/images/__generated/992px-surprise!.png',
					revision: '54f98c3e70389ff2080c7bbd2199579c'
				},
				{
					url: '/images/__generated/992px-thank you.png',
					revision: '2852c94855e989326b12d314402bb3de'
				},
				{
					url: '/images/__generated/992px-yay.png',
					revision: '0bbf3720eb13e157ed359e70f06795bb'
				},
				{
					url: '/images/__generated/992px-you got it boss.png',
					revision: '8b838ddf0c82e089fbde597a783fb982'
				},
				{
					url: '/images/__generated/abstract-wave-background-free-vector.jpg.json',
					revision: '057600bde651b904f4f72b9828f0e193'
				},
				{
					url: '/images/__generated/adi_gunawan.jpg.json',
					revision: 'e49192b10aa838276e7f51093fa51135'
				},
				{
					url: '/images/__generated/avatar.png.json',
					revision: 'e3fa3f04859279dc36e9e6b97c2476db'
				},
				{
					url: '/images/__generated/let me know.png.json',
					revision: 'd5cb6db0a166b688eb976a2529732ded'
				},
				{
					url: '/images/__generated/lotus pose clean.png.json',
					revision: 'e329b9206e642a5566385e233854d83c'
				},
				{
					url: '/images/__generated/lotus pose.png.json',
					revision: '97a9524f75e9460dd8ee22ab6e0c7126'
				},
				{
					url: '/images/__generated/nooooooo.png.json',
					revision: 'fba21313278dca009c877bb16b423c92'
				},
				{
					url: '/images/__generated/placeholder.png.json',
					revision: '5ab13dcb9540b2a9d70d77556c2d58e4'
				},
				{
					url: '/images/__generated/red-nooooooo.png.json',
					revision: '06c870ca9630fd68dd787a5d0ea397fe'
				},
				{
					url: '/images/__generated/success.png.json',
					revision: 'bdad19b856ae60edac5144a9e2c0bcb1'
				},
				{
					url: '/images/__generated/surprise!.png.json',
					revision: '651b84a58dc74538ce7ad2743aa63bc1'
				},
				{
					url: '/images/__generated/thank you.png.json',
					revision: '6e83e39a68a20583b2f6a4e8093e003a'
				},
				{
					url: '/images/__generated/yay.png.json',
					revision: 'dcd51b4b0fd686bbf641e8932107f000'
				},
				{
					url: '/images/__generated/you got it boss.png.json',
					revision: 'a9574f69d190b38e4c2c8b899bc95dc0'
				},
				{
					url: '/images/abstract-wave-background-free-vector.jpg',
					revision: 'ca16f6e0e5769e003733f0e37329a02b'
				},
				{
					url: '/images/adi_gunawan.jpg',
					revision: 'b0cd607c4bba07c5b23e1908a052ac0a'
				},
				{
					url: '/images/avatar.png',
					revision: '52f06ef47e8c67aea138632bb62f37cf'
				},
				{
					url: '/images/background.webp',
					revision: 'f99faed4452339cd67292af934e46bec'
				},
				{
					url: '/images/birthday.png',
					revision: '57993412c2dc42172b8e5ffdb30427ec'
				},
				{
					url: '/images/carousel_addon.png',
					revision: '669a0109008f2e1401aea6fb2994e984'
				},
				{
					url: '/images/ebalian.jpeg',
					revision: '8116eccf62fe3426bcc5e11ed8d5d250'
				},
				{
					url: '/images/egg_box.jpeg',
					revision: '277928eb3e5482b7d7e6fa38082ebc70'
				},
				{
					url: '/images/hot_movie.jpg',
					revision: 'c8369b02b93b813dfb4d5b06c619bd8f'
				},
				{
					url: '/images/image_anime.jpeg',
					revision: 'efd80f2b4d894b1fbf85e42ddb0ed771'
				},
				{
					url: '/images/image_to_vector.jpeg',
					revision: '348ff9bb2c72d1b4aa480e52def6d6ed'
				},
				{
					url: '/images/indonesia_flag.svg',
					revision: 'ebeaf59efd55844cebb7e95eaa91c284'
				},
				{
					url: '/images/let me know.png',
					revision: 'be71e082148e59b25880e4a72d3c9234'
				},
				{
					url: '/images/lotus pose clean.png',
					revision: 'd12fc0c74dcdf2d05628a9230186520e'
				},
				{
					url: '/images/lotus pose.png',
					revision: 'c56dd9989add4336b5e98afa08c5efd6'
				},
				{
					url: '/images/node_js.jpeg',
					revision: '7ac6b4ff9fea4902f5df7542d34be7a1'
				},
				{
					url: '/images/nooooooo.png',
					revision: '44a62be04172e50bf86ee6713f004792'
				},
				{
					url: '/images/pawiwahan.jpeg',
					revision: 'e0e83a4d3606a12513ea2ff59f466d92'
				},
				{
					url: '/images/placeholder.png',
					revision: '4edc54533b81b49c6f3ed42319e8f5f0'
				},
				{
					url: '/images/red-nooooooo.png',
					revision: 'fb61d88b274969451d17c207e43ddb12'
				},
				{
					url: '/images/schedule_received.png',
					revision: 'ae2005ba298d586d4382c2a502f914fe'
				},
				{
					url: '/images/shader.svg',
					revision: '896f0d7e2325308e8882e32bb2fabc5f'
				},
				{
					url: '/images/success.png',
					revision: 'f675e69c51b73fcd15749ec1f2a9cd88'
				},
				{
					url: '/images/surprise!.png',
					revision: '3eb31bdae3a3dcd3e0331521cb7e2d3e'
				},
				{
					url: '/images/thank you.png',
					revision: '003dcf94e28a7f28cb325408c39f67ff'
				},
				{
					url: '/images/united-states_flag.svg',
					revision: '8279751ca3033a5f922a02d1219620a0'
				},
				{
					url: '/images/weeding.png',
					revision: 'af70dfafb2eaccecf1a673e3f652ef56'
				},
				{
					url: '/images/yay.png',
					revision: '102c04b0f5e0d94a95bb1041d1d52d92'
				},
				{
					url: '/images/you got it boss.png',
					revision: 'b7fc01cc91242ac07146419561fa2dbd'
				},
				{ url: '/index.json', revision: '58e0494c51d30eb3494f7c9198986bb9' },
				{ url: '/manifest.json', revision: 'cedc58bb031b4647806e1dedaffee50e' },
				{
					url: '/ms-icon-144x144.png',
					revision: '511fea5f4ebf6e7c601b021dec0c1915'
				},
				{
					url: '/ms-icon-150x150.png',
					revision: '113519b7c4f5f511a6f5b32549404b80'
				},
				{
					url: '/ms-icon-310x310.png',
					revision: 'd0431e7fd7115c37f351941fcf1c36f0'
				},
				{
					url: '/ms-icon-70x70.png',
					revision: '26c5d6498e3922a346bc604cb44c9021'
				},
				{ url: '/robots.txt', revision: 'f77c87f977e0fcce05a6df46c885a129' }
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			'/',
			new e.NetworkFirst({
				cacheName: 'start-url',
				plugins: [
					{
						cacheWillUpdate: async ({
							request: e,
							response: a,
							event: i,
							state: n
						}) =>
							a && 'opaqueredirect' === a.type
								? new Response(a.body, {
										status: 200,
										statusText: 'OK',
										headers: a.headers
								  })
								: a
					}
				]
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: 'google-fonts-webfonts',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: 'google-fonts-stylesheets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-font-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-image-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-image',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: 'static-audio-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: 'static-video-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-js-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-style-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-data',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: 'static-data-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1
				const a = e.pathname
				return !a.startsWith('/api/auth/') && !!a.startsWith('/api/')
			},
			new e.NetworkFirst({
				cacheName: 'apis',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1
				return !e.pathname.startsWith('/api/')
			},
			new e.NetworkFirst({
				cacheName: 'others',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
				]
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: 'cross-origin',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })
				]
			}),
			'GET'
		)
})

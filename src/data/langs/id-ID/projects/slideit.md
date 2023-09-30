---
name: Svelte SlideIT
description: |
  Sebuah libaray svelte untuk membuat slider atau carousel
pinned: true
tags:
  - svelte
  - js
thumbnail: http://placeimg.com/640/480/carousel
demoUrl: https://github.com/zgunz42/svelte-slideit
sourceUrl: https://github.com/zgunz42/svelte-slideit
---

![npm-publish](https://github.com/zgunz42/svelte-slideit/workflows/npm-publish/badge.svg) [![svelte-v2](https://img.shields.io/badge/svelte-v2-orange.svg)](https://v2.svelte.dev) [![svelte-v3](https://img.shields.io/badge/svelte-v3-blueviolet.svg)](https://svelte.dev)

### Hello SlideIt

SlideIt adalah slider dan carousel build di atas [Glidejs](https://glidejs.com/). Saya membangun ini karena yang lain
Svelte Component Suka _[svelte-carousel](https://github.com/beyonk-adventures/svelte-carousel/blob/master/README.md)_
tidak mendukung responsif karena tidak bisa menanganinya [Siema](https://github.com/pawelgrzybek/siema). Alasan lain yang saya butuhkan
Carousel API Seperti Owlcarousel Tapi Gunakan Vanilla JS Untuk Kurang Ketergantungan.

Core feature:

- Opsi konfigurasi responsif
- Acara Port All GlideJs to Svelte Custom Event
- Banyak slot yang dapat Anda isi "any html tag"
- Glidejs css diimpor dalam tag gaya terima kasih **svelte-preprocess**

## Event Name

Semua Nama Acara dari GlideJs telah diganti nama `a.b` ke `aB`, Jadi jika ingin mendengarkan
ke dalam beberapa peristiwa seperti ini.

```sveltehtml
<SlideIt on:montBefore={handler} />
```

Itu akan mendengarkan `mount.before` Nama Acara GlideJS

## Render Carousel Item

```sveltehtml
<SlideIt items={[4,5,6]}>
    <div slot="item" let:item>
        <p>{item}</p>
    </div>
</SlideIt>
```

## Render Control and Bullet

_TODO_

## Konfigurasi yang sama dengan Glide JS

Lihat dokumentasi GlideJS https://glidejs.com/docs/options/

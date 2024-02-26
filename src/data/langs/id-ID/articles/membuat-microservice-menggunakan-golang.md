---
title: Membuat microservice menggunakan golang
description: |
  Kali ini saya akan membagika percobaan saya menggunakan golang, watermill dan fiber sebagai bagian komponent microservice
thumbnail: /images/golang-micro.jpeg
publishedAt: '2024-02-26T14:34:09.275Z'
label:
  - golanng
  - tutorial
  - microservice
commentId: 15
---

## Apa yang akan di buat

Kali ini saya akan membuat sebuah program menggunakan pedekatan microservice dimana setiap service terpisah dan tidak perlu saling tergantung satu sama lain, jadi dengan pendekatan ini akan membuat gampang untuk di scale horizontal sesuai dengan berkembangnya jumlah pengguna

## Framework dan Library

Untuk membuat project awal ini saya mecoba berbagai macam opsi mulai dari menggunakan go-micro, dengan menggunakan go micro kita akan di setup semua yang di perlukan untuk menjalankan / menerapkan microservice mulai dari setup service discovery, transport, broker, event sampai dengan liveness grpc standard.

Namun dengan banyak feature yang di tawarkan oleh si go-micro, saya akhirnya memutuskann tidak memaki ini dan memilih melakukan pendekatan yang agak beda dengan menerapkan Event Driven. Hal ini saya lakukan karena tidak perlu setup proto buffer dan tidak terlalu banyak file dengan format beda. Untuk transport nanti akan memanfaatkan event stream yang nanti di encode menjadi json dan decode menjadi struct.

Untuk menghadle antara client (web) ke service saya memutuskan menggunakan fiber, alasan karena terpancinng bencmark ini. Tetapi selain itu saya merasa resoruce online juga banyak kalau sewaktu-waktu ada bugs.

## Project Structure

Ini merupakan hal yang paling sulit, ini ibarat batu pondasi dari proyek kalau salah struktur folder hal yang paling biasa terjadi adalah susah baca flow code, dan kalau di golang bisa juga akar dai circular denpendency (saling import loop). Untuk project structure saya bikin simple aja seperti ini

**Project structure:**

```bash
.
├── go.work
├── go.work.sum
└── src
    ├── account_service
    │   ├── cmd
    │   │   └── app
    │   │       ├── app.go
    │   │       ├── cli
    │   │       │   ├── cli.go
    │   │       │   └── db
    │   │       │       └── command.go
    │   │       └── server
    │   │           ├── command.go
    │   │           └── server.go
    │   ├── config
    │   │   └── config.go
    │   ├── go.mod
    │   ├── go.sum
    │   ├── internal
    │   │   ├── app
    │   │   │   ├── app.go
    │   │   │   ├── appconfig
    │   │   │   │   ├── config.go
    │   │   │   │   ├── spec.go
    │   │   │   │   └── types.go
    │   │   │   └── appcontext
    │   │   │       └── appcontext.go
    │   │   ├── controller
    │   │   │   ├── 0module.go
    │   │   │   ├── add_user.go
    │   │   │   ├── delete_user.go
    │   │   │   ├── exist_user.go
    │   │   │   ├── get_user.go
    │   │   │   ├── search_user.go
    │   │   │   ├── update_user.go
    │   │   │   └── user_controller.go
    │   │   ├── infra
    │   │   │   ├── 0module.go
    │   │   │   └── db
    │   │   │       ├── 0module.go
    │   │   │       ├── db.go
    │   │   │       └── migrations
    │   │   │           ├── logformat.go
    │   │   │           ├── migrations.go
    │   │   │           ├── migrator.go
    │   │   │           └── sql
    │   │   │               ├── 20240219141800_create-users-table.down.sql
    │   │   │               └── 20240219141800_create-users-table.up.sql
    │   │   ├── repo
    │   │   │   ├── 0module.go
    │   │   │   └── user.go
    │   │   ├── server
    │   │   │   ├── 0module.go
    │   │   │   └── watermill
    │   │   │       ├── 0module.go
    │   │   │       ├── command
    │   │   │       │   ├── 0module.go
    │   │   │       │   ├── command.go
    │   │   │       │   └── proccessor.go
    │   │   │       ├── create.go
    │   │   │       └── route
    │   │   │           ├── 0module.go
    │   │   │           └── route.go
    │   │   ├── service
    │   │   │   ├── 0module.go
    │   │   │   └── user.go
    │   │   └── x
    │   │       └── logger
    │   │           ├── configure.go
    │   │           └── fxlogger
    │   │               └── fxlogger.go
    │   ├── main.go
    │   ├── makefile
    │   ├── model
    │   │   ├── dto
    │   │   │   └── user.go
    │   │   └── user.go
    │   └── tracing.go
    ├── api_gateway
    │   ├── Dockerfile
    │   ├── LICENSE
    │   ├── README.md
    │   ├── cmd
    │   │   └── app
    │   │       ├── app.go
    │   │       ├── cli
    │   │       │   ├── cli.go
    │   │       │   └── db
    │   │       │       └── command.go
    │   │       └── server
    │   │           ├── command.go
    │   │           └── server.go
    │   ├── go.mod
    │   ├── go.sum
    │   ├── internal
    │   │   ├── app
    │   │   │   ├── app.go
    │   │   │   ├── appbundle
    │   │   │   │   └── appbundle.go
    │   │   │   ├── appconfig
    │   │   │   │   ├── config.go
    │   │   │   │   ├── spec.go
    │   │   │   │   └── types.go
    │   │   │   └── appcontext
    │   │   │       └── appcontext.go
    │   │   ├── controller
    │   │   │   ├── 0module.go
    │   │   │   ├── post.go
    │   │   │   └── user.go
    │   │   ├── infra
    │   │   │   ├── 0module.go
    │   │   │   └── db
    │   │   │       ├── 0module.go
    │   │   │       ├── db.go
    │   │   │       └── migrations
    │   │   │           ├── logformat.go
    │   │   │           ├── migrations.go
    │   │   │           ├── migrator.go
    │   │   │           └── sql
    │   │   │               ├── 00000000000000_init.down.sql
    │   │   │               ├── 00000000000000_init.up.sql
    │   │   │               ├── 20221105155723_change_description.down.sql
    │   │   │               └── 20221105155723_change_description.up.sql
    │   │   ├── repo
    │   │   │   ├── 0module.go
    │   │   │   └── post.go
    │   │   ├── server
    │   │   │   ├── 0module.go
    │   │   │   ├── http
    │   │   │   │   ├── 0module.go
    │   │   │   │   ├── create.go
    │   │   │   │   └── route
    │   │   │   │       ├── 0module.go
    │   │   │   │       └── groups.go
    │   │   │   └── watermill
    │   │   │       ├── 0module.go
    │   │   │       ├── command
    │   │   │       │   ├── 0module.go
    │   │   │       │   └── command.go
    │   │   │       └── create.go
    │   │   ├── service
    │   │   │   ├── 0module.go
    │   │   │   └── post.go
    │   │   ├── validator
    │   │   │   ├── 0module.go
    │   │   │   ├── create.go
    │   │   │   └── rule
    │   │   │       ├── rule_interface.go
    │   │   │       └── user_exist_rule.go
    │   │   └── x
    │   │       └── logger
    │   │           ├── configure.go
    │   │           └── fxlogger
    │   │               └── fxlogger.go
    │   ├── main.go
    │   └── renovate.json
    └── shared
        ├── command
        │   ├── add_user_command.go
        │   ├── delete_user_command.go
        │   ├── get_email_exists_command.go
        │   ├── get_user_command.go
        │   ├── get_username_exists_command.go
        │   ├── search_user_command.go
        │   └── update_user_command.go
        ├── dto
        │   ├── account_user_dto.go
        │   ├── helper.go
        │   └── validator.go
        ├── go.mod
        └── go.sum
```

Pada stukture folder di atas ada beberapa note yang bisa di pelajari, pertama setiap service akan berada di dalam dof

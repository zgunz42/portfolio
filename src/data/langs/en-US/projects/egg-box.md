---
name: EggBox IoT
description: |
  Hatching Device also Monitor temperature and incubator turnover using
  IoT devices (nodemcu) and server (nestjs) through
  Mosquito
pinned: true
tags:
  - arduino
  - c++
thumbnail: /images/egg_box.jpeg
demoUrl: https://github.com/zgunz42/egg-incubator-iot
sourceUrl: https://github.com/zgunz42/egg-incubator-iot
---

**Hatching Device and IoT Monitoring**

The project involves the use of a "Hatching Device" that performs temperature monitoring and manages incubator turnover using IoT devices (NodeMCU) and a server built with NestJS. Communication between these components is facilitated through the MQTT (Message Queuing Telemetry Transport) protocol.

**Key Components:**

1. **Hatching Device**: This device is designed for incubation purposes, possibly for hatching eggs or other biological materials. It plays a crucial role in maintaining specific environmental conditions.

2. **Temperature Monitoring**: The Hatching Device is equipped with sensors to measure and monitor the temperature within the incubator. Precise temperature control is essential for successful incubation.

3. **Incubator Turnover**: "Incubator turnover" refers to the periodic rotation or movement of eggs inside the incubator. This ensures even heat distribution and proper development.

4. **IoT Devices (NodeMCU)**: NodeMCU is an IoT development board capable of internet connectivity and data collection. In this project, NodeMCU devices collect temperature data and control the incubator's turnover mechanism.

5. **Server (NestJS)**: NestJS is a Node.js framework used to build server-side applications. In this context, it serves as a server that receives data from IoT devices (NodeMCU) and potentially provides control and monitoring functions.

6. **MQTT Protocol**: MQTT (Message Queuing Telemetry Transport) is used for communication between the IoT devices and the server. It is a lightweight messaging protocol commonly employed in IoT applications.

This project aims to create an effective system for hatching by closely monitoring and controlling temperature and managing the incubator turnover process. The integration of IoT devices and a server enables real-time data collection and potentially remote control of the hatching process.

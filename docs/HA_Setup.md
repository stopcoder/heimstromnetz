## Home Assistant

### 主机
https://www.amazon.de/GMKtec-Prozessor-Computer-Display-Ethernet/dp/B0D1MKTH6G/

### 装Home Assistant OS
https://www.home-assistant.io/installation/generic-x86-64

## Inverter

### 硬件

* RS485 -> TCP Adapter
https://www.amazon.de/Waveshare-Industrial-RS485-Ethernet-Rail-Mount/dp/B09LQMH2S1/
* 这个Adapter需要低压供电，所以还需要一个变压器
https://www.amazon.de/dp/B06XWSYRCF/

### 连线和设置教程
https://github.com/nathanmarlor/foxess_modbus/wiki/Waveshare-RS485-to-ETH-%28B%29


### 集成到Home Assistant
* FoxESS: https://github.com/nathanmarlor/foxess_modbus
* Solax: https://github.com/wills106/homeassistant-solax-modbus


## Wallbox
https://go-e.com/de-de/produkte/go-e-charger-gemini


### 纯太阳能充电
动态控制Wallbox上的充电电流，以便达到只用太阳能充电的目的，现在有下面两种解决方案。

* go-e Controller https://go-e.com/de-de/produkte/go-e-controller
这个是go-e自己的解决方案，只适用于go-e家的充电桩。需要安装在电箱里。

* EVCC (https://evcc.io/)
EVCC是用于协调逆变器和充电桩之间的通讯，最大化的使用太阳能来给电车充电。对逆变器和充电桩的牌子没有限制。

  * 安装教程 (可以和Home Assistant安装在同一台机器上） https://docs.evcc.io/docs/installation/linux
  * 设置文档 https://docs.evcc.io/docs/installation/configuration

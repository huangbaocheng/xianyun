<template>
  <div id="container" style="height:600px">高德地图</div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      //工具条插件
      var toolbar = new AMap.ToolBar();
      map.addControl(toolbar);
      // 创建一个 Marker 实例： 点标记
      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "北京"
      });
      //点标记
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
    };
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${"a8f01cbf4b4b21fc86ea37e506271039"}&callback=onLoad&plugin=AMap.ToolBar`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style>
/* a8f01cbf4b4b21fc86ea37e506271039 */
</style>


<template>
<body>

  <div class="hello">
    刚刚回归吧
    

  </div>

  <div id="wrapper" style="height: 310px;">
    </div>
</body>


</template>

<script>

  import Chimee from 'chimee'
// import ChimeeKernelHls from 'chimee-kernel-hls'
// const chimee = new Chimee({
//               wrapper: '#wrapper',
//               src: 'http://39.135.32.24:6610/000000001000/1000000001000023734/index.m3u8',
//               controls: true,
//               autoplay: true,
//               kernels: {
//                 hls: ChimeeKernelHls,
//               }
//             });
import hls from 'chimee-kernel-hls';
const chimee = new Chimee({
  wrapper: '#wrapper',
  src: 'http://cdn.toxicjohann.com/lostStar.mp4',
  controls: true,
  autoplay: true,
  kernels: {
    hls
  }
});

export default {
  name: 'HelloWorld',


  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

    methods: {
      init() {
        
        chimee.play();
    },
    },

    created (){
      this.init();
    }
}
</script>

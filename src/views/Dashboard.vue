<script setup>
    import { onMounted } from 'vue';

    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
    ({key: "AIzaSyAk1-n36bO43KMvu5Jt6UBHUvvH-LZvtgk", v: "weekly"});


</script>

<template>
    <div id="map">
        <div id="eventMapTitle">
            <h2>Dashboard</h2>
        </div>

        <div id="eventCardArea">
            <!--create carousel-->
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">

                    <div class="carousel-item" v-for="(group, index) in groupedEvents" :key="index" :class="{ active: index === 0 }" > <!--this logic might be wrong-->

                        <!-- dynamically create number of cards based on the number of events present in the area -->
                         <div class="row d-flex justify-content-center">
                            <div v-for="event in group" class="col-md-4 mt-4 mb-4">
                                <div class="card bg-light" style="width: 100%;text-align: center;">
                                        <img class="card-img-top" :src="event.image" alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">{{event.name}}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">{{event.location}}</h6>
                                        <p class="card-text">{{ event.content}}</p>
                                        <a href="#" class="card-link">Card link</a>
                                        <a href="#" class="card-link">Another link</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- -->
                    </div>
                </div>
            </div>
            <!-- -->

            <!-- Carousel controls -->
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
      numberOfCards: 7,
      events: [],
    };
  },
  computed:{
    groupedEvents() {
        const groups = [];
        const numEventsTogether = 3; //can be changed
        for (let i = 0; i < this.events.length; i += numEventsTogether) { 
            groups.push(this.events.slice(i, i + numEventsTogether));
        }
        return groups;
  }
  },
  
  created() {
    for (let i = 1; i <= this.numberOfCards; i++) {
      this.events.push({
        name:"school",
        location:"smu",
        id: i,
        title: `Card Title ${i}`,
        content: `This is the content for card number ${i}.`,
        image: `../../assets/images/CE-Logo.png`,
      });
    }
  },
};
</script>

<style scoped>

    #eventMapTitle {
        background-color: black;
        text-align: center;
        color: white;
    }
    /* set fixed height for map */
    #map {
        height: 700px;
        width: 100%;
        border: 1px solid white;
        position: relative;
    }
    #eventCardArea {
        position: absolute;
        border: 1px solid red;
        bottom: 0; 
        left: 0; 
        right: 0; 
        border-radius: 5px;
    }
    
</style>

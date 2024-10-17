<script setup>
    import { onMounted } from 'vue';

    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
    ({key: "AIzaSyAk1-n36bO43KMvu5Jt6UBHUvvH-LZvtgk", v: "weekly"});


</script>

<template>
    <div id="eventMapTitle">
        <h2>Event Map</h2>
    </div>

    <div class="jumbotron">
        <p class="lead text-center">Get Geo Location</p>
        <form>
            <div class="form-group">
                <label for="addr">Enter An Address</label>
                <input type="text" class="form-control" name="addr" id="addr"
                    placeholder="E.g. Singapore Management University">
                <br><button type="button" onclick="getLoc('addr')" class="btn btn-primary">Get Full Address!</button>
                <!-- the following set the lat, lng values to put a marker on the map-->
                <input type="hidden" id="lat" name="lat" value="1.2973784" />
                <input type="hidden" id="lng" name="lng" value="103.8495219" />
            </div>
            <p id="display" class="lead text-center"></p>
        </form>
    </div>

<div class="container mt-5">
    <h1 class="text-center">Our Events</h1>

    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="Event 1">
                            <div class="card-body">
                                <h5 class="card-title">Event 1</h5>
                                <p class="card-text">Description for Event 1. It’s a great event to attend.</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="Event 2">
                            <div class="card-body">
                                <h5 class="card-title">Event 2</h5>
                                <p class="card-text">Description for Event 2. Don’t miss out!</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="Event 3">
                            <div class="card-body">
                                <h5 class="card-title">Event 3</h5>
                                <p class="card-text">Description for Event 3. Join us for fun!</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="Event 4">
                            <div class="card-body">
                                <h5 class="card-title">Event 4</h5>
                                <p class="card-text">Description for Event 4. An amazing experience awaits!</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="Event 5">
                            <div class="card-body">
                                <h5 class="card-title">Event 5</h5>
                                <p class="card-text">Description for Event 5. Don’t miss this opportunity!</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="Event 6">
                            <div class="card-body">
                                <h5 class="card-title">Event 6</h5>
                                <p class="card-text">Description for Event 6. Join us for a great time!</p>
                                <a href="#" class="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>

</template>

<style scoped>
    #eventMapTitle {
        background-color: black;
        text-align: center;
        color: white;
    }
    #map {
        height: 400px;
        width: 100%;
    }
    #eventCardArea {
        display: flex;
    }

    

</style>
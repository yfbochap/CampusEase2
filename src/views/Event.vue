<template>
  <div class="main container-fluid">
    <div class="row align-items-center">
      <!-- Photos Section -->
      <div class="col-md-6 photos">
        <img :src="thumbnail" alt="About Lviv Conference" id="thumbnail" class="img-fluid" />

        <div class="gallery d-flex flex-wrap mt-3">
          <img
            v-for="(photo, index) in galleryPhotos"
            :key="index"
            :src="photo.src"
            :alt="photo.alt"
            class="small-photo"
            @click="openLightbox(photo.src)"
          />
        </div>
      </div>

      <!-- Event Details Section -->
      <div class="col-md-6 details">
        <h2 id="eventTitle" class="d-inline-block mr-3">{{ eventTitle }}</h2>
        
        <button class="heart-btn" @click="toggleLike" :aria-label="isLiked ? 'Unlike' : 'Like'">
          <svg class="heart-icon" :class="{ filled: isLiked }" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <h3>Location</h3>
        <p>{{ location }}</p>

        <h3>Venue</h3>
        <p>{{ venue }}</p>

        <h3>Description</h3>
        <p>{{ description }}</p>

        <h3>Time</h3>
        <p>{{ time }}</p>

        <h3>Sign-up Link</h3>
        <p><a :href="signUpLink" target="_blank">{{ signUpLink }}</a></p>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="lightboxVisible" id="lightbox" class="lightbox align-items-center justify-content-center" @click.self="closeLightbox">
      <span class="close" @click="closeLightbox">&times;</span>
      <img class="lightbox-content" :src="lightboxImage" />
    </div>
  </div>
</template>

<script>
import photo1 from '../assets/images/photo_2024-10-16 13.47.32.jpeg' // <!-- HARDCODED *TO REPLACE* -->
import photo2 from '../assets/images/earth.jpeg'
import photo3 from '../assets/images/bg-1.jpeg'
import thumbnail1 from '../assets/images/test_photo.jpg'
import '../assets/base.css'

export default {
  data() {
    return {
      eventTitle: "Walking on Sunshine Machine",
      isLiked: false,
      location: "SMU Connex",
      venue: "Meeting Pod1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis provident hic cupiditate, atque aliquid sint enim minima esse, dolores, soluta quaerat mollitia explicabo sequi reprehenderit facilis laborum beatae impedit odit?",
      time: "25 November 10AM to 26 November 12PM",
      signUpLink: "https://www.apple.com",
      thumbnail: thumbnail1,
      galleryPhotos: [
        { src: photo1, alt: "Photo 1" },
        { src: photo2, alt: "Photo 2" },
        { src: photo3, alt: "Photo 3" },
      ],
      lightboxVisible: false,
      lightboxImage: "",
    };
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked;
    },
    openLightbox(src) {
      this.lightboxImage = src;
      this.lightboxVisible = true;
    },
    closeLightbox() {
      this.lightboxVisible = false;
      this.lightboxImage = "";
    },
  },
};
</script>

<style scoped>
body {
  background-color: #29292a;
  font-family: 'Nunito Sans';
}
h2{
  margin-bottom: 30px;
  color: white;
}
.photos > img#thumbnail {
  width: 400px;
  height: auto;
  margin-top: 70px;
}
.gallery {
  display: flex;
  margin-top: 10px;
}
.small-photo {
  width: 80px;
  height: auto;
  margin-right: 10px;
  margin-bottom: 10px;
  object-fit: cover;
  border: 2px solid #ddd;
  cursor: pointer;
  transition: transform 0.2s;
}
.heart-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
  bottom: 10px;
}
.heart-icon {
  width: 30px;
  height: 30px;
  fill: none;
  stroke: #666;
  stroke-width: 2;
  transition: all 0.2s;
  margin-left: 10px;
}
.heart-icon.filled {
  fill: #ff3040;
  stroke: #ff3040;
}
.lightbox {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}
.lightbox img {
  max-width: 80%;
  max-height: 80%;
  border: 3px solid white;
  border-radius: 10px;
}
.close {
  position: absolute;
  top: 20px;
  right: 35px;
  color: white;
  font-size: 40px;
  cursor: pointer;
}
.details > *,
.photos > img,
.galler > img {
  opacity: 0;
  animation: fadeIn 0.6s forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.main{
  background-color: #29292a;
  padding-top: 100px;
  padding-bottom: 100px;
  padding-left: 50px;
  padding-right: 50px;
  color: #ddd;
}
/* Apply animation delays dynamically for each child element */
.details > *:nth-child(1) {
    animation-delay: 0.2s;
}
.details > *:nth-child(2) {
    animation-delay: 0.4s;
}
.details > *:nth-child(3) {
    animation-delay: 0.6s;
}
.details > *:nth-child(4) {
    animation-delay: 0.8s;
}
.details > *:nth-child(5) {
    animation-delay: 1s;
}
.details > *:nth-child(6) {
    animation-delay: 1.2s;
}
.details > *:nth-child(7) {
    animation-delay: 1.4s;
}
.details > *:nth-child(8) {
    animation-delay: 1.6s;
}
.details > *:nth-child(9) {
    animation-delay: 1.8s;
}
.details > *:nth-child(10) {
    animation-delay: 2s;
}
.details > *:nth-child(11) {
    animation-delay: 2.2s;
}
.details > *:nth-child(12) {
    animation-delay: 2.2s;
}
/* Sequential delay for the thumbnail and gallery images */
.photos > img#thumbnail {
    animation-delay: 0.2s; /* Thumbnail fades in first */
}

.gallery > img:nth-child(1) {
    animation-delay: 0.5s; /* First small photo */
}

.gallery > img:nth-child(2) {
    animation-delay: 0.6s; /* Second small photo */
}

.gallery > img:nth-child(3) {
    animation-delay: 0.8s; /* Third small photo */
}
p{
  margin-bottom: 25px;
        }
</style>

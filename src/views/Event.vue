<template>
  <section class="section about">
    <div id="top" class="container">
      <div class="about-content">
        <div class="about-image">
          <img 
            id="thumbnail" 
            src="./test_photo.jpg" 
            alt="About Lviv Conference"
          >

          <div class="gallery" v-if="photos">
            
            <div 
               v-for="(photo, index) in photos" 
              :key="index" 

              class="photo-container"
            >
              <img 
                :src="photo.src" 
                :alt="photo.alt"
                class="small-photo" 
                @click="openLightbox(photo.src)"
              >
            </div>
          </div>

      
        </div>

        <div class="container details">
          <h2 id="titlename" 
                style="display: inline-block; margin-right: 30px;"> 
              Walking on Sunshine Event
            </h2>
            <!-- HARDCODED *TO REPLACE* -->
            <button class="heart-btn" 
                    :aria-label="isLiked ? 'Unlike' : 'Like'" 
                    @click="toggleLike">
              <svg 
                class="heart-icon" 
                :class="{ 'filled': isLiked }"
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          <div id="details">
            <h2>Location</h2>
            <p>SMU Connex</p>  <!-- HARDCODED *TO REPLACE* -->

            <h2>Venue</h2>
            <p>Meeting Pod1</p>  <!-- HARDCODED *TO REPLACE* -->

            <h2>Description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
              provident hic cupiditate, atque aliquid sint enim minima esse, dolores,
              soluta quaerat mollitia explicabo sequi reprehenderit facilis laborum
              beatae impedit odit? 
            </p>  <!-- HARDCODED *TO REPLACE* -->

            <h2>Time</h2>
            <p>25 November 10AM to 26 November 12PM</p>  <!-- HARDCODED *TO REPLACE* -->

            <h2>Sign-up Link</h2>
            <p>www.apple.com</p>  <!-- HARDCODED *TO REPLACE* -->

          </div>
          <button id="calendaradd" class="btn text-white">Add to Calendar</button>
        </div>

        
    </div>
    </div>
    <div v-if="isLightboxOpen" class="lightbox" @click="closeLightbox">
          <span class="close" @click.stop="closeLightbox">&times;</span>
          <img class="lightbox-content" :src="lightboxImage" />
    </div>
  </section>
</template>

<script>
// Import all images
import photo1 from '../assets/images/photo_2024-10-16 13.47.32.jpeg'; // <!-- HARDCODED *TO REPLACE* -->
import photo2 from '../assets/images/earth.jpeg';
import photo3 from '../assets/images/bg-1.jpeg';
import "../assets/base.css";


export default {
  name: 'EventDetail',
  data() {
    return {
      isLightboxOpen: false,
      lightboxImage: "",
      isLiked: false,
      photos: [
        {
          src: photo1,
          alt: 'Photo 1'
        },
        {
          src: photo2,
          alt: 'Photo 2'
        },
        {
          src: photo3,
          alt: 'Photo 3'
        },
      ]
    }
  },
  mounted() {
    // Log all photo sources when component mounts
    console.log('All photos array:', this.photos);
    this.photos.forEach((photo, index) => {
      console.log(`Photo ${index + 1} source:`, photo.src);
    });
  },
  methods: {
    openLightbox(src) {
      this.lightboxImage = src;     // Set the image source for the lightbox
      this.isLightboxOpen = true;    // Display the lightbox
    },
    closeLightbox() {
      this.isLightboxOpen = false;   // Hide the lightbox
      this.lightboxImage = "";       // Clear the image source
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
    }
  },
  beforeUnmount() {
    // Cleanup: ensure body scroll is restored when component is destroyed
    document.body.style.overflow = '';
  }
}
</script>

<style scoped>


.section{
  /* Add your section styling */
  font-family: 'Nunito Sans', 'Times New Roman', Times, serif;
  font-size: 15px;
}

h2{
  font-weight: 800;
  font-size: larger;
}




.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.about {
  padding: 150px 0;
  background-color: #29292a;
}

.about-content {
  display: flex;
  align-items: center;
  color: white;
}

.about-image {
  margin-right: 50px;
}

#thumbnail {
  width: 400px;
  height: auto;
}

.gallery {
      display: flex;
      margin-top: 10px;
    }

.small-photo {
      width: auto;
      max-width: 100px;
      height: 80px;
      margin-right:10px;
      margin-bottom: 10px;
      object-fit: cover;
      border: 2px solid #ddd;
      cursor: pointer;
      transition: transform 0.2s;
    }

.small-photo:hover {
  transform: scale(1.1);
}

.heart-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.2s;
  position: relative;
  bottom: 10px;
}

.heart-btn:hover {
  transform: scale(1.1);
}

.heart-icon {
  width: 30px;
  height: 30px;
  fill: none;
  stroke: #666;
  stroke-width: 2;
  transition: all 0.2s;
}

.heart-icon.filled {
  fill: #ff3040;
  stroke: #ff3040;
}

.lightbox {
  display: flex;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
}

.lightbox-content {
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
  font-weight: bold;
  cursor: pointer;
}
.details{
      align-items: left;
      margin-left: 20px;
      position: relative;
      bottom: 100px;
}
#titlename{
  font-size: 40px;
  margin-bottom: 30px;
  
}
#calendaradd{
  position: relative;
  left: 400px;
  top: 100px;
  background-color: #666;
  transition: background-color 0.3s;
}

#calendaradd:hover{
  background-color: #29292a;
  border-color: #ddd;
}

</style>
<template>
  <section class="section about">
    <div id="top" class="container">
      <div class="about-content">
        <div class="about-image">
          <img 
            id="thumbnail" 
            src="../assets/images/bg-1.jpeg" 
            alt="About Lviv Conference"
          >

          <div class="gallery">
            <img 
              class="small-photo" 
              src="../assets/images/bg-1.jpeg" 
              alt="Photo 1"
              @click="openLightbox('../assets/images/bg-1.jpeg')"
            >
            <img 
              class="small-photo" 
              src="../assets/images/bg-1.jpeg" 
              alt="Photo 2"
              @click="openLightbox('../assets/images/bg-1.jpeg')"
            >
            <img 
              class="small-photo" 
              src="../assets/images/bg-1.jpeg" 
              alt="Photo 3"
              @click="openLightbox('../assets/images/bg-1.jpeg')"
            >
            <img 
              class="small-photo" 
              src="../assets/images/bg-1.jpeg" 
              alt="Photo 4"
              @click="openLightbox('../assets/images/bg-1.jpeg')"
            >
          </div>

          <div class="event-title-container">
            <h2 
              id="walking-on-sunshine-event" 
              style="display: inline-block; margin-right: 20px;"
            >
              Walking on Sunshine Event
            </h2>
            
            <!-- Heart Icon -->
            <button class="heart-btn" :aria-label="isLiked ? 'Unlike' : 'Like'" @click="toggleLike">
              <svg 
                class="heart-icon" 
                :class="{ 'filled': isLiked }"
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="container details">
          <div id="details">
            <h2>Location</h2>
            <p>SMU Connex</p>

            <h2>Venue</h2>
            <p>Meeting Pod1</p>

            <h2>Description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
              provident hic cupiditate, atque aliquid sint enim minima esse, dolores,
              soluta quaerat mollitia explicabo sequi reprehenderit facilis laborum
              beatae impedit odit?
            </p>

            <h2>Time</h2>
            <p>25 November 10AM to 26 November 12PM</p>

            <h2>Sign-up Link</h2>
            <p>www.apple.com</p>
            
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div id="lightbox" class="lightbox" v-if="lightboxOpen">
      <span class="close" @click="closeLightbox">×</span>
      <img :src="lightboxImage" class="lightbox-content" alt="Lightbox image">
    </div>
  </section>
</template>

<script>
export default {
  name: 'EventDetail',
  data() {
    return {
      lightboxOpen: false,
      lightboxImage: '',
      isLiked: false
    }
  },
  methods: {
    openLightbox(imageSrc) {
      this.lightboxImage = imageSrc;
      this.lightboxOpen = true;
    },
    closeLightbox() {
      this.lightboxOpen = false;
      this.lightboxImage = '';
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
    }
  }
}
</script>

<style scoped>
.section {
  /* Add your section styling */
  font-family: 'Nunito Sans', Arial;
}

body {
      font-family: 'Nunito Sans', Arial;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.small-photo {
  width: 100%;
  height: auto;
  cursor: pointer;
  transition: transform 0.2s;
}

.small-photo:hover {
  transform: scale(1.05);
}

.heart-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.2s;
}

.heart-btn:hover {
  transform: scale(1.1);
}

.heart-icon {
  width: 24px;
  height: 24px;
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90vh;
}

.close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: white;
  font-size: 30px;
  cursor: pointer;
}
</style>
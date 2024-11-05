<template>
  <div class="about">
    <!-- Video Background -->
    <video autoplay muted loop>
      <source src="@/assets/images/bg-video6.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- About Us Header -->
    <div class="about-header">
      ABOUT US
    </div>

    <div class="container my-4">
      <div class="row justify-content-center">
        <!-- Dynamically responsive columns -->
        <div class="col-12 col-sm-8 col-md-8 col-lg-7 col-xl-6">
          <div class="about-section">
            <img src="@/assets/images/CElogo1-1.png" alt="Campus Ease Logo" class="about-logo img-fluid" />
            <img src="@/assets/images/about-desc1.png" alt="Campus Ease Description" class="about-description img-fluid" />
          </div>

          <!-- FAQ Section -->
          <div class="faq-section">
            <h2>FAQ'S</h2>
            <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
              <div class="faq-question" @click="toggleFaq(index)">{{ faq.question }}</div>
              <div v-show="faq.open" class="faq-answer">{{ faq.answer }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        { question: "What is Campus Ease?", answer: "Campus Ease is an online platform designed to help students streamline their campus activities, from event planning to finding campus resources.", open: false },
        { question: "How can I sign up?", answer: "You can sign up by visiting our registration page and filling out the required information.", open: false },
        { question: "Is Campus Ease free to use?", answer: "Yes, Campus Ease is completely free for students and staff to use.", open: false },
      ],
    };
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
  },
};
</script>

<style scoped>
body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  margin: 0;
}

/* Video background */
video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* About Header with reduced padding */
.about-header {
  position: relative;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  color: white;
  background-size: cover;
  background-position: center;
  margin-bottom: 1rem; /* Reduced space below header */
}

/* About section styling */
.about-section {
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
}

/* Limit the container max-width at large screen sizes */
.container {
  max-width: 1200px;
}

.about-logo, .about-description {
  width: 100%;
  max-width: 85%;
  height: auto;
  margin-top: 0;
}

/* FAQ Section */
.faq-section {
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
}

.faq-section h2 {
  text-align: center;
  margin-bottom: 20px;
}

.faq-item {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
}

.faq-question {
  font-size: x-large;
  padding: 15px;
  cursor: pointer;
  font-weight: bold;
  background-color: #fff;
  color: black;
}

.faq-question:hover {
  background-color: #f1f1f1;
}

.faq-answer {
  font-size: large;
  padding: 15px;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
  color: black;
}
</style>
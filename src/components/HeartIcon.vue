<template>
  <button class="heart-btn" :aria-label="isLiked ? 'Unlike' : 'Like'" @click="toggleLike">
    <svg class="heart-icon" :class="{ filled: isLiked }" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    isLiked: {
      type: Boolean,
      required: true
    },
    eventId: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  methods: {
    toggleLike() {
      this.$emit('toggle-like', this.eventId, this.userId);
    }
  }
}
</script>

<style scoped>
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
</style>
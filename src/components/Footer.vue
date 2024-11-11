<template>
    <!-- Breakpoints need to be added -->
    <div class="container-fluid" id="navbar"> 
    <footer class="d-flex justify-content-between align-items-center py-3 border-top border-secondary">
        <p class="mb-0 col-4 text-secondary">Copyright &#169 IS211</p> 
        <ul class="nav col-8 justify-content-end">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">HOME</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about">ABOUT</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/dashboard">EVENTS</RouterLink>
            </li>
        </ul>
       
    </footer>
</div>
</template>

<style scoped>
/* Are there already set colours for the links? */
    #navbar{
      background-color: #1e1d1d;
      padding: 0 20px;
    }
    .nav-link {
        color: #696969;
        transition: background-color 0.3s ease;
    }
    .nav-link:hover {
        background-color: transparent;
        color: #A9A9A9;
        text-decoration: underline;
        border-radius: 5px;
    }
    /* Responsive font size for navigation links on extra-small screens */
  @media (max-width: 575.98px) { 
  .nav-link {
    font-size: 12px; /* Reduce font size on extra-small screens */
    padding: 5px; /* Adjust padding to fit all links in one row */
    margin-right: 10px; /* Add some spacing between links */
  }
  footer ul.nav {
    flex-wrap: nowrap; /* Ensure links stay in one row */
  }
}

</style>

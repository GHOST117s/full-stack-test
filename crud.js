$(document).ready(function () {
    // Fetch and display posts
    function fetchPosts() {
      const url = "http://localhost:8000/php/read.php";
      console.log("Fetching posts from:", url);
  
      $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        crossDomain: true,
        headers: {
          Accept: "application/json",
        },
        success: function (data) {
          console.log("Response data:", data);
          if (data.success) {
            console.log("Posts:", data.data);
  
            const posts = data.data;
            let imageData = "";
            let tabName = "";
            let postData = "";
            posts.forEach((post, index) => {
              tabName += `
                  <button class="nav-link ${
                    index === 0 ? "active" : ""
                  } tab-button" id="tab${index}" data-bs-target="#carouselExample" data-bs-slide-to="${index}">${escapeHtml(
                post.title
              )}</button>
                `;
  
              postData += `
                  <div class="carousel-item ${index === 0 ? "active" : ""}">
                      <div class="card-body">
                          <h5 class="card-title">${escapeHtml(post.title)}</h5>
                          <p class="card-text">${escapeHtml(post.content)}</p>
                          <div class="button-group">
                              <button class="btn btn-danger delete" data-id="${
                                post.id
                              }">Delete</button>
                              <button class="btn btn-warning edit" data-id="${
                                post.id
                              }">Edit</button>
                          </div>
                      </div>
                  </div>
                `;
  
              imageData += `
                  ${
                    post.image
                      ? `<img src="${escapeHtml(
                          post.image
                        )}" alt="Image" class="img-fluid ${
                          index === 0 ? "active" : "d-none"
                        }" data-index="${index}">`
                      : ""
                  }
                `;
            });
  
            $("#imageDisplay").html(imageData);
            $("#tabControl").html(tabName);
            $("#carouselExample .carousel-inner").html(postData);
  
            // Show the active image
            showActiveImage(0); // Initially show the first image
          } else {
            console.error("Server returned error:", data.error);
            showError("Error: " + (data.error || "Failed to fetch posts"));
          }
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error:", status, error);
          showError("Failed to fetch posts. Server returned: " + error);
        },
      });
    }
  
    // Helper function to escape HTML
    function escapeHtml(unsafe) {
      if (!unsafe) return "";
      return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  
    // Show error messages
    function showError(message) {
      alert(message);
      console.error(message);
    }
  
    // Show the active image based on the carousel item index
    function showActiveImage(index) {
      $("#imageDisplay img").each(function (i) {
        if (i === index) {
          $(this).removeClass("d-none").addClass("active");
        } else {
          $(this).removeClass("active").addClass("d-none");
        }
      });
    }
  
    // Create post
    $("#createPostForm").submit(function (e) {
      e.preventDefault();
      const url = "http://localhost:8000/php/create.php";
      console.log("Creating post at:", url);
  
      $.ajax({
        url: url,
        method: "POST",
        data: $(this).serialize(),
        dataType: "json",
        crossDomain: true,
        success: function (response) {
          if (response.success) {
            alert(response.message);
            fetchPosts();
            $("#createPostForm")[0].reset();
          } else {
            showError("Error: " + (response.error || "Failed to create post"));
          }
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error:", status, error);
          showError("Failed to create post. Server returned: " + error);
        },
      });
    });
  
    // Delete post
    $(document).on("click", ".delete", function () {
      if (!confirm("Are you sure you want to delete this post?")) {
        return;
      }
  
      const id = $(this).data("id");
      const url = "http://localhost:8000/php/delete.php";
      console.log("Deleting post at:", url);
  
      $.ajax({
        url: url,
        method: "POST",
        data: { id: id },
        dataType: "json",
        crossDomain: true,
        success: function (response) {
          if (response.success) {
            alert(response.message);
            fetchPosts();
          } else {
            showError("Error: " + (response.error || "Failed to delete post"));
          }
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error:", status, error);
          showError("Failed to delete post. Server returned: " + error);
        },
      });
    });
  
    // Edit post
    $(document).on("click", ".edit", function () {
      const id = $(this).data("id");
      const title = prompt("Enter new title:");
      const content = prompt("Enter new content:");
      const image = prompt("Enter new image URL:");
  
      if (!title || !content) {
        showError("Title and content are required");
        return;
      }
  
      const url = "http://localhost:8000/php/update.php";
      console.log("Editing post at:", url);
  
      $.ajax({
        url: url,
        method: "POST",
        data: {
          id: id,
          title: title,
          content: content,
          image: image,
        },
        dataType: "json",
        crossDomain: true,
        success: function (response) {
          if (response.success) {
            alert(response.message);
            fetchPosts();
          } else {
            showError("Error: " + (response.error || "Failed to update post"));
          }
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error:", status, error);
          showError("Failed to update post. Server returned: " + error);
        },
      });
    });
  
    $(document).on("click", ".nav-link", function () {
      const targetIndex = $(this).data("bs-slide-to");
      $(".nav-link").removeClass("active");
      $(this).addClass("active");
  
      $("#carouselExample").carousel(parseInt(targetIndex));
  
      // Show corresponding image for active carousel item
      showActiveImage(targetIndex);
    });
  
    $("#carouselExample").on("slid.bs.carousel", function () {
      const currentIndex = $(this).find(".carousel-item.active").index();
      $(".nav-link").removeClass("active");
      $(".nav-link").eq(currentIndex).addClass("active");
  
      // Show corresponding image for active carousel item
      showActiveImage(currentIndex);
    });
  
    // Initial fetch
    fetchPosts();
  });
  
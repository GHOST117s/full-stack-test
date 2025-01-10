$(document).ready(function() {
    // Fetch and display posts
    function fetchPosts() {
        const url = 'http://localhost:8000/php/read.php';
        console.log('Fetching posts from:', url);
        
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            crossDomain: true,
            headers: {
                'Accept': 'application/json'
            },
            success: function(data) {
                console.log('Response data:', data);
                if (data.success) {
                    console.log('Posts:', data.data);
                    
                    const posts = data.data;
                    let postsHtml = '';
                    posts.forEach(post => {
                        postsHtml += `
                            <div class="post-card">
                                <h3>${escapeHtml(post.title)}</h3>
                                <p>${escapeHtml(post.content)}</p>
                                ${post.image ? `<img src="${escapeHtml(post.image)}" alt="Image" style="max-width: 100px;">` : ''}
                                <div class="button-group">
                                    <button class="delete" data-id="${post.id}">Delete</button>
                                    <button class="edit" data-id="${post.id}">Edit</button>
                                </div>
                            </div>
                        `;
                    });
                    console.log('Generated HTML:', postsHtml);
                    $('#posts').html(postsHtml);
                } else {
                    console.error('Server returned error:', data.error);
                    showError('Error: ' + (data.error || 'Failed to fetch posts'));
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', status, error);
                console.log('Response:', xhr.responseText);
                showError('Failed to fetch posts. Server returned: ' + error);
            }
        });
    }

    function escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function showError(message) {
        alert(message);
        console.error(message);
    }

    // Create post
    $('#createPostForm').submit(function(e) {
        e.preventDefault();
        const url = 'http://localhost:8000/php/create.php';
        console.log('Creating post at:', url);
        
        $.ajax({
            url: url,
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            crossDomain: true,
            success: function(response) {
                if (response.success) {
                    alert(response.message);
                    fetchPosts();
                    $('#createPostForm')[0].reset();
                } else {
                    showError('Error: ' + (response.error || 'Failed to create post'));
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', status, error);
                showError('Failed to create post. Server returned: ' + error);
            }
        });
    });

    // Delete post
    $(document).on('click', '.delete', function() {
        if (!confirm('Are you sure you want to delete this post?')) {
            return;
        }
        
        const id = $(this).data('id');
        const url = 'http://localhost:8000/php/delete.php';
        console.log('Deleting post at:', url);
        
        $.ajax({
            url: url,
            method: 'POST',
            data: { id: id },
            dataType: 'json',
            crossDomain: true,
            success: function(response) {
                if (response.success) {
                    alert(response.message);
                    fetchPosts();
                } else {
                    showError('Error: ' + (response.error || 'Failed to delete post'));
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', status, error);
                showError('Failed to delete post. Server returned: ' + error);
            }
        });
    });

    // Edit post
    $(document).on('click', '.edit', function() {
        const id = $(this).data('id');
        const title = prompt('Enter new title:');
        const content = prompt('Enter new content:');
        const image = prompt('Enter new image URL:');
        
        if (!title || !content) {
            showError('Title and content are required');
            return;
        }

        const url = 'http://localhost:8000/php/update.php';
        console.log('Editing post at:', url);
        
        $.ajax({
            url: url,
            method: 'POST',
            data: { 
                id: id, 
                title: title, 
                content: content, 
                image: image 
            },
            dataType: 'json',
            crossDomain: true,
            success: function(response) {
                if (response.success) {
                    alert(response.message);
                    fetchPosts();
                } else {
                    showError('Error: ' + (response.error || 'Failed to update post'));
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', status, error);
                showError('Failed to update post. Server returned: ' + error);
            }
        });
    });

    // Initial fetch
    fetchPosts();
});
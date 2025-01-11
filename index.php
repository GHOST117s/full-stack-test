<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Operations</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <style>
        .tab-column {
            background-color: #f8f9fa;
            padding: 20px;
        }

        .carousel-inner img {
            object-fit: cover;
            aspect-ratio: 1 / 1;
            max-height: 300px;
        }

        .tab-button {
            cursor: pointer;
        }
    </style>
</head>

<body>
    <h1>CRUD Operations</h1>

    <div class="container py-5">
        <h2 class="mb-4">Create Post</h2>

        <!-- Post Creation Form -->
        <form id="createPostForm" class="shadow-sm p-4 rounded border">
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" name="title" id="title" class="form-control" placeholder="Enter title" required>
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea name="content" id="content" class="form-control" rows="4" placeholder="Enter content" required></textarea>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Image URL</label>
                <input type="text" name="image" id="image" class="form-control" placeholder="Optional: Image URL">
            </div>
            <button type="submit" class="btn btn-success">Create</button>
        </form>
    </div>

    <!-- <div id="posts"> -->
    <div class="container py-5">
        <h2>Posts</h2>

        <div class="row">
            <div class="col-md-3 tab-column">
                <div class="nav flex-column nav-pills gap-2" id="tabControl" role="tablist">
                </div>
            </div>

            <div class="col-md-6">
                <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner  ">
                        <div class="carousel-item active">
                            <div id="postBody" class="card  text-center">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3 text-center" id="imageDisplay">
            </div>
        </div>
    </div>
    <!-- </div> -->
    <script src="crud.js"></script>
</body>

</html>
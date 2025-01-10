<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Operations</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <h1>CRUD Operations</h1>

    <h2>Create Post</h2>
    <form id="createPostForm">
        <input type="text" name="title" placeholder="Title" required>
        <textarea name="content" placeholder="Content" required></textarea>
        <input type="text" name="image" placeholder="Image URL">
        <button type="submit">Create</button>
    </form>

    <h2>Posts</h2>
    <div id="posts"></div>

    <script src="crud.js"></script>
</body>
</html>
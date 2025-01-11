
# start the server
 php -S localhost:8000

<h2>Technical questions</h2>

Please answer the following questions in a markdown file called <code>Answers to technical questions.md</code>
<ul>
  <li>How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
    </li>
	<p>
	I spent around 2-3 hours on the coding test. I’m not very good at front-end development, so I kept the UI minimal and focused more on completing the backend properly. If I had more time, I would have improved the UI, added proper form validations, and written more comprehensive unit and integration tests to ensure full coverage.
	</p>
	<li>How would you track down a performance issue in production? Have you ever had to do this?</li>
	<p>
	Yes, I’ve had to track down performance issues in production before. I would first analyze application logs and use tools like Horizon , or even built-in Laravel performance monitoring to identify slow queries, bottlenecks, or high CPU usage. Next, I’d profile the application code and database queries to pinpoint the exact issue. Finally, I’d implement fixes, such as optimizing queries, caching data, or refactoring the code, and monitor the changes to ensure the issue is resolved.
	 </p>
	<li>Please describe yourself using JSON.</li>
	<p>
	{
  "name": "HyScaler SDE-1",
  "skills": {
    "frontend": "average",
    "backend": "strong",
    "problem_solving": "good",
    "debugging": "experienced"
  },
  "preferences": {
    "focus": "backend development",
    "improvement": "frontend skills",
    "work_style": "efficient and results-oriented"
  },
  "experience": {
    "performance_debugging": true,
    "production_issues": true
  }
}

	</p>
</ul>
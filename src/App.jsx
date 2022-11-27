import { useEffect, useState } from "react";
import Header from "./components/Header";
import Data from "./data.json";
import "./App.css";

const App = () => {
	const [jobs, setJobs] = useState(Data);

	const handleFilterJobsByTag = (e) => {
		const filterJobs = jobs.filter((job) => job.role == e.target.innerText);
		setJobs(filterJobs);
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			<Header />
			<main className="container">
				{jobs.map((job) => (
					<article key={job.id} className={`card-job ${job.new && job.featured && "special"}`}>
						<div className="card-job-info">
							<img src={`/${job.logo}`} alt={job.company} />
							<div>
								<div className="card-job-info-header">
									<h3>{job.company}</h3>
									{job.new && <span>NEW!</span>}
									{job.featured && <span>FEATURED</span>}
								</div>
								<h2 className="card-job-info-title">{job.position}</h2>
								<ul className="card-job-info-features">
									<li>{job.postedAt}</li>
									<li>{job.contract}</li>
									<li>{job.location}</li>
								</ul>
							</div>
						</div>
						<div className="card-job-tags">
							<button onClick={handleFilterJobsByTag}>{job.role}</button>
							<button onClick={handleFilterJobsByTag}>{job.level}</button>
							{job.tools.map((tool) => (
								<button key={tool} onClick={handleFilterJobsByTag}>
									{tool}
								</button>
							))}
							{job.languages.map((language) => (
								<button key={language} onClick={handleFilterJobsByTag}>
									{language}
								</button>
							))}
						</div>
					</article>
				))}
			</main>
		</>
	);
};

export default App;

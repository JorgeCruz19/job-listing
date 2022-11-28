import { useState, useEffect } from "react";

import Header from "./components/Header";
import Job from "./components/Job";
import Tag from "./components/Tag";
import Data from "./data.json";
import { getJoinTags } from "./utils";

import "./App.css";

const App = () => {
	const [jobs, setJobs] = useState([]);
	const [tags, setTags] = useState([]);

	useEffect(() => {
		const newJobs = handleFilterJobsByTags();
		setJobs(newJobs);

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, [tags]);

	useEffect(() => {
		setJobs(Data);
	}, []);

	const handleAddTag = (tag) => {
		if (tags.includes(tag)) return;
		setTags([...tags, tag]);
	};

	const handleFilterJobsByTags = () => {
		const filteredJobs = Data.filter((tag) => {
			if (tags.length === 0) {
				return true;
			}

			const joinTags = getJoinTags(tag);

			return tags.every((tag) => joinTags.includes(tag));
		});

		return filteredJobs;
	};

	const handleResetTags = () => {
		setJobs(Data);
		setTags([]);
	};

	const handleRemoveJobByTag = (tagParam) => {
		const tagsFiltered = tags.filter((tag) => tag !== tagParam);
		setTags(tagsFiltered);
	};

	return (
		<>
			<Header />
			<main className="container">
				{tags.length > 0 && (
					<div className="filter-tags">
						<div>
							{tags.map((tag) => (
								<Tag key={tag} tag={tag} handleRemoveJobByTag={handleRemoveJobByTag} />
							))}
						</div>
						<button onClick={handleResetTags} className="filter-tags-clear">
							Clear all
						</button>
					</div>
				)}

				{jobs.length == 0 ? (
					<p className="card-job-error">No hay vacantes con esas especificaciones</p>
				) : (
					jobs.map((job) => <Job key={job.id} job={job} handleAddTag={handleAddTag} />)
				)}
			</main>
		</>
	);
};

export default App;

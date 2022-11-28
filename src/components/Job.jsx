import { getJoinTags } from "../utils";

const Job = ({ job, handleAddTag }) => {
	const joinTags = getJoinTags(job);
	return (
		<article className={`card-job ${job.new && job.featured ? "special" : ""}`}>
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
				{joinTags.map((tag) => (
					<button key={tag} onClick={() => handleAddTag(tag)}>
						{tag}
					</button>
				))}
			</div>
		</article>
	);
};

export default Job;
